// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

import CryptoJS from 'crypto-js'
import { generateSignature } from '/helpers/general'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const columns = [
    { field: 'no', headerName: '#', width: 50 },
    { field: 'product_code', headerName: 'Kode Produk', width: 150 },
    { field: 'product_name', headerName: 'Nama Produk', width: 350 },
    { field: 'product_qty', headerName: 'Stok', width: 50 },

    // { field: 'product_image_url', headerName: 'Image', width: 150 },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 'auto',
      renderCell: params => <img src={params?.value} />
    },
    {
      field: 'product_status',
      headerName: 'Status',
      width: 'auto',
      renderCell: params => <Chip label={'Aktif'} color='primary' />
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // ** States
  const [data, setData] = useState([])

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
        const _uri = '/master/product/lists'
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
          <Link>Produk</Link>
        </Typography>
        <Typography variant='body2'>Semua produk yang tersedia</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <DataGrid
              autoHeight
              rows={data}
              getRowId={row => row.id_product}
              columns={columns}
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
