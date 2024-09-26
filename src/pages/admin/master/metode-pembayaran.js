// ** MUI Imports
import { Backdrop, CircularProgress, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Next Import
import { useRouter } from 'next/router'

import CryptoJS from 'crypto-js'

// ** React Imports
import { filter } from 'lodash'
import { useEffect, useLayoutEffect, useState } from 'react'

import MetodePembayaran from './views/metode-pembayaran'

import { generateSignature } from '/helpers/general'

// ** MUI Imports

// ** Demo Components Imports

const MUITable = () => {
  // ** Hooks
  const router = useRouter()

  // ** States
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

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
        const _uri = '/admin/master/payment_method/lists'
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

  const updateData = async bodyData => {
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
        const _uri = '/admin/master/payment_method/update'
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
          body: JSON.stringify(bodyData)
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData([...res?.data])
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      router.push('/auth')
    }
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link>TUNAI</Link>
          </Typography>
          <Typography variant='body2'>Metode Pembayaran Tunai (CASH)</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {filter(data, ['payment_method_type', '0'])?.map((item, index) => (
              <Grid item xs={12} md={4} key={item?.payment_method_code}>
                <MetodePembayaran data={item} updateData={() => true} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link>QRIS</Link>
          </Typography>
          <Typography variant='body2'>Metode Pembayaran QRIS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {filter(data, ['payment_method_type', '1'])?.map((item, index) => (
              <Grid item xs={12} md={4} key={item?.payment_method_code}>
                <MetodePembayaran data={item} updateData={updateData} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Divider />

        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link>E-Wallet</Link>
          </Typography>
          <Typography variant='body2'>Metode Pembayaran E-Wallet</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {filter(data, ['payment_method_type', '2'])?.map((item, index) => (
              <Grid item xs={12} md={4} key={item?.payment_method_code}>
                <MetodePembayaran data={item} updateData={updateData} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link>Virtual Akun</Link>
          </Typography>
          <Typography variant='body2'>Metode Pembayaran Virtual Akun</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {filter(data, ['payment_method_type', '3'])?.map((item, index) => (
              <Grid item xs={12} md={4} key={item?.payment_method_code}>
                <MetodePembayaran data={item} updateData={updateData} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link>Pulsa</Link>
          </Typography>
          <Typography variant='body2'>Metode Pembayaran Pulsa</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {filter(data, ['payment_method_type', '4'])?.map((item, index) => (
              <Grid item xs={12} md={4} key={item?.payment_method_code}>
                <MetodePembayaran data={item} updateData={updateData} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </>
  )
}

export default MUITable
