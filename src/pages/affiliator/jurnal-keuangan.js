// ** MUI Imports
import { Autocomplete, Backdrop, Card, Chip, CircularProgress, Divider, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { AccessTime, Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// import CryptoJS from 'crypto-js/aes'
import { filter } from 'lodash'
import moment from 'moment'
import DateRangePicker from 'src/components/date-range-picker'
import { format_rupiah, generateSignature } from '/helpers/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

import dayjs from 'dayjs'

const MUITable = () => {
  var CryptoJS = require('crypto-js')

  // ** States
  const [loading, setLoading] = useState([])
  const [data, setData] = useState([])

  const [IdMerchantSelected, setIdMerchantSelected] = useState(0)
  const [merchants, setMerchants] = useState([])

  const [dateRange, setDateRange] = useState([])
  let _loopNumber = 1

  // ** Hooks
  const router = useRouter()

  const columns = [
    {
      field: 'amount_credit',
      headerName: 'Kredit',
      width: 110,
      type: 'number',
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'amount_debet',
      headerName: 'Debet',
      width: 110,
      type: 'number',
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: params =>
        parseInt(params?.value) === 0 ? (
          <Chip
            label='Menunggu Pembayaran'
            color='warning'
            deleteIcon={<AccessTime />}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : parseInt(params?.value) === 1 ? (
          <Chip
            label='Proses Kliring'
            color='primary'
            deleteIcon={<Done />}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : parseInt(params?.value) === 2 ? (
          <Chip
            label='Selesai'
            color='success'
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : parseInt(params?.value) === 3 ? (
          <Chip
            label='Proses Kliring'
            color='warning'
            deleteIcon={<AccessTime />}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : (
          <Chip
            label='Batal'
            color='error'
            deleteIcon={<Close />}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        )
    },
    {
      field: 'created_at',
      headerName: 'Tanggal Transaksi',
      width: 250,
      renderCell: params => moment(params?.value).format('ddd, DD MMM YYYY - HH:mm')
    },
    {
      field: 'description',
      headerName: 'Keterangan',
      width: 350
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

  const getData = async (
    startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate = dayjs().endOf('month').format('YYYY-MM-DD')
  ) => {
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
        const _uri = '/admin/transactions/journal/list'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ start_date: startDate, end_date: endDate, id_merchant: IdMerchantSelected })
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

  const getMerchants = async () => {
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
        const _uri = '/admin/master/user/lists'
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
            const _merchants = []
            filter(res?.data, { id_user_parent: '0' })?.forEach(item => {
              _merchants.push({ id: item?.id_user, label: item?.merchant_name })
            })

            // console.log('merchants: ', _merchants)
            setMerchants(_merchants)

            getPaymentMethods()
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    getMerchants()
  }, [])

  useEffect(() => {
    // console.log('IdMerchantSelected: ', IdMerchantSelected)
    if (IdMerchantSelected > 0) {
      getData()
    } else {
      setData([])
    }
  }, [IdMerchantSelected])

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
          <Link>Jurnal Keuangan</Link>
        </Typography>
        <Typography variant='body2'>Jurnal Keuangan</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box>
              <DateRangePicker
                onChange={(_startDate, _endDate) => IdMerchantSelected > 0 && getData(_startDate, _endDate)}
              />{' '}
              &emsp;
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={merchants}
                sx={{ width: 300, display: 'inline-block', verticalAlign: 'middle' }}
                value={filter(merchants, ['id', IdMerchantSelected])[0]}
                onChange={(_event, newValue) => {
                  setIdMerchantSelected(newValue?.id ?? 0)
                }}
                renderInput={params => <TextField {...params} label='Pilih Merchant' />}
              />
            </Box>

            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              columns={columns}
              getRowId={row => row.id}
              initialState={{
                ...data.initialState,
                pagination: { paginationModel: { pageSize: 25 } }
              }}
              slots={{
                toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
                footer: () => (
                  <Box sx={{ p: 3 }}>
                    <Divider />
                    <Box>
                      <TablePagination />
                    </Box>
                    <Divider />
                    <Typography>
                      <b>
                        Kredit : IDR{' '}
                        {format_rupiah(
                          data?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_credit), 0)?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Debet : IDR{' '}
                        {format_rupiah(
                          data?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_debet), 0)?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Keuntungan : IDR{' '}
                        {format_rupiah(
                          data?.reduce((total1, item) => parseInt(total1) + parseInt(item?.amount_credit), 0) -
                            data?.reduce((total2, item) => parseInt(total2) + parseInt(item?.amount_debet), 0)
                        )}
                      </b>
                    </Typography>
                  </Box>
                )
              }}
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
