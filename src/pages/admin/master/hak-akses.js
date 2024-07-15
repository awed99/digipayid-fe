// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CryptoJS from 'crypto-js'
import { generateSignature } from '/helpers/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

const MUITable = () => {
  // ** States
  const [data, setData] = useState([])
  let _loopNumber = 1

  // ** Hooks
  const router = useRouter()

  const columns = [
    { field: 'user_privilege_name', headerName: 'Hak Akses', width: 200 },
    {
      field: 'user_privilege_type',
      headerName: 'User Role',
      width: 100,
      renderCell: params =>
        parseInt(params?.value) === 1 ? (
          <Chip label={'Admin'} color='primary' size='small' />
        ) : (
          <Chip label={'Merchant'} color='warning' size='small' />
        )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 'auto',
      renderCell: params => <Chip label={'Aktif'} color='success' size='small' />
    }

    // {
    //   field: 'proses',
    //   headerName: 'Proses',
    //   minWidth: 30,
    //   width: 100,
    //   align: 'left',
    //   renderCell: params => <Chip label={params?.value} color='primary' />

    //   // format: value => value.toFixed(2)
    // },
  ]

  const getData = async () => {
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${_uri0}`, {
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
        const _uri = '/admin/master/user/privilege_list'
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
          <Link>Hak Akses</Link>
        </Typography>
        <Typography variant='body2'>Semua Hak Akses yang tersedia</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              columns={columns}
              getRowId={row => row.id_user_privilege}
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
    </Grid>
  )
}

export default MUITable
