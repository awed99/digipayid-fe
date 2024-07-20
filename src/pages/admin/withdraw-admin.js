// ** MUI Imports
import {
  Alert,
  Backdrop,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  Paper,
  Snackbar,
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { AccessTime, Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// import CryptoJS from 'crypto-js/aes'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import { format_rupiah, generateSignature } from '/helpers/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

import dayjs from 'dayjs'

const MUITable = () => {
  var CryptoJS = require('crypto-js')

  // ** States
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [saldo, setSaldo] = useState(0)
  const [amount, setAmount] = useState(0)
  const [fee, setFee] = useState(5000)
  const [openModal, setOpenModal] = useState(false)

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'success',
    message: ''
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
        const _uri = '/admin/transactions/journal/withdraw_admin'
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
          body: JSON.stringify({ start_date: startDate, end_date: endDate })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setSaldo(res?.saldo)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const handleWithdraw = async (
    e,
    _startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    _endDate = dayjs().endOf('month').format('YYYY-MM-DD')
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
        const _uri = '/admin/transactions/journal/create_withdraw_admin'
        const _secret = await generateSignature(_uri)

        // console.log('_startDate: ', _startDate)
        // console.log('_endDate: ', _endDate)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({
            amount: amount,
            fee: fee,
            start_date: _startDate,
            end_date: _endDate
          })
        })
          .then(res => res.json())
          .then(res => {
            setData(res?.data)
            setSaldo(res?.saldo)
            setAmount(0)
            setAlertMessage({
              open: true,
              type: res?.code == 1 ? 'error' : 'success',
              message: res?.message
            })
            setOpenModal(false)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    // console.log('amount: ', amount)
  }, [amount])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Withdraw Admin (IDR {format_rupiah(saldo)})</Link>
        </Typography>
        <Typography variant='body2'>List Withdraw Admin</Typography>
      </Grid>

      <Grid item xs={12} flex={1} justifyContent={'space-between'} sx={{ display: 'flex' }}>
        <Grid container spacing={6} flex={1} justifyContent={'space-between'} sx={{ display: 'flex' }}>
          <Grid item xs={12} md={5}>
            <div style={{ width: '100%', display: 'inline-block' }}>
              <div>
                <Paper sx={{ padding: '20px', paddingTop: '5px', paddingBottom: '30px' }}>
                  <h5>Penarikan Uang ke Rekening Perusahaan.</h5>
                  <Typography sx={{ fontSize: '12px' }}>
                    <b>Saldo : IDR {format_rupiah(saldo)}</b>
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>Minimal penarikan IDR 100.000.</Typography>
                  <Typography sx={{ fontSize: '12px' }}>Maximal penarikan IDR 100.000.000.</Typography>
                  <Typography sx={{ fontSize: '10px' }}>Biaya admin penarikan PG IDR {format_rupiah(fee)}.</Typography>
                  <Typography sx={{ fontSize: '10px' }}>Uang yang diterima akan dikurangi biaya admin PG.</Typography>
                  <br />
                  <NumericFormat
                    customInput={TextField}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
                    }}
                    label='*Penarikan sudah termasuk biaya'
                    placeholder='Min. 50.000'
                    variant='outlined'
                    size='small'
                    fullWidth
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    onBlur={e => e.target.value ?? 0}
                    value={amount}
                    onValueChange={e => setAmount(parseInt(e?.value.toString()?.replace(/\./g, '').replace(/\,/g, '')))}
                    onFocus={e => e.target.select()}
                  />
                  <br />
                  <br />
                  <br />
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => setOpenModal(true)}
                    style={{ marginTop: '-30px', float: 'right' }}
                    disabled={
                      isNaN(amount) ||
                      parseInt(amount) < 100000 ||
                      parseInt(amount) > 100000000 ||
                      parseInt(amount) > saldo
                    }

                    // disabled={
                    //   data?.reduce((total1, item) => parseInt(total1) + parseInt(item?.amount_credit), 0) -
                    //     data?.reduce((total2, item) => parseInt(total2) + parseInt(item?.amount_debet), 0) <
                    //   50000
                    // }
                  >
                    Tarik Uang
                  </Button>
                </Paper>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box>
              <DateRangePicker onChange={(_startDate, _endDate) => getData(_startDate, _endDate)} />
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
                pagination: TablePagination,
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

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>

      <ModalDialog
        titleModal='Konfirmasi Penarikan Dana'
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={handleWithdraw}
      >
        <Box style={{ width: 550 }}>
          Apakah anda yakin ingin melakukan penarikan dana sebesar <br />
          <b>Permintaan : IDR {format_rupiah(amount)} ?</b>
          <Typography>
            <b>Biaya : IDR {format_rupiah(fee)}</b>
          </Typography>
          <Typography sx={{ fontSize: 24 }}>
            <b>Diterima : IDR {format_rupiah(amount - fee)}</b>
          </Typography>
        </Box>
      </ModalDialog>
    </Grid>
  )
}

export default MUITable
