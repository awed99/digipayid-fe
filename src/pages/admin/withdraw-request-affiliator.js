// ** MUI Imports
import { Alert, Backdrop, Button, Card, Chip, CircularProgress, Divider, Snackbar } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CryptoJS from 'crypto-js'
import { filter } from 'lodash'
import moment from 'moment'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import { format_rupiah, generateSignature, spacing4Char } from '/helpers/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

import dayjs from 'dayjs'

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [paymentDetail, setPaymentDetail] = useState({})
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [saldo, setSaldo] = useState(0)
  const [fee, setFee] = useState(5000)
  const [valuePM, setValuePM] = useState()

  const [valueWD, setValueWD] = useState({
    amount: 0,
    bank_account: '',
    bank_account_name: '',
    data_bank: { id: 0, label: '', bank_short_name: '', bank_name: '' }
  })

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'success',
    message: ''
  })
  let _loopNumber = 1

  // ** Hooks
  const router = useRouter()
  const selectRef = useRef()
  const textSelectRef = useRef()

  const columns = [
    {
      field: 'invoice_number',
      headerName: 'Invoice Number',
      width: 150,
      renderCell: params => (
        <Typography variant='body2' fontSize={10}>
          {params?.value}
        </Typography>
      )
    },
    {
      field: 'amount_debet',
      headerName: 'Nominal',
      width: 110,
      type: 'number',
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'merchant_name',
      headerName: 'Nama Merchant',
      width: 230
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: params =>
        parseInt(params?.value) === 1 ? (
          <Chip
            label='Dalam Proses'
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
            color='secondary'
            deleteIcon={<Done />}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : parseInt(params?.value) === 0 ? (
          <Chip
            label='Dalam Proses'
            color='warning'
            deleteIcon={<Close />}
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
      field: 'action',
      headerName: 'Tindakan',
      width: 250,
      renderCell: params =>
        parseInt(params?.row?.status) === 0 || parseInt(params?.row?.status) === 1 ? (
          <Button variant='contained' size='small' onClick={() => handleProcess(params?.row)}>
            Proses Penarikan
          </Button>
        ) : (
          <></>
        )
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
    _startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    _endDate = dayjs().endOf('month').format('YYYY-MM-DD')
  ) => {
    setLoading(true)
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret0?.signature,
        'X-Timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(async res => await res.json())
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
        const _uri = '/admin/transactions/journal/list_withdraw_request_affiliator'
        const _secret = await generateSignature(_uri)

        await fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ start_date: _startDate, end_date: _endDate })
        })
          .then(async res => await res.json())
          .then(async res => {
            // console.log(res?.data)
            setData(res?.data)
            setSaldo(res?.saldo)
            setLoading(false)
            setOpenModalConfirm(false)
            setOpenModalPayment(false)
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

  const handleProcess = (dataRow = {}) => {
    dataRow['status'] = 1
    setPaymentDetail({ ...dataRow })
    setOpenModalPayment(true)
    handleUpdateRequestStatus(dataRow)
  }

  const handleComplete = () => {
    const dataRow = paymentDetail
    dataRow['status'] = 2
    setPaymentDetail({ ...dataRow })

    // setOpenModalPayment(true)
    handleUpdateRequestStatus(dataRow)
  }

  const handleUpdateRequestStatus = async (
    dataRow = {},
    _startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    _endDate = dayjs().endOf('month').format('YYYY-MM-DD')
  ) => {
    setLoading(true)
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret0?.signature,
        'X-Timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(async res => await res.json())
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
        const _uri = '/admin/transactions/journal/update_withdraw_request_affiliator'
        const _secret = await generateSignature(_uri)

        await fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({
            start_date: _startDate,
            end_date: _endDate,
            id_user: dataRow?.id_user,
            status: dataRow?.status,
            invoice_number: dataRow?.invoice_number,
            merchant_wa: dataRow?.merchant_wa,
            amount: dataRow?.amount_debet,
            fee: fee
          })
        })
          .then(async res => await res.json())
          .then(async res => {
            // console.log(res?.data)
            setData(res?.data)
            setSaldo(res?.saldo)
            setLoading(false)
            if (dataRow?.status === 1) {
              setOpenModalConfirm(false)
            } else {
              setOpenModalConfirm(false)
              setOpenModalPayment(false)
            }
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Withdraw Request Affiliator</Link>
        </Typography>
        <Typography variant='h6'>
          <Link>Current Admin Saldo : IDR {format_rupiah(saldo)}</Link>
        </Typography>
        <Typography variant='body2'>Affiliator Withdraw Request List</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box>
              <DateRangePicker onChange={(_startDate, _endDate) => getData(_startDate, _endDate)} /> &emsp;
              <Button onClick={() => getData()} variant='contained'>
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
                    <Typography color='green'>
                      <b>Saldo Admin : IDR {format_rupiah(saldo)}</b>
                    </Typography>
                    <Typography color='orange'>
                      <b>
                        Belum Ditransfer : IDR{' '}
                        {format_rupiah(
                          filter(data, ['status', '0'])
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_debet), 0)
                            ?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography color='primary'>
                      <b>
                        Sudah Ditransfer : IDR{' '}
                        {format_rupiah(
                          filter(data, ['status', '2'])
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_debet), 0)
                            ?.toString()
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

      <ModalDialog
        titleModal='Konfirmasi'
        openModal={openModalPayment}
        setOpenModal={setOpenModalPayment}
        handleSubmitFunction={() => {
          setOpenModalConfirm(true)
          setOpenModalPayment(false)
        }}
      >
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, textAlign: 'center' }}>
            {
              <>
                <Box>
                  <Typography>
                    <h3>IDR {format_rupiah(paymentDetail?.amount_debet)}</h3>
                  </Typography>
                </Box>
                <Box>
                  <Typography>Berlaku dalam 10 Menit</Typography>
                </Box>
                <Box>
                  <Typography>
                    Status : <b>Dalam Proses</b>
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
                  <Typography>
                    Metode Penarikan <br />
                    <b>{paymentDetail?.bank_name}</b>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
                  <Typography>
                    Nomor Akun / Rekening Tujuan
                    <br />
                    <b>{spacing4Char(paymentDetail?.bank_account)}</b>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
                  <Typography>
                    Nama Akun / Rekening Tujuan
                    <br />
                    <b>{paymentDetail?.bank_account_name}</b>
                  </Typography>
                </Box>
              </>
            }
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Detail Info Pembayaran'
        openModal={openModalConfirm}
        setOpenModal={setOpenModalConfirm}
        handleSubmitFunction={() => handleComplete()}
      >
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, textAlign: 'center' }}>
            Apakah anda yakin,
            <br />
            sudah melakukan transfer ke Rekening Tujuan Merchant ?
          </Box>
        </Box>
      </ModalDialog>

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
    </Grid>
  )
}

export default MUITable
