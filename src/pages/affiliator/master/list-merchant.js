// ** MUI Imports
import { Backdrop, CircularProgress, Switch } from '@mui/material'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

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
import { generateSignature } from '/helpers/general'

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(true)

  // ** States
  const [data, setData] = useState([])

  // ** Hooks
  const router = useRouter()

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/

  let schemaData = yup.object().shape({
    id_user: yup.string(),
    merchant_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().matches(passwordRegExp, 'Min 8 Chars, Uppercase, Lowercase, Number and Special Character'),
    telp: yup.string().required(),
    user_privilege: yup.string().required()
  })

  let _loopNumber = 1

  const columns = [
    { field: 'merchant_name', headerName: 'Merchant Name', width: 200 },
    { field: 'username', headerName: 'Owner Name', width: 200 },

    {
      field: 'telp',
      headerName: 'Telp/WA',
      width: 200,
      renderCell: params => (
        <a target='_blank' href={'//wa.me/+62' + params.value} rel='noreferrer'>
          +62{params.value}
        </a>
      )
    },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: params => <Switch checked={params?.value === '1'} inputProps={{ 'aria-label': 'controlled' }} />
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
        const _uri = '/affiliator/master/user/list_merchant'
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
            setData(res?.data ?? [])
            // getUserPrivileges()
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>List Merchant</Link>
        </Typography>
        <Typography variant='body2'>Semua Merchant yang ada</Typography>
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

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </Grid>
  )
}

export default MUITable
