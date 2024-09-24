// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

import CryptoJS from 'crypto-js'
import { values as vals } from 'lodash'
import { MuiOtp } from 'mui-otp-input-field'
import ReCAPTCHA from 'react-google-recaptcha'

import store from 'store'
import * as yup from 'yup'

import ModalDialog from 'src/components/dialog'
import { generateSignature } from '/helpers/general'
import {
  handleChange_password,
  handleCheckValidForgotPasswordOTP,
  handleCheckValidOTP,
  handleGetForgotPasswordOTP,
  handleResendOTP,
  handleSubmitLogin
} from '/hooks/auth'
import { handleChangeEl } from '/hooks/general'

// ** MUI Components
import { Alert, Backdrop, CircularProgress, Divider, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports
import { Visibility, VisibilityOff } from '@mui/icons-material'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

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

const LoginPage = () => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/

  let schemaData = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(passwordRegExp, 'Min 8 Chars, Uppercase, Lowercase, Number and Special Character')
      .required()
  })

  let schemaDataForgotPassword = yup.object().shape({
    merchant_wa: yup.number().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(passwordRegExp, 'Min 8 Chars, Uppercase, Lowercase, Number and Special Character')
      .required()
  })

  // ** State
  const [countDown, setCountDown] = useState(0)
  const [captcha, setCaptcha] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorsField, setErrorsField] = useState({})
  const [errorsFieldForgotPassword, setErrorsFieldForgotPassword] = useState({})
  const [captchaRisk, setCaptchaRisk] = useState(0)
  const [openModalOTPEmail, setOpenModalOTPEmail] = useState(false)
  const [openModalOTPWA, setOpenModalOTPWA] = useState(false)
  const [openModalOTPLogin, setOpenModalOTPLogin] = useState(false)
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false)
  const [oTPEmail, setOTPEmail] = useState('')
  const [oTPWA, setOTPWA] = useState('')
  const [loading, setLoading] = useState(false)
  const [userRole, setUserRole] = useState(false)
  const [dataModule, setDataModule] = useState(false)

  const [stepForgotPassword, setStepForgotPassword] = useState(1)
  const [newPassword, setNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const [valuesForgotPassword, setValuesForgotPassword] = useState({
    merchant_wa: '',
    email: '',
    password: '',
    token: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const checkSession = async () => {
    const _uri = '/auth/check_auth'
    const _secret = await generateSignature(_uri)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri}`, {
      method: 'POST',
      headers: {
        'x-signature': _secret?.signature,
        'x-timestamp': _secret?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(res => {
        if (res?.auth?.user && res?.auth?.token) {
          router.push('/')
        }
      })
      .catch(() => false)
  }

  useLayoutEffect(() => {
    // componentWillMount events

    checkSession()
  }, [])

  useEffect(() => {
    handleChangeEl('email', '', values, setValues, schemaData, setErrorsField)
  }, [])

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async e => {
    setLoading(true)

    vals(errorsField).map(item => {
      if (item) {
        setAlertMessage({
          open: true,
          type: 'error',
          message: vals(errorsField)[0] == 'Error' ? 'Fill all required fields!' : vals(errorsField)[0]
        })
        setLoading(false)

        return

        return false
      }
    })
    if (!captcha) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Captcha is required!'
      })
      setLoading(false)

      return false
    } else {
      if (captchaRisk < 0.5) {
        setAlertMessage({
          open: true,
          type: 'error',
          message: 'High risk action detected!'
        })
        setLoading(false)

        return false
      } else {
        const res = await handleSubmitLogin(e, schemaData, values).catch(() => setLoading(false))

        // console.log('res?.data: ', res?.data)
        // console.log('res?.data?.token: ', res?.data?.token)

        if (parseInt(res?.data?.is_verified) < 1) {
          setLoading(false)
          setOpenModalOTPEmail(true)

          return false
        }

        // router.push('')

        setAlertMessage({
          open: true,
          type: res?.code > 0 ? 'error' : 'primary',
          message: res?.code > 0 ? res?.error : res?.message
        })
        setLoading(false)

        if (res?.code < 1) {
          setDataModule({
            username: res?.data?.username,
            email: res?.data?.email,
            merchant_name: res?.data?.merchant_name,
            merchant_wa: res?.data?.merchant_wa,
            merchant_address: res?.data?.merchant_address,
            username: res?.data?.username,
            user_privilege_name: res?.data?.user_privilege_name
          })
          const _user_role = res?.data?.user_role

          const _uri = '/auth/set_storage'
          const _secret = await generateSignature(_uri)
          fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
            method: 'POST',
            headers: {
              'x-signature': _secret?.signature,
              'x-timestamp': _secret?.timestamp
            },
            body: JSON.stringify({
              key: res?.data?.email,
              val: {
                user: CryptoJS.AES.encrypt(
                  `${JSON.stringify(res?.data)}`,
                  `${process.env.NEXT_PUBLIC_BE_API_KEY}`
                ).toString(),
                token: CryptoJS.AES.encrypt(
                  `${JSON.stringify(res?.data?.token_login)}`,
                  `${process.env.NEXT_PUBLIC_BE_API_KEY}`
                ).toString()
              }
            })
          })
            .then(res => res.json())
            .then(res => {
              setCountDown(60)
              setOpenModalOTPLogin(true)
              if (parseInt(_user_role) === 2) {
                setUserRole('user')

                // store.set('module', 'user')
                // setTimeout(() => router.push('/'), 100)
              } else if (parseInt(_user_role) === 1) {
                setUserRole('admin')

                // store.set('module', 'admin')
                // setTimeout(() => router.push('/admin'), 100)
              } else {
                setUserRole('affiliator')

                // store.set('module', 'admin')
                // setTimeout(() => router.push('/admin'), 100)
              }
            })
            .catch(() => setLoading(false))

          // Store.set(
          //   'user',
          //   CryptoJS.AES.encrypt(`${JSON.stringify(res?.data)}`, `${process.env.NEXT_PUBLIC_BE_API_KEY}`).toString()
          // )
          // Store.set(
          //   'token',
          //   CryptoJS.AES.encrypt(
          //     `${JSON.stringify(res?.data?.token_login)}`,
          //     `${process.env.NEXT_PUBLIC_BE_API_KEY}`
          //   ).toString()
          // )
          // setTimeout(() => (window.location = '/'), 2500)
        }

        return false
      }
    }
  }

  const _handleCheckValidOTPLogin = async _type => {
    setLoading(true)

    const _values = {
      type: 'otp_login',
      merchant_wa: dataModule.merchant_wa,
      email: dataModule.email,
      otp_wa: oTPWA
    }
    const res = await handleCheckValidOTP(_values).catch(() => setLoading(false))

    setAlertMessage({
      open: true,
      type: res?.code < 1 ? 'primary' : 'error',
      message: res?.code < 1 ? res?.message : 'Kode OTP tidak valid !'
    })
    setLoading(false)

    if (res?.code < 1) {
      setOTPEmail('')
      setOTPWA('')
      setOpenModalOTPLogin(false)
      setDataModule({})

      // router.push('/')
      store.set('data-module', dataModule)
      if (userRole && userRole == 'user') {
        store.set('module', 'user')
        setTimeout(() => router.push('/'), 100)
      } else if (userRole && userRole == 'admin') {
        store.set('module', 'admin')
        setTimeout(() => router.push('/admin'), 100)
      } else if (userRole && userRole == 'affiliator') {
        store.set('module', 'affiliator')
        setTimeout(() => router.push('/affiliator'), 100)
      }

      setUserRole(false)
    }
  }

  const _handleCheckValidOTP = async _type => {
    setLoading(true)
    let _values = {}
    if (_type == 'email') {
      _values = {
        type: 'register_otp_email',
        email: dataModule.email,
        otp_email: oTPEmail
      }
    } else if (_type == 'wa') {
      _values = {
        type: 'register_otp_wa',
        merchant_wa: dataModule.merchant_wa,
        email: dataModule.email,
        otp_wa: oTPWA
      }
    }
    const res = await handleCheckValidOTP(_values).catch(() => setLoading(false))

    setAlertMessage({
      open: true,
      type: res?.code > 0 ? 'error' : 'primary',
      message: res?.code > 0 ? res?.error : res?.message
    })
    setLoading(false)

    if (res?.code < 1) {
      setOTPEmail('')
      setOTPWA('')
      if (_type == 'email') {
        setOpenModalOTPEmail(false)
        setOpenModalOTPWA(true)
      } else {
        setOpenModalOTPEmail(false)
        setOpenModalOTPWA(false)
        router.push('/')
      }
    }
  }

  const _handleResendOTP = async _type => {
    setCountDown(60)
    setLoading(true)
    let _values = {}
    if (_type == 'email') {
      _values = {
        type: 'register_otp_email',
        email: dataModule.email
      }
    } else if (_type == 'wa') {
      _values = {
        type: 'register_otp_wa',
        merchant_wa: dataModule.merchant_wa,
        email: dataModule.email
      }
    } else if (_type == 'login_email') {
      _values = {
        type: 'otp_login_email',
        email: dataModule.email
      }
    } else if (_type == 'login_wa') {
      _values = {
        type: 'otp_login_wa',
        merchant_wa: dataModule.merchant_wa,
        email: dataModule.email
      }
    }
    const res = await handleResendOTP(_values).catch(() => setLoading(false))

    setAlertMessage({
      open: true,
      type: res?.code > 0 ? 'error' : 'primary',
      message: res?.code > 0 ? res?.error : res?.message
    })
    setLoading(false)
  }

  const _handleGetForgotPasswordOTP = async _type => {
    setLoading(true)

    let _values = {
      email: valuesForgotPassword?.email,
      merchant_wa: valuesForgotPassword?.merchant_wa
    }
    const res = await handleGetForgotPasswordOTP(_values).catch(() => setLoading(false))

    if (parseInt(res?.code) < 1) {
      setStepForgotPassword(2)
    }

    setAlertMessage({
      open: true,
      type: res?.code > 0 ? 'error' : 'primary',
      message: res?.code > 0 ? res?.error : res?.message
    })
    setCountDown(60)
    setLoading(false)
  }

  const _handleCheckValidForgotPasswordOTP = async _type => {
    setLoading(true)

    let _values = {
      otp_email: oTPEmail,
      otp_wa: oTPWA
    }
    const res = await handleCheckValidForgotPasswordOTP(_values).catch(() => setLoading(false))

    if (parseInt(res?.code) < 1) {
      handleChangeEl(
        'token',
        res?.token,
        valuesForgotPassword,
        setValuesForgotPassword,
        schemaDataForgotPassword,
        setErrorsFieldForgotPassword
      )
      setStepForgotPassword(3)
    }

    setAlertMessage({
      open: true,
      type: res?.code > 0 ? 'error' : 'primary',
      message: res?.code > 0 ? res?.error : res?.message
    })
    setLoading(false)
  }

  const _handleChange_password = async _type => {
    setLoading(true)

    let _values = {
      token_login: valuesForgotPassword?.token,
      password: valuesForgotPassword?.password
    }
    const res = await handleChange_password(_values).catch(() => setLoading(false))

    if (parseInt(res?.code) < 1) {
      if (parseInt(res?.code) < 1) {
        setStepForgotPassword(4)
      }
    }

    setValuesForgotPassword({
      merchant_wa: '',
      email: '',
      password: '',
      token: '',
      showPassword: false
    })

    setAlertMessage({
      open: true,
      type: res?.code > 0 ? 'error' : 'primary',
      message: res?.code > 0 ? res?.error : res?.message
    })
    setLoading(false)
  }

  useEffect(() => {
    fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/telp-304809/assessments?key=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_API_KEY}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: {
            token: captcha,
            expectedAction: 'USER_ACTION',
            siteKey: process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY
          }
        })
      }
    )
      .then(res => res.json())
      .then(async res => {
        setCaptchaRisk(res?.riskAnalysis?.score)
      })
  }, [captcha])

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

  useEffect(() => {
    if (!openModalChangePassword && stepForgotPassword === 4) {
      setStepForgotPassword(1)
    }
    setOTPEmail('')
    setOTPWA('')
  }, [openModalChangePassword, openModalOTPWA, openModalOTPEmail, stepForgotPassword])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logo.png' width={70} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Selamat Datang di {themeConfig.templateName} 👋🏻
            </Typography>
            <Typography variant='body2'>Silakan Login dan rasakan pengalaman kemudahannya.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='standard-basic'
              label={'Email'}
              variant='outlined'
              size='medium'
              onChange={e => handleChangeEl('email', e, values, setValues, schemaData, setErrorsField)}
              value={values?.email}
              error={errorsField?.email}
              helperText={errorsField?.email}
              sx={{ mb: 4 }}
            />

            <FormControl fullWidth>
              <TextField
                fullWidth
                id='standard-basic'
                label={'Password'}
                variant='outlined'
                size='medium'
                onChange={e => handleChangeEl('password', e, values, setValues, schemaData, setErrorsField)}
                value={values?.password}
                error={errorsField?.password}
                helperText={errorsField?.password}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
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
            </FormControl>

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

            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox checked />} label='Ingat sesi login' />
              {/* <Link passHref href='/auth/reset-password'> */}
              <LinkStyled onClick={e => setOpenModalChangePassword(true)} sx={{ cursor: 'pointer' }}>
                Lupa Password?
              </LinkStyled>
              {/* </Link> */}
            </Box>
            <Button
              fullWidth
              disabled={!captcha || Object.keys(errorsField).length > 0}
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={e => handleSubmit(e)}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Belum punya akun?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/register'>
                  <LinkStyled>Register Akun</LinkStyled>
                </Link>
              </Typography>
            </Box>

            <Divider>atau</Divider>

            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link passHref href='/auth/register-affiliator'>
                Register Sebagai Affiliator
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />

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
        titleModal='Konfirmasi OTP Email'
        openModal={openModalOTPEmail}
        setOpenModal={setOpenModalOTPEmail}
        handleSubmitFunction={() => _handleCheckValidOTP('email')}
      >
        <Typography>Kode OTP Email anda sudah dikirim ke Email anda {values?.email}.</Typography>
        <Typography>Silahkan konfirmasikan dengan memasukkan kode OTP Melalui Email.</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp length={6} value={oTPEmail} onChange={e => setOTPEmail(e)} />
        </Box>

        <Box>
          <Typography variant='body2'>
            {countDown == 0 ? (
              <LinkStyled onClick={e => _handleResendOTP('email')}>Kirim Ulang Kode OTP</LinkStyled>
            ) : (
              <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                Kirim Ulang Kode OTP dalam ({countDown})
              </LinkStyled>
            )}
          </Typography>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi OTP WhatsApp'
        openModal={openModalOTPWA}
        setOpenModal={setOpenModalOTPWA}
        handleSubmitFunction={() => _handleCheckValidOTP('wa')}
      >
        <Typography>Kode OTP Email anda sudah dikirim ke WhatsApp anda {values?.merchant_wa}.</Typography>
        <Typography>Silahkan konfirmasikan dengan memasukkan kode OTP Melalui WhatsApp.</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
        </Box>

        <Box>
          <Typography variant='body2'>
            {countDown == 0 ? (
              <LinkStyled onClick={e => _handleResendOTP('wa')}>Kirim Ulang Kode OTP</LinkStyled>
            ) : (
              <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                Kirim Ulang Kode OTP dalam ({countDown})
              </LinkStyled>
            )}
          </Typography>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Lupa Password'
        openModal={openModalChangePassword}
        setOpenModal={setOpenModalChangePassword}
        ButtonDialogs={
          stepForgotPassword === 1 ? (
            <Button
              disabled={
                errorsFieldForgotPassword?.merchant_wa ||
                errorsFieldForgotPassword?.email ||
                !valuesForgotPassword?.merchant_wa ||
                !valuesForgotPassword?.email
              }
              variant='contained'
              sx={{ m: 3 }}
              onClick={_handleGetForgotPasswordOTP}
            >
              Lanjut
            </Button>
          ) : stepForgotPassword === 2 ? (
            <Button
              disabled={!oTPEmail || !oTPWA}
              variant='contained'
              sx={{ m: 3 }}
              onClick={_handleCheckValidForgotPasswordOTP}
            >
              Lanjut
            </Button>
          ) : stepForgotPassword === 3 ? (
            <Button
              disabled={
                errorsFieldForgotPassword?.token ||
                errorsFieldForgotPassword?.password ||
                !valuesForgotPassword?.password
              }
              variant='contained'
              sx={{ m: 3 }}
              onClick={_handleChange_password}
            >
              Submit
            </Button>
          ) : undefined
        }
      >
        {stepForgotPassword === 1 && (
          <Box>
            <Typography>Masukkan Email Untuk Pembaharuan Password.</Typography>
            <TextField
              fullWidth
              type='email'
              label='Email'
              sx={{ marginBottom: 4, mt: 4 }}
              onChange={e =>
                handleChangeEl(
                  'email',
                  e,
                  valuesForgotPassword,
                  setValuesForgotPassword,
                  schemaDataForgotPassword,
                  setErrorsFieldForgotPassword
                )
              }
              value={valuesForgotPassword?.email}
              error={errorsFieldForgotPassword?.email}
              helperText={errorsFieldForgotPassword?.email}
            />
            <Typography>Masukkan No. WhatsApp Untuk Pembaharuan Password.</Typography>
            <TextField
              autoFocus
              fullWidth
              id='merchant_wa'
              label='No. Whatsapp'
              sx={{ marginBottom: 4, mt: 4 }}
              onChange={e =>
                handleChangeEl(
                  'merchant_wa',
                  e,
                  valuesForgotPassword,
                  setValuesForgotPassword,
                  schemaDataForgotPassword,
                  setErrorsFieldForgotPassword
                )
              }
              value={valuesForgotPassword?.merchant_wa}
              error={errorsFieldForgotPassword?.merchant_wa}
              helperText={errorsFieldForgotPassword?.merchant_wa}
            />
          </Box>
        )}

        {stepForgotPassword === 2 && (
          <Box>
            <Typography>Kode OTP Email anda sudah dikirim ke Email & WhatsApp anda {values?.merchant_wa}.</Typography>
            <Typography>Silahkan konfirmasikan dengan memasukkan kode OTP Melalui Email & WhatsApp.</Typography>
            <Box sx={{ p: 10 }}>
              <Typography>Masukkan OTP Email</Typography>
              <MuiOtp length={6} value={oTPEmail} onChange={e => setOTPEmail(e)} />
            </Box>
            <Box sx={{ p: 10 }}>
              <Typography>Masukkan OTP WhatsApp</Typography>
              <MuiOtp length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
            </Box>

            <Box>
              <Typography variant='body2'>
                {countDown == 0 ? (
                  <LinkStyled onClick={_handleGetForgotPasswordOTP} sx={{ cursor: 'pointer' }}>
                    Kirim Ulang Kode OTP
                  </LinkStyled>
                ) : (
                  <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                    Kirim Ulang Kode OTP dalam ({countDown})
                  </LinkStyled>
                )}
              </Typography>
            </Box>
          </Box>
        )}

        {stepForgotPassword === 3 && (
          <Box>
            <Typography>Silahkan masukkan password baru anda.</Typography>
            <Box sx={{ p: 10 }}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  id='standard-basic'
                  label={'Password'}
                  variant='outlined'
                  size='medium'
                  onChange={e =>
                    handleChangeEl(
                      'password',
                      e,
                      valuesForgotPassword,
                      setValuesForgotPassword,
                      schemaDataForgotPassword,
                      setErrorsFieldForgotPassword
                    )
                  }
                  value={valuesForgotPassword?.password}
                  error={errorsFieldForgotPassword?.password}
                  helperText={errorsFieldForgotPassword?.password}
                  type={valuesForgotPassword?.showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() =>
                            handleChangeEl(
                              'showPassword',
                              !valuesForgotPassword?.showPassword,
                              valuesForgotPassword,
                              setValuesForgotPassword,
                              schemaDataForgotPassword,
                              setErrorsFieldForgotPassword
                            )
                          }
                          aria-label='toggle password visibility'
                        >
                          {!valuesForgotPassword?.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        )}

        {stepForgotPassword === 4 && (
          <Box>
            <Typography>Password anda telah berhasil diperbaharui.</Typography>
          </Box>
        )}
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi OTP Login'
        openModal={openModalOTPLogin}
        setOpenModal={setOpenModalOTPLogin}
        handleSubmitFunction={() => _handleCheckValidOTPLogin('otp_login')}
      >
        <Typography>
          Kode OTP Login anda sudah dikirim
          <br />
          ke Email & WhatsApp anda {values?.merchant_wa}.
        </Typography>
        <Typography>Silakan masukkan kode OTP.</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
        </Box>

        <Box>
          <Typography variant='body2'>
            {countDown == 0 ? (
              <>
                <LinkStyled onClick={e => _handleResendOTP('login_wa')}>
                  Kirim Ulang Kode OTP Melalui WhatsApp
                </LinkStyled>
                <br />
                <br />
                <LinkStyled onClick={e => _handleResendOTP('login_email')}>
                  Kirim Ulang Kode OTP Melalui Email
                </LinkStyled>
              </>
            ) : (
              <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                Kirim Ulang Kode OTP dalam ({countDown})
              </LinkStyled>
            )}
          </Typography>
        </Box>
      </ModalDialog>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
