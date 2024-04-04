// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Next Import
import { useRouter } from 'next/router'

import CryptoJS from 'crypto-js'

// ** React Imports
import { useEffect, useState } from 'react'

import MetodePembayaran from './views/metode-pembayaran'

import { generateSignature } from '/helpers/general'

// ** MUI Imports

// ** Demo Components Imports

const MUITable = () => {
  // ** Hooks
  const router = useRouter()

  // ** States
  const [data, setData] = useState(null)

  const getData = async () => {
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${_uri0}`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ filter: '1=1' })
    })
      .then(res => res.json())
      .then(async res => {
        if (res?.auth?.user === undefined || res?.auth?.token === undefined) {
          console.log(res?.auth?.user)
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/master/payment_method/list'
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
            console.log(res?.data)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Metode Pembayaran</Link>
        </Typography>
        <Typography variant='body2'>Semua Metode Pembayaran yang tersedia</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <MetodePembayaran data={data} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MUITable
