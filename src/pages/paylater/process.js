// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import ReCAPTCHA from 'react-google-recaptcha'

import * as yup from 'yup'

import { generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

// ** MUI Components
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import CryptoJS from 'crypto-js'
import { size } from 'lodash'
import ModalDialog from 'src/components/dialog'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const PayLaterProcess = () => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/
  const nikRegExp = /^(?=.*[0-9])(?=.{16})/
  const telpRegExp = /^(?=.*[0-9])(?=.{10,14})/

  let schemaData = yup.object().shape({
    nik: yup.string().max(16).matches(nikRegExp, 'Masukan Nomor NIK KTP kamu.').required(),
    nama_depan: yup.string().required(),
    nama_belakang: yup.string().required(),
    email: yup.string().email().required(),
    telp: yup.string().min(10).max(14).matches(telpRegExp, 'Masukan Nomor Hp kamu.').required(),
    alamat: yup.string().required(),
    kota: yup.string().required(),
    kode_pos: yup.string().required()
  })

  // ** State
  const [dataCustomer, setDataCustomer] = useState('')
  const [data, setData] = useState({})
  const [urlApp, setUrlApp] = useState('https://digipayid.com')
  const [captcha, setCaptcha] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isAllowed, setIsAllowed] = useState(false)
  const [errorsField, setErrorsField] = useState({})
  const [openModalInfo, setOpenModalInfo] = useState(false)
  const [openModalAccess, setOpenModalAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  const [values, setValues] = useState({
    customer_id: '',
    nik: '',
    nama_depan: '',
    nama_belakang: '',
    email: '',
    telp: '',
    alamat: '',
    kota: '',
    kode_pos: ''
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const getData = async (data, uri) => {
    console.log('data: ', data)
    console.log('uri: ', uri)

    const nik =
      (await CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_BE_API_KEY)
        ?.toString(CryptoJS.enc.Utf8)
        ?.replace(/\"|\\/g, '')) ?? false

    const _uriX = uri.replace(/\ /g, '+')

    const uriApp =
      (await CryptoJS.AES.decrypt(_uriX, process.env.NEXT_PUBLIC_BE_API_KEY).toString(CryptoJS.enc.Utf8)).replace(
        /\"|\\/g,
        ''
      ) ?? false

    // console.log('nik: ', nik)
    // console.log('_uriX: ', _uriX)
    // console.log('uriApp: ', uriApp)

    if (nik) {
      setIsAllowed(true)
      setUrlApp(uriApp)
      if (size(nik) < 16) {
        setLoading(false)

        return false
      }
    } else {
      setLoading(false)
      setIsAllowed(false)
      setOpenModalAccess(true)
    }

    setLoading(true)
    const _uri = 'customers/check_nik'
    const _secret = await generateSignature(_uri)

    fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret?.signature,
        'X-Timestamp': _secret?.timestamp
      },
      body: JSON.stringify({ nik: nik })
    })
      .then(res => res.json())
      .then(res => {
        setData(res?.data)
        setDataCustomer(res?.data)
        setValues({
          customer_id: res?.data?.id,
          nik: res?.data?.nik ?? nik,
          nama_depan: res?.data?.nama_depan,
          nama_belakang: res?.data?.nama_belakang,
          email: res?.data?.email,
          telp: res?.data?.telp,
          alamat: res?.data?.alamat,
          kota: res?.data?.kota,
          kode_pos: res?.data?.kode_pos
        })
        setLoading(false)

        // if (res?.code === 0) {
        //   setLoading(false)
        //   setData(res?.data)
        //   setIsAllowed(true)
        // } else {
        //   setLoading(false)
        //   setIsAllowed(false)
        //   setOpenModalAccess(true)
        // }
        // if (res?.code === 0) {
        //   setIsAllowed(true)
        // } else {
        //   setIsAllowed(false)
        //   setOpenModalAccess(true)
        // }
      })
      .catch(() => {
        setLoading(false)
        setIsAllowed(false)
        setOpenModalAccess(true)
      })
  }

  useEffect(() => {
    // console.log(router?.query?.reff_code)
    if (router?.query?.data && size(router?.query?.data) > 0) {
      getData(router?.query?.data, router?.query?.uri)
    }
  }, [router?.query?.data])

  const handleSubmit = async (isDelete = false) => {
    if ((await schemaData.isValid(values)) === false && !isDelete) {
      alert('Mohon lengkapi semua data.')

      return false
    }

    setLoading(true)
    const _uri = 'customers/create'
    const _secret = await generateSignature(_uri)

    await fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret?.signature,
        'X-Timestamp': _secret?.timestamp
      },

      // body: JSON.stringify(valueModal)
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(async res => {
        // console.log(res?.data)

        setData(res?.data)
        if (res?.code === 0) {
          setOpenModalInfo(true)
        }
        setLoading(false)

        // const _data = await CryptoJS.AES.encrypt(
        //   `${JSON.stringify(res?.data)}`,
        //   `${process.env.NEXT_PUBLIC_BE_API_KEY}`
        // ).toString()
        // console?.log('_data: ', _data)
        // setDataCustomer(_data)

        // setOpenModalInfo(true)
      })
      .catch(() => setLoading(false))
  }

  useLayoutEffect(() => {
    if (data?.nik) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [data])

  return (
    <Box className='content-center'>
      {isAllowed && (
        <>
          <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src='/images/logo.png' width={70} />
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  {themeConfig.templateName} 👋🏻
                </Typography>
                <Typography variant='body2'>Masukkan data diri kamu untuk proses Validasi.</Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  type='number'
                  id='standard-basic'
                  label={'NIK (KTP)'}
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('nik', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.nik}
                  error={errorsField?.nik}
                  helperText={errorsField?.nik}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='text'
                  id='standard-basic'
                  label='Nama Depan'
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('nama_depan', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.nama_depan}
                  error={errorsField?.nama_depan}
                  helperText={errorsField?.nama_depan}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='text'
                  id='standard-basic'
                  label='Nama Belakang'
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('nama_belakang', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.nama_belakang}
                  error={errorsField?.nama_belakang}
                  helperText={errorsField?.nama_belakang}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='email'
                  id='standard-basic'
                  label='Email'
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('email', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.email}
                  error={errorsField?.email}
                  helperText={errorsField?.email}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='number'
                  id='standard-basic'
                  label='No Hp Terdaftar Paylater 0812xxxxxxx'
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('telp', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.telp}
                  error={errorsField?.telp}
                  helperText={errorsField?.telp}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='text'
                  id='standard-basic'
                  label='Kota'
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('kota', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.kota}
                  error={errorsField?.kota}
                  helperText={errorsField?.kota}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='text'
                  id='standard-basic'
                  label='Kode POS'
                  variant='outlined'
                  size='medium'
                  onChange={e => handleChangeEl('kode_pos', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.kode_pos}
                  error={errorsField?.kode_pos}
                  helperText={errorsField?.kode_pos}
                  sx={{ mb: 4 }}
                />

                <TextField
                  fullWidth
                  type='text'
                  id='standard-basic'
                  label='Alamat Lengkap'
                  variant='outlined'
                  size='medium'
                  multiline={true}
                  rows={5}
                  onChange={e => handleChangeEl('alamat', e, values, setValues, schemaData, setErrorsField)}
                  value={values?.alamat}
                  error={errorsField?.alamat}
                  helperText={errorsField?.alamat}
                  sx={{ mb: 4 }}
                />

                <Box
                  sx={{
                    mb: 4,
                    mt: 4,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY} onChange={e => setCaptcha(e)} />
                </Box>

                <Button
                  fullWidth
                  disabled={!captcha || Object.keys(errorsField).length > 0}
                  size='large'
                  variant='contained'
                  sx={{ mb: 7, mt: 4 }}
                  onClick={e => handleSubmit(e)}
                >
                  Cek Data NIK
                </Button>
              </form>
            </CardContent>
          </Card>
          <FooterIllustrationsV1 />
        </>
      )}

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress color='primary' size={100} variant='indeterminate' />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={alertMessage?.open}
        autoHideDuration={3000}
        onClose={() =>
          setAlertMessage({
            open: false,
            type: alertMessage?.type,
            message: ''
          })
        }
      >
        <Alert variant='filled' severity={alertMessage?.type} sx={{ width: '100%' }}>
          {alertMessage?.message}
        </Alert>
      </Snackbar>

      <ModalDialog
        titleModal='Info Data Customer'
        openModal={openModalInfo}
        setOpenModal={setOpenModalInfo}
        handleSubmitFunction={() => (urlApp ? router.push(urlApp) : alert('Aplikasi Paylater tidak tersedia.'))}
      >
        <Typography type='h5'>Pastikan data yang anda masukkan benar.</Typography>
        <Typography type='body'>Silakan tekan submit untuk melanjutkan proses.</Typography>
      </ModalDialog>

      <ModalDialog
        titleModal='Akses Dibatasi !'
        openModal={openModalAccess}
        setOpenModal={setOpenModalAccess}
        handleSubmitFunction={() => router.push('https://digipayid.com')}
      >
        <Typography type='h5'>Halaman ini tidak valid!</Typography>
        <Typography type='body'>Silakan tekan submit untuk kembali.</Typography>
      </ModalDialog>
    </Box>
  )
}
PayLaterProcess.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default PayLaterProcess
