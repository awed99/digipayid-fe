// ** MUI Imports
import {
  Backdrop,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
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
  const [filterWhere, setFilterWhere] = useState('1=1')
  const [filterWhereType, setFilterWhereType] = useState('1=1')

  const [dateFilter, setDateFilter] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  })
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
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    setDateFilter({ startDate: startDate, endDate: endDate })
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
        const _uri = '/affiliator/transactions/journal/list'
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
          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
            id_merchant: IdMerchantSelected,
            where: `(${filterWhere} and ${filterWhereType})`
          })
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
    // getData()
  }, [])

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }
  }, [])

  useEffect(() => {
    getData(dateFilter?.startDate, dateFilter?.endDate)
  }, [filterWhere, filterWhereType])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Jurnal Keuangan Affiliator</Link>
        </Typography>
        <Typography variant='body2'>Jurnal Keuangan</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box>
              <DateRangePicker onChange={(_startDate, _endDate) => getData(_startDate, _endDate)} /> &emsp;
              <FormControl size='small' sx={{ mt: 2 }}>
                <InputLabel id='demo-simple-select-label'>Filter Status</InputLabel>
                <Select value={filterWhere} label='Filter Status' onChange={e => setFilterWhere(e.target.value)}>
                  <MenuItem value={'1=1'}>Semua</MenuItem>
                  <MenuItem value={'status = 0'}>Dalam Proses</MenuItem>
                  <MenuItem value={'status = 1'}>Proses Kliring</MenuItem>
                  <MenuItem value={'(status = 1 or status = 2)'}>Sukses</MenuItem>
                  <MenuItem value={'status = 2'}>Selesai</MenuItem>
                  <MenuItem value={'status = 9'}>Batal</MenuItem>
                </Select>
              </FormControl>{' '}
              &emsp;
              <FormControl size='small' sx={{ mt: 2 }}>
                <InputLabel id='demo-simple-select-label'>Tipe Transaksi</InputLabel>
                <Select
                  value={filterWhereType}
                  label='Tipe Transaksi'
                  onChange={e => setFilterWhereType(e.target.value)}
                >
                  <MenuItem value={'1=1'}>Semua</MenuItem>
                  <MenuItem value={'(accounting_type = 7001 or accounting_type = 7002)'}>Fee Affiliator</MenuItem>
                  <MenuItem value={'(accounting_type = 8001 or accounting_type = 8002 or accounting_type = 8003)'}>
                    Penarikan Affiliator
                  </MenuItem>
                </Select>
              </FormControl>{' '}
              &emsp;
              <Button onClick={() => getData(dateFilter?.startDate, dateFilter?.endDate)} variant='contained'>
                Refresh
              </Button>
            </Box>

            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              columns={columns}
              getRowId={row => row.id}
              initialState={{
                ...data?.initialState,
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
