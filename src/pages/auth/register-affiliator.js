// ** React Imports
import { Fragment, useEffect, useLayoutEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

import { values as vals } from 'lodash'
import { MuiOtp } from 'mui-otp-input-field'
import ReCAPTCHA from 'react-google-recaptcha'
import * as yup from 'yup'

import ModalDialog from 'src/components/dialog'
import { generateSignature } from '/helpers/general'
import { handleCheckValidOTP, handleResendOTP, handleSubmitRegisterAffiliator } from '/hooks/auth'
import { handleChangeEl } from '/hooks/general'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar from '@mui/material/Snackbar'
import { styled, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

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
  cursor: 'pointer',
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
  root: {
    '&[disabled]': {
      color: 'grey',
      cursor: 'default',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/

  let schemaData = yup.object().shape({
    username: yup.string().required(),
    merchant_name: yup.string(),
    merchant_address: yup.string().required(),
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
  const [isChecked, setIsChecked] = useState(false)
  const [errorsField, setErrorsField] = useState()
  const [captchaRisk, setCaptchaRisk] = useState(0)
  const [openModalOTPEmail, setOpenModalOTPEmail] = useState(false)
  const [openModalOTPWA, setOpenModalOTPWA] = useState(false)
  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const [oTPEmail, setOTPEmail] = useState('')
  const [oTPWA, setOTPWA] = useState('')
  const [loading, setLoading] = useState(false)

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  const [values, setValues] = useState({
    username: '',
    merchant_name: '',
    merchant_address: '',
    merchant_wa: '',
    email: '',
    password: ''
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const checkSession = async () => {
    const _uri = '/api/check-auth'
    const _secret = await generateSignature(_uri)

    await fetch(`${_uri}`, {
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
          // router.push('/')
        }
      })
      .catch(() => false)
  }

  useEffect(() => {
    handleChangeEl('username', '', values, setValues, schemaData, setErrorsField)
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
        const res = await handleSubmitRegisterAffiliator(e, schemaData, values).catch(() => setLoading(false))

        // console.log('res?.data: ', res?.data)
        // console.log('res?.data?.token: ', res?.data?.token)

        // console.log('res: ', res)
        // router.push('')

        setAlertMessage({
          open: true,
          type: res?.code > 0 ? 'error' : 'primary',
          message: res?.code > 0 ? res?.error : res?.message
        })
        setLoading(false)

        if (res?.code < 1) {
          setOpenModalOTPEmail(true)
        }

        // if (res?.code < 1) {
        //   const _uri = '/api/set-storage'
        //   const _secret = await generateSignature(_uri)
        //   fetch(`${_uri}`, {
        //     method: 'POST',
        //     headers: {
        //       'x-signature': _secret?.signature,
        //       'x-timestamp': _secret?.timestamp
        //     },
        //     body: JSON.stringify({
        //       key: 'auth',
        //       val: {
        //         user: CryptoJS.AES.encrypt(`${JSON.stringify(res?.data)}`, `${process.env.NEXT_PUBLIC_API}`).toString(),
        //         token: CryptoJS.AES.encrypt(
        //           `${JSON.stringify(res?.data?.token_login)}`,
        //           `${process.env.NEXT_PUBLIC_API}`
        //         ).toString()
        //       }
        //     })
        //   })
        //     .then(res => res.json())

        //     // .then(res => setTimeout(() => (window.location = '/'), 2500))
        //     .catch(() => {
        //       setLoading(false)
        //     })

        //   // Store.set(
        //   //   'user',
        //   //   CryptoJS.AES.encrypt(`${JSON.stringify(res?.data)}`, `${process.env.NEXT_PUBLIC_API}`).toString()
        //   // )
        //   // Store.set(
        //   //   'token',
        //   //   CryptoJS.AES.encrypt(
        //   //     `${JSON.stringify(res?.data?.token_login)}`,
        //   //     `${process.env.NEXT_PUBLIC_API}`
        //   //   ).toString()
        //   // )
        //   // setTimeout(() => (window.location = '/'), 2500)
        // }

        return false
      }
    }
  }

  const _handleCheckValidOTP = async _type => {
    setLoading(true)
    let _values = {}
    if (_type == 'email') {
      _values = {
        type: 'register_otp_email',
        email: values.email,
        otp_email: oTPEmail
      }
    } else if (_type == 'wa') {
      _values = {
        type: 'register_otp_wa',
        merchant_wa: values.merchant_wa,
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
      if (_type == 'email') {
        setOpenModalOTPEmail(false)
        setOpenModalOTPWA(true)
      } else {
        setOpenModalOTPEmail(false)
        setOpenModalOTPWA(false)
        setOpenModalSuccess(true)
        setTimeout(() => {
          router.push('/auth')
        }, 10000)
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
        email: values.email
      }
    } else if (_type == 'wa') {
      _values = {
        type: 'register_otp_wa',
        merchant_wa: values.merchant_wa
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
      .catch(() => false)
  }, [captcha])

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

  useLayoutEffect(() => {
    // componentWillMount events

    checkSession()
  }, [])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logo.png' width={70} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Register Affiliator {themeConfig.templateName} 👋🏻
            </Typography>
            <Typography variant='body2'>Register dan rasakan pengalaman kemudahannya.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              size='small'
              id='username'
              label='Nama Lengkap'
              sx={{ marginBottom: 4 }}
              onChange={e => {
                handleChangeEl('username', e, values, setValues, schemaData, setErrorsField)
                handleChangeEl('merchant_name', e, values, setValues, schemaData, setErrorsField)
              }}
              value={values?.username}
              error={errorsField?.username}
              helperText={errorsField?.username}
            />
            <TextField
              fullWidth
              size='small'
              id='merchant_address'
              label='Alamat Affiliator'
              sx={{ marginBottom: 4 }}
              onChange={e => handleChangeEl('merchant_address', e, values, setValues, schemaData, setErrorsField)}
              value={values?.merchant_address}
              error={errorsField?.merchant_address}
              helperText={errorsField?.merchant_address}
            />

            <Divider />

            <TextField
              fullWidth
              size='small'
              id='merchant_wa'
              label='No. Whatsapp'
              sx={{ marginBottom: 4 }}
              onChange={e => handleChangeEl('merchant_wa', e, values, setValues, schemaData, setErrorsField)}
              value={values?.merchant_wa}
              error={errorsField?.merchant_wa}
              helperText={errorsField?.merchant_wa}
            />
            <TextField
              fullWidth
              size='small'
              type='email'
              label='Email'
              sx={{ marginBottom: 4 }}
              onChange={e => handleChangeEl('email', e, values, setValues, schemaData, setErrorsField)}
              value={values?.email}
              error={errorsField?.email}
              helperText={errorsField?.email}
            />

            <FormControl fullWidth>
              <TextField
                fullWidth
                id='standard-basic'
                label={'Password'}
                variant='outlined'
                size='small'
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

            <FormControlLabel
              control={<Checkbox value={'isChecked'} onChange={e => setIsChecked(!isChecked)} />}
              label={
                <Fragment>
                  <span>Saya menyetujui </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={e => setIsChecked(!isChecked)}>syarat & ketentuan</LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button
              disabled={!captcha || !isChecked || Object.keys(errorsField).length > 0}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={e => handleSubmit(e)}
            >
              Register
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Sudah punya akun?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth'>
                  <LinkStyled>Silakan Login</LinkStyled>
                </Link>
              </Typography>
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
          <MuiOtp autoFocus length={6} value={oTPEmail} onChange={e => setOTPEmail(e)} />
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
          <MuiOtp autoFocus length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
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
        titleModal='Registrasi Sukses'
        openModal={openModalSuccess}
        setOpenModal={setOpenModalSuccess}
        handleSubmitFunction={() => router.push('/auth')}
      >
        <Typography>Akun anda berhasil terdaftar.</Typography>
        <Typography>Silahkan login untuk melanjutkan.</Typography>
      </ModalDialog>
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
