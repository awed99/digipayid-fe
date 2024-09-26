// ** MUI Imports
import { Alert, Backdrop, CircularProgress, IconButton, InputAdornment, Snackbar, Switch } from '@mui/material'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { MuiOtp } from 'mui-otp-input-field'

import { Edit, Visibility, VisibilityOff } from '@mui/icons-material'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

import * as yup from 'yup'

import CryptoJS from 'crypto-js'
import ModalDialog from 'src/components/dialog'
import { generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(true)

  // ** States
  const [countDown, setCountDown] = useState(0)
  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(0)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Tambah User')
  const [valueModal, setValueModal] = useState({ id_user: null, username: '' })
  const [data, setData] = useState([])
  const [userPrivileges, setUserPrivileges] = useState([])
  const [openModalOTP, setOpenModalOTP] = useState(false)
  const [oTPEmail, setOTPEmail] = useState('')
  const [oTPWA, setOTPWA] = useState('')

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  // ** Hooks
  const router = useRouter()

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/

  let schemaData = yup.object().shape({
    id_user: yup.string(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().matches(passwordRegExp, 'Min 8 Chars, Uppercase, Lowercase, Number and Special Character'),
    telp: yup.string().required(),
    user_privilege: yup.string().required()
  })

  let _loopNumber = 1

  const columns = [
    { field: 'username', headerName: 'Name', width: 250 },
    {
      field: 'telp',
      headerName: 'Telp/WA',
      width: 250,
      renderCell: params => (
        <a target='_blank' href={'//wa.me/+62' + params.value} rel='noreferrer'>
          +62{params.value}
        </a>
      )
    },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 150,
      renderCell: params => <Switch checked={params?.value === '1'} inputProps={{ 'aria-label': 'controlled' }} />
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 150,
      renderCell: params => (
        <IconButton aria-label='delete' onClick={() => handleClickButton(false, params)}>
          <Edit color='primary' />
        </IconButton>
      )
    }
  ]

  const getData = async () => {
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          // console.log(res?.auth?.user)
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/affiliator/master/user/list'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ id: 0 })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [])

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      router.push('/auth')
    }
  }, [])

  useEffect(() => {
    if (triggerUpdateStatus > 0) {
      handleSubmit()
    }
  }, [triggerUpdateStatus])

  const handleClickButton = async (_isAdd = false, _params = {}) => {
    setIsAdd(false)
    setTitleModal('Ubah User')
    handleChangeEl('username', _params?.row?.username, valueModal, setValueModal, schemaData, setErrorsField)
    handleChangeEl('email', _params?.row?.email, valueModal, setValueModal, schemaData, setErrorsField)
    handleChangeEl('password', '', valueModal, setValueModal, schemaData, setErrorsField)
    handleChangeEl('telp', _params?.row?.telp, valueModal, setValueModal, schemaData, setErrorsField)
    handleChangeEl('id_user', _params?.row?.id_user, valueModal, setValueModal, schemaData, setErrorsField)
    setOpenModal(true)
  }

  const handeBeforeSubmit = async () => {
    setLoading(true)
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          // console.log(res?.auth?.user)
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/affiliator/master/user/getOTP'

        const _secret = await generateSignature(_uri)

        const _valueModal = valueModal
        if (!_valueModal?.password) {
          delete _valueModal?.password
        }

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify(valueModal)
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            setLoading(false)
            setOpenModal(false)
            setOpenModalOTP(true)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const _handleResendOTP = async _type => {
    setCountDown(60)
    setLoading(true)
    let _values = {}
    if (_type == 'otp_email') {
      _values = {
        type: 'otp_email',
        email: data?.email
      }
    } else if (_type == 'otp_wa') {
      _values = {
        type: 'otp_wa',
        merchant_wa: data?.merchant_wa,
        email: data?.email
      }
    }
    setLoading(true)
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          // console.log(res?.auth?.user)
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/affiliator/master/user/resend_otp'

        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify(_values)
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleSubmit = async (isDelete = false) => {
    setLoading(true)
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          // console.log(res?.auth?.user)
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/affiliator/master/user/update'

        const _secret = await generateSignature(_uri)

        const _valueModal = valueModal
        if (!_valueModal?.password) {
          delete _valueModal?.password
        }

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify(valueModal)
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            setData(res?.data)
            setLoading(false)
            setOpenModal(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const _handleCheckValidOTP = async _type => {
    setLoading(true)

    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/affiliator/master/user/check_valid_otp'

        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ otp_wa: oTPWA })
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message ?? 'Invalid OTP'
            })

            handleSubmit(true)
            setLoading(false)
            setOpenModalOTP(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>User</Link>
        </Typography>
        <Typography variant='body2'>Semua User yang tersedia</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              columns={columns}
              getRowId={row => row.id_user}
              slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true
                }
              }}
              sx={{ pt: 2, minHeight: '350px', '--DataGrid-overlayHeight': '300px' }}
              disableRowSelectionOnClick
            />
          </Box>
        </Card>
      </Grid>

      <ModalDialog
        titleModal={titleModal}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handeBeforeSubmit()}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            label='User Name'
            variant='outlined'
            fullWidth
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('username', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.username}
            error={errorsField?.username}
            helperText={errorsField?.username}
            inputProps={{
              autoComplete: 'new-password'
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('email', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.email}
            error={errorsField?.email}
            helperText={errorsField?.email}
            inputProps={{
              autoComplete: 'new-password'
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            id='standard-basic'
            label={'Password'}
            variant='outlined'
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('password', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.password}
            error={errorsField?.password}
            helperText={errorsField?.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              autoComplete: 'new-password',
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label='toggle password visibility'
                  >
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            id='standard-basic'
            label={'Telephone/Whatsapp'}
            variant='outlined'
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('telp', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.telp}
            error={errorsField?.telp}
            helperText={errorsField?.telp}
            InputProps={{
              autoComplete: 'new-password',
              startAdornment: <InputAdornment position='start'>+62</InputAdornment>
            }}
          />
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi OTP Ubah Data Affiliator'
        openModal={openModalOTP}
        setOpenModal={setOpenModalOTP}
        handleSubmitFunction={_handleCheckValidOTP}
      >
        <Typography>
          Kode OTP Login anda sudah dikirim
          <br />
          ke Email & WhatsApp anda {data?.merchant_wa}.
        </Typography>
        <Typography>Silakan masukkan kode OTP.</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
        </Box>

        <Box>
          <Typography variant='body2'>
            {countDown == 0 ? (
              <>
                <LinkStyled onClick={e => _handleResendOTP('otp_wa')}>Kirim Ulang Kode OTP Melalui WhatsApp</LinkStyled>
                <br />
                <br />
                <LinkStyled onClick={e => _handleResendOTP('otp_email')}>Kirim Ulang Kode OTP Melalui Email</LinkStyled>
              </>
            ) : (
              <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                Kirim Ulang Kode OTP dalam ({countDown})
              </LinkStyled>
            )}
          </Typography>
        </Box>
      </ModalDialog>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
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
    </Grid>
  )
}

export default MUITable
