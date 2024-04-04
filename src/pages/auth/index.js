// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

import CryptoJS from 'crypto-js'
import { values as vals } from 'lodash'
import ReCAPTCHA from 'react-google-recaptcha'

import * as yup from 'yup'

import { generateSignature } from '/helpers/general'
import { handleSubmitLogin } from '/hooks/auth'
import { handleChangeEl } from '/hooks/general'

// ** MUI Components
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material'
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

  // ** State

  const [captcha, setCaptcha] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorsField, setErrorsField] = useState()
  const [captchaRisk, setCaptchaRisk] = useState(0)
  const [loading, setLoading] = useState(false)

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

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const checkSession = async () => {
    const _uri = '/api/check-auth'
    const _secret = await generateSignature(_uri)

    fetch(`${_uri}`, {
      method: 'POST',
      headers: {
        'x-signature': _secret?.signature,
        'x-timestamp': _secret?.timestamp
      },
      body: JSON.stringify({ filter: '1=1' })
    })
      .then(res => res.json())
      .then(res => {
        if (res?.auth?.user && res?.auth?.token) {
          router.push('/')
        }
      })
      .catch(() => false)
  }

  useEffect(() => {
    checkSession()
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
    if (vals(errorsField)?.length > 0) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: vals(errorsField)[0] == 'Error' ? 'Fill all required fields!' : vals(errorsField)[0]
      })
      setLoading(false)

      return false
    }
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
        const res = await handleSubmitLogin(e, schemaData, values)

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
          const _uri = '/api/set-storage'
          const _secret = await generateSignature(_uri)
          fetch(`${_uri}`, {
            method: 'POST',
            headers: {
              'x-signature': _secret?.signature,
              'x-timestamp': _secret?.timestamp
            },
            body: JSON.stringify({
              key: 'auth',
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
            .then(res => setTimeout(() => (window.location = '/'), 2500))
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

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logo.png' width={70} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName} 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
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
              <FormControlLabel control={<Checkbox checked />} label='Remember Me' />
              <Link passHref href='/auth/reset-password'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              disabled={!captcha}
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={e => handleSubmit(e)}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/auth/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
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
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
