// ** React Imports
import { useEffect, useState } from 'react'

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

const PayLater = () => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/
  const nikRegExp = /^(?=.*[0-9])(?=.{16})/

  let schemaData = yup.object().shape({
    nik: yup.string().max(16).matches(nikRegExp, 'Masukan Nomor NIK KTP kamu.').required()
  })

  // ** State
  const [dataCustomer, setDataCustomer] = useState('')
  const [data, setData] = useState({})
  const [urlApp, setUrlApp] = useState('https://digipayid.com')
  const [dataNIK, setDataNIK] = useState({})
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
    nik: ''
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const getData = async invoice_number => {
    setLoading(true)
    const _uri = 'customers/check_trx'
    const _secret = await generateSignature(_uri)

    fetch(`${process.env.NEXT_PUBLIC_API}/${_uri}`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret?.signature,
        'X-Timestamp': _secret?.timestamp
      },
      body: JSON.stringify({ invoice_number: invoice_number })
    })
      .then(res2 => res2.json())
      .then(async res2 => {
        let paylater_app_url = 'https://digipayid.com'
        paylater_app_url = JSON.parse(res2?.data?.payment_response)?.res?.data?.paylater_app_url
        paylater_app_url =
          (await CryptoJS.AES.encrypt(
            `${JSON.stringify(paylater_app_url)}`,
            `${process.env.NEXT_PUBLIC_BE_API_KEY}`
          ).toString()) ?? paylater_app_url

        setTimeout(() => {
          // console.log('paylater_app_url: ', paylater_app_url)
          setUrlApp(paylater_app_url ?? 'https://digipayid.com')
        }, 1000)

        setLoading(false)
        if (res2?.code === 0 || res2?.code === '0') {
          setIsAllowed(true)
        } else {
          setIsAllowed(false)
          setOpenModalAccess(true)
        }
      })
      .catch(() => {
        setLoading(false)
        setIsAllowed(false)
        setOpenModalAccess(true)
      })
  }

  useEffect(() => {
    // console.log(router?.query?.reff_code)
    if (router?.query?.invoice_number && size(router?.query?.invoice_number) > 0) {
      getData(router?.query?.invoice_number)
    }
  }, [router?.query?.invoice_number])

  const handleSubmit = async (isDelete = false) => {
    if ((await schemaData.isValid(values)) === false && !isDelete) {
      alert('Mohon lengkapi semua data.')

      return false
    }

    setLoading(true)
    const _uri = 'customers/check_nik'
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

        setIsValid(res?.code === 0 || res?.code === '0')

        const _nik = JSON.stringify(res?.data?.nik) ?? '0'

        // console?.log('_data: ', _data)

        setTimeout(() => {
          const _data =
            CryptoJS.AES.encrypt(`${values?.nik}`, `${process.env.NEXT_PUBLIC_BE_API_KEY}`).toString() ?? values?.nik
          setDataCustomer(_data)
          setOpenModalInfo(true)
          setLoading(false)
        }, 1000)
      })
      .catch(() => setLoading(false))
  }

  // useLayoutEffect(() => {
  //   if (values?.nik) {
  //     const _data =
  //       CryptoJS.AES.encrypt(`${values?.nik}`, `${process.env.NEXT_PUBLIC_BE_API_KEY}`).toString() ?? values?.nik
  //     setDataCustomer(_data)

  //     // console.log('nik: ', _data)
  //   }
  // }, [values?.nik])

  // useLayoutEffect(() => {
  //   if (dataNIK) {
  //     setIsValid(true)
  //   } else {
  //     setIsValid(false)
  //   }
  // }, [dataNIK])

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
                  Selamat Datang di {themeConfig.templateName} 👋🏻
                </Typography>
                <Typography variant='body2'>Masukkan NIK (KTP) kamu untuk proses Validasi.</Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  onFocus={e => e.target.select()}
                  inputProps={{ inputMode: 'numeric' }}
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
        handleSubmitFunction={() =>
          isValid
            ? router.push('/paylater/process?data=' + dataCustomer + '&uri=' + urlApp)
            : router.push('/paylater/process?data=' + dataCustomer + '&uri=' + urlApp)
        }
      >
        {isValid && <Typography type='h5'>Data KTP Valid.</Typography>}
        {isValid && <Typography type='body'>Silakan tekan submit untuk melanjutkan.</Typography>}
        {!isValid && <Typography type='h5'>Data KTP Belum Terdaftar Sistem !</Typography>}
        {!isValid && <Typography type='body'>Silakan tekan submit untuk melanjutkan pendaftaran.</Typography>}
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
PayLater.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default PayLater
