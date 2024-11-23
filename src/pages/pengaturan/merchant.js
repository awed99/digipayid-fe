// ** MUI Imports
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports

import * as yup from 'yup'

import CryptoJS from 'crypto-js'
import { filter } from 'lodash'
import { generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(false)

  // ** States
  const [errorsField, setErrorsField] = useState()
  const [kasir, setKasir] = useState([])
  const [kasirSelected, setKasirSelected] = useState({})

  const [data, setData] = useState({
    id_user: null,
    merchant_name: '',
    merchant_address: '',
    merchant_wa: '',
    tax_percentage: 0
  })

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'success',
    message: ''
  })

  // ** Hooks
  const router = useRouter()

  let schemaData = yup.object().shape({
    id_user: yup.string(),
    merchant_name: yup.string().required(),
    merchant_address: yup.string().required(),
    merchant_wa: yup.string().required(),
    tax_percentage: yup.number().required()
  })

  const getData = async () => {
    setLoading(true)
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret0?.signature,
        'X-Timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          // console.log(res?.auth?.user)
          localStorage.removeItem('data-module')
          localStorage.removeItem('module')
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/master/user/setting'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ id: 0 })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            res.data.tax_percentage = parseFloat(res?.data?.tax_percentage ?? 0)
            setData(res?.data)
            setKasir(res?.cashier)
            if (parseInt(res?.data?.id_kasir) > 0) {
              setKasirSelected(filter(res?.cashier, ['id_user', res?.data?.id_kasir])[0])
            }
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
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }
  }, [])

  const handleSubmit = async (isDelete = false) => {
    if (data?.merchant_name?.length < 6) {
      alert('Merchant name must be at least 6 Characters!')

      return false
    }

    setLoading(true)
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret0?.signature,
        'X-Timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          // console.log(res?.auth?.user)
          localStorage.removeItem('data-module')
          localStorage.removeItem('module')
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/master/user/update_setting'
        const _secret = await generateSignature(_uri)

        data.id_kasir = kasirSelected?.id_user ?? 0
        data.username_kasir = kasirSelected?.username ?? ''
        data.wa_kasir = kasirSelected?.merchant_wa ?? ''

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            res.data.tax_percentage = parseFloat(res?.data?.tax_percentage ?? 0)
            setData(res?.data)
            setLoading(false)
            setAlertMessage({
              open: true,
              type: 'success',
              message: 'Berhasil merubah data merchant.'
            })
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Pengaturan</Link>
        </Typography>
        <Typography variant='body2'>Pengaturan Merchant yang tersedia</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box sx={{ p: 2 }}>
              <TextField
                label='Nama Merchant'
                variant='outlined'
                fullWidth
                autoComplete={false}
                onChange={e => handleChangeEl('merchant_name', e, data, setData, schemaData, setErrorsField)}
                value={data?.merchant_name}
                error={errorsField?.merchant_name}
                helperText={'*Perubahan setelah logout & login ulang! ' + (errorsField?.merchant_name ?? '')}
                inputProps={{
                  autoComplete: 'new-password'
                }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField
                id='merchant_address'
                name='merchant_address'
                label='Alamat Merchant'
                variant='outlined'
                fullWidth
                autoComplete={false}
                onChange={e => handleChangeEl('merchant_address', e, data, setData, schemaData, setErrorsField)}
                value={data?.merchant_address}
                error={errorsField?.merchant_address}
                helperText={'*Perubahan setelah logout & login ulang! ' + (errorsField?.merchant_address ?? '')}
                inputProps={{
                  autoComplete: 'new-password'
                }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField
                id='merchant_wa'
                name='merchant_wa'
                label='No. Whatsapp Merchant'
                variant='outlined'
                fullWidth
                autoComplete={false}
                onChange={e => handleChangeEl('merchant_wa', e, data, setData, schemaData, setErrorsField)}
                value={data?.merchant_wa}
                error={errorsField?.merchant_wa}
                helperText={'*Perubahan setelah logout & login ulang! ' + (errorsField?.merchant_wa ?? '')}
                inputProps={{
                  autoComplete: 'new-password'
                }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <InputLabel id='demo-simple-select-label'>Pajak Penjualan</InputLabel>
              <Select
                label='Pajak Penjualan'
                onChange={e => handleChangeEl('tax_percentage', e, data, setData, schemaData, setErrorsField)}
                value={data?.tax_percentage}
                error={errorsField?.tax_percentage}
              >
                <MenuItem value={0}>0%</MenuItem>
                <MenuItem value={10}>10%</MenuItem>
                <MenuItem value={11}>11%</MenuItem>
              </Select>
            </Box>
            <Box sx={{ p: 2 }}>
              <InputLabel id='Kasir'>Kasir</InputLabel>
              <Select
                labelId='Kasir'
                id='kasir'
                value={kasirSelected}
                onChange={e => setKasirSelected(e.target.value)}
                sx={{ width: '350px' }}
              >
                {kasir?.map(item => (
                  <MenuItem key={item?.id_user} value={item}>
                    {item?.username}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {/* <Box sx={{ p: 2 }}>
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
            <Box sx={{ p: 2 }}>
              <InputLabel id='demo-simple-select-label'>Privilege</InputLabel>
              <Select
                fullWidth
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={valueModal?.user_privilege}
                label='Privilege'
                size='small'
                onChange={e =>
                  handleChangeEl('user_privilege', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
              >
                {userPrivileges?.map(item => (
                  <MenuItem key={item?.id_user_privilege} value={item?.id_user_privilege}>
                    {item?.user_privilege_name}
                  </MenuItem>
                ))}
              </Select>
            </Box> */}
            <Box sx={{ p: 2 }}>
              <Button variant='contained' sx={{ mr: 35, mt: 10 }} onClick={() => handleSubmit(true)}>
                Simpan
              </Button>
              <Button
                variant='contained'
                color='warning'
                sx={{ mr: 35, mt: 10 }}
                onClick={() => router.push('/master/metode-pembayaran')}
              >
                Pengaturan Metode Pembayaran
              </Button>
              <Button
                sx={{ mr: 35, mt: 10 }}
                color='error'
                variant='contained'
                onClick={() => router.push('/master/user')}
              >
                Pengaturan User
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>

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
