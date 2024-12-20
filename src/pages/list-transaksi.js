// ** MUI Imports
import {
  Alert,
  Backdrop,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import * as yup from 'yup'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { AccessTime, Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { handleChangeEl } from '/hooks/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

// import CryptoJS from 'crypto-js/aes'
import { filter, size } from 'lodash'
import moment from 'moment'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import { currency_format, format_rupiah, generateSignature, spacing4Char } from '/helpers/general'
import TablePagination from '/src/components/table-pagination'

import dayjs from 'dayjs'

const MUITable = () => {
  var CryptoJS = require('crypto-js')

  // ** States
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false)
  const [openModalSuccessPayment, setOpenModalSuccessPayment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [errorsField, setErrorsField] = useState()
  const [dataProduct, setDataProduct] = useState([])
  const [paymentDetail, setPaymentDetail] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalResendBilling, setOpenModalResendBilling] = useState(false)
  const [openModalConfirmationDelete, setOpenModalConfirmationDelete] = useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [loopCheckStatus, setLoopCheckStatus] = useState(0)
  const [filterWhere, setFilterWhere] = useState('1=1')

  const [dateFilter, setDateFilter] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  })
  const [reffID, setReffID] = useState(null)
  let _loopNumber = 1

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'success',
    message: ''
  })

  const [valueModalTransaction, setValueModalTransaction] = useState({
    email_customer: '',
    wa_customer: ''
  })

  let schemaDataProduct = yup.object().shape({
    email_customer: yup.string().email(),
    wa_customer: yup.string()
  })

  // ** Hooks
  const router = useRouter()

  const columns = [
    {
      field: 'invoice_number',
      headerName: 'No. Invoice',
      width: 200,
      renderCell: params => (
        <Button size='small' variant='contained' onClick={() => handleGetProducts(params?.row?.invoice_number)}>
          {params?.value}
        </Button>
      )
    },
    {
      field: 'status_transaction',
      headerName: 'Status',
      width: 120,
      renderCell: params =>
        parseInt(params?.value) === 2 ? (
          <Chip
            label='Selesai'
            color='success'
            deleteIcon={<Done />}
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
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
            label='Terbayar'
            color='primary'
            deleteIcon={<Done />}
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
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
            size='small'
            label='Menunggu Pembayaran'
            color='warning'
            deleteIcon={<AccessTime />}
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : (
          <Chip
            size='small'
            label='Batal'
            color='error'
            deleteIcon={<Close />}
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
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
      field: 'nama',
      headerName: 'Nama Pelanggan',
      type: 'number',
      width: 150

      // renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'payment_method_name',
      headerName: 'Metode Bayar',
      type: 'number',
      width: 150

      // renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'total_product',
      headerName: 'Jml Produk',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'amount_to_pay',
      headerName: 'Dibayar',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'amount_to_back',
      headerName: 'Kembalian',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah('-' + (params?.value).toString())
    },
    {
      field: 'amount',
      headerName: 'Sub Total',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'amount_tax',
      headerName: 'Pajak',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah('-' + (params?.value).toString())
    },
    {
      field: 'fee',
      headerName: 'Fee',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah('-' + (params?.value).toString())
    },
    {
      field: 'amount_to_receive',
      headerName: 'DIterima',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'time_transaction',
      headerName: 'Tanggal Transaksi',
      width: 250,
      renderCell: params => moment(params?.value).format('ddd, DD MMM YYYY - HH:mm')
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

  const columnsProducts = [
    { field: 'product_code', headerName: 'Kode', width: 125 },
    { field: 'product_name', headerName: 'Nama Produk', width: 350 },
    { field: 'product_desc', headerName: 'Ket. Produk', width: 350 },
    { field: 'product_custom_request', headerName: 'Custom Request', width: 250 },
    { field: 'product_qty', headerName: 'Jumlah', type: 'number', width: 80 },

    // { field: 'product_image_url', headerName: 'Image', width: 150 },
    {
      field: 'product_price',
      headerName: 'Harga',
      width: 120,
      type: 'number',
      renderCell: params => format_rupiah(params?.value)
    },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 120,
      renderCell: params => <img src={process.env.NEXT_PUBLIC_API + params?.value} width={100} />
    }
  ]

  const getData = async (
    startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate = dayjs().endOf('month').format('YYYY-MM-DD')
  ) => {
    setDateFilter({ startDate: startDate, endDate: endDate })
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
        const _uri = '/transactions/orders/list'
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
          body: JSON.stringify({ start_date: startDate, end_date: endDate, where: filterWhere })
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

  const reSendBilling = async (_reffID, _valueModalTransaction) => {
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
        const _uri = '/transactions/orders/resend_billing'
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
            invoice_number: _reffID,
            email_customer:
              size(_valueModalTransaction?.email_customer) < 5 ? undefined : _valueModalTransaction?.email_customer,
            wa_customer:
              size(_valueModalTransaction?.wa_customer) < 5 ? undefined : _valueModalTransaction?.wa_customer,
            nama: dataSelected?.nama
          })

          // body: dataX
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            // setData(res?.data)
            // setOpenModal2(false)
            setAlertMessage({
              open: true,
              type: 'success',
              message: 'Sukses mengirim ulang tagihan'
            })
            setLoading(false)
            setOpenModalResendBilling(false)
            setValueModalTransaction({
              email_customer: '',
              wa_customer: ''
            })
            handleChangeEl('email_customer', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('wa_customer', '', valueModal, setValueModal, schemaData, setErrorsField)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleGetProducts = async _invoice_number => {
    const _dataSelected = filter(data, ['invoice_number', _invoice_number])[0]
    setDataSelected(_dataSelected)

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
        const _uri = '/transactions/orders/get_products'
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
          body: JSON.stringify({ invoice_number: _dataSelected?.invoice_number })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setDataProduct(res?.data)
            setOpenModal(true)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const handleCancelTransaction = async () => {
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
        const _uri = '/transactions/orders/cancel_transaction'
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
          body: JSON.stringify({ invoice_number: dataSelected?.invoice_number })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setOpenModal(false)
            setOpenModalConfirmationDelete(false)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  useEffect(() => {
    return () => {
      setLoopCheckStatus(-1)
      setIsWaitingForPayment(false)
    }
  }, [])

  useEffect(() => {
    if (isWaitingForPayment === true && reffID && loopCheckStatus === 0) {
      setTimeout(() => setLoopCheckStatus(1), 1000)
    }
    if (isWaitingForPayment === true && reffID && loopCheckStatus > 0) {
      setTimeout(() => handleCheckStatus(reffID), 5000)
    }
  }, [isWaitingForPayment, reffID, loopCheckStatus])

  const handleCheckStatus = async (_reffID, _loop = 100) => {
    const _isWaitingForPayment = isWaitingForPayment
    const _paymentDetail = paymentDetail

    if (isWaitingForPayment === true && reffID) {
      if (!_isWaitingForPayment) {
        return false
      }

      // setLoading(true)
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
          const _uri = '/transactions/orders/check_status'
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

            body: JSON.stringify({ invoice_number: _reffID })

            // body: dataX
          })
            .then(res => res.json())
            .then(res => {
              // console.log('res: ', parseInt(res?.status))
              if (parseInt(res?.status) > 0) {
                setAlertMessage({
                  open: true,
                  type: 'success',
                  message: 'Pembayaran Berhasil.'
                })
                setOpenModalPayment(false)
                setOpenModal(false)
                setOpenModalSuccessPayment(true)
                setIsWaitingForPayment(false)
                setReffID(null)
                getData()
              } else {
                // console.log('_isWaitingForPayment: ', _isWaitingForPayment)
                // console.log('reff_id: ', _paymentDetail?.req?.reff_id)
                if (_isWaitingForPayment === true && _paymentDetail?.req?.reff_id && _loop < 1000) {
                  _loop = loopCheckStatus + 1

                  // setTimeout(() => handleCheckStatus(_reffID, _loop), 5000)
                  setTimeout(() => setLoopCheckStatus(_loop), 5000)
                } else {
                  setIsWaitingForPayment(false)
                }
              }
              setLoading(false)
            })
            .catch(() => setLoading(false))
        })
        .catch(() => setLoading(false))
    } else {
      setTimeout(() => handleCheckStatus(_reffID, _loop), 5000)
    }
  }

  const getDetailPayment = async (_dataSelected = dataSelected) => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)
    setLoading(true)

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
        const _uri = '/transactions/journal/check_deposit_ewallet'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({
            invoice_number: _dataSelected?.invoice_number,
            amount: _dataSelected?.amount_to_pay,
            payment_method: _dataSelected?.payment_method_code
          })
        })
          .then(res => res.json())
          .then(res => {
            setReffID(_dataSelected?.invoice_number)
            setPaymentDetail(res?.payment)

            // setLoading(false)
            setOpenModalPayment(true)
            setLoading(false)
          })
      })
      .catch(() => setLoading(false))
  }

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }
  }, [])

  useLayoutEffect(() => {
    if (openModalPayment === false) {
      setReffID(null)
      setLoopCheckStatus(0)
      setIsWaitingForPayment(false)
    }
  }, [openModalPayment])

  useEffect(() => {
    getData(dateFilter?.startDate, dateFilter?.endDate)
  }, [filterWhere])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>List Transaksi</Link>
        </Typography>
        <Typography variant='body2'>List Transaksi</Typography>
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
                  <MenuItem value={'status_transaction = 0'}>Menunggu Pembayaran</MenuItem>
                  <MenuItem value={'status_transaction = 1'}>Proses Kliring</MenuItem>
                  <MenuItem value={'(status_transaction = 1 or status_transaction = 2)'}>Sukses</MenuItem>
                  <MenuItem value={'status_transaction = 2'}>Selesai</MenuItem>
                  <MenuItem value={'status_transaction = 9'}>Batal</MenuItem>
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
              getRowId={row => row.id_transaction}
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
                        Qty Terjual :&nbsp;
                        {currency_format(
                          filter(
                            data,
                            item => item?.status_transaction === '2' || item?.status_transaction === '1'
                          )?.reduce((total, item) => parseInt(total) + parseInt(item?.total_qty ?? 0), 0)
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Produk Terjual :&nbsp;
                        {currency_format(
                          filter(
                            data,
                            item => item?.status_transaction === '2' || item?.status_transaction === '1'
                          )?.reduce((total, item) => parseInt(total) + parseInt(item?.total_product), 0)
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>Transaksi Kliring : {currency_format(filter(data, ['status_transaction', '1'])?.length)}</b>
                    </Typography>
                    <Typography>
                      <b>Transaksi Selesai : {currency_format(filter(data, ['status_transaction', '2'])?.length)}</b>
                    </Typography>
                    <Typography>
                      <b>
                        Transaksi Belum terbayar : {currency_format(filter(data, ['status_transaction', '0'])?.length)}
                      </b>
                    </Typography>
                    <Typography>
                      <b>Transaksi Batal : {currency_format(filter(data, ['status_transaction', '9'])?.length)}</b>
                    </Typography>
                    <Typography>
                      <b>
                        Total Terbayar : IDR{' '}
                        {currency_format(
                          filter(
                            data,
                            item => item?.status_transaction === '2' || item?.status_transaction === '1'
                          )?.reduce((total1, item) => parseInt(total1) + parseInt(item?.amount), 0)
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Total Diterima : IDR{' '}
                        {currency_format(
                          filter(
                            data,
                            item => item?.status_transaction === '2' || item?.status_transaction === '1'
                          )?.reduce((total1, item) => parseInt(total1) + parseInt(item?.amount_to_receive), 0)
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
        titleModal={'List Produk Transaksi: ' + dataSelected?.nama + ' || ' + dataSelected?.invoice_number}
        openModal={openModal}
        setOpenModal={setOpenModal}
        size='xl'
        ButtonDialogs={
          <Box sx={{ display: 'block', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {dataSelected?.status_transaction === '0' && (
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  sx={{ m: 3, float: 'left' }}
                  style={{ float: 'left' }}
                  onClick={() => setOpenModalConfirmationDelete(true)}
                >
                  Batalkan
                </Button>
              )}

              {dataSelected?.status_transaction === '0' && (
                <Button
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{ m: 3 }}
                  onClick={() => getDetailPayment(dataSelected)}
                >
                  Bayar
                </Button>
              )}
              <Button variant='contained' size='small' sx={{ m: 3 }} onClick={() => setOpenModal(false)}>
                Tutup
              </Button>
            </Box>
          </Box>
        }

        // handleSubmitFunction={() => handleSubmit()}
      >
        <Box sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Card>
              <Box sx={{ width: '100%', overflow: 'auto' }}>
                <DataGrid
                  density={'compact'}
                  autoHeight
                  rows={dataProduct}
                  columns={columnsProducts}
                  getRowId={row => row.id_product}
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
                          <b>{dataProduct?.length} Produk</b>
                        </Typography>
                        <Typography>
                          <b>
                            Jumlah Item :{' '}
                            {format_rupiah(
                              dataProduct
                                ?.reduce((total, item) => parseInt(total) + parseInt(item?.product_qty), 0)
                                ?.toString()
                            )}
                          </b>
                        </Typography>
                        <Typography>
                          <b>
                            Total :{' '}
                            {format_rupiah(
                              dataProduct
                                ?.reduce(
                                  (total, item) =>
                                    parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                                  0
                                )
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
                />
              </Box>
            </Card>
          </Grid>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi Batalkan Transaksi'
        openModal={openModalConfirmationDelete}
        setOpenModal={setOpenModalConfirmationDelete}
        handleSubmitFunction={handleCancelTransaction}
      >
        <Box>
          Apakah anda yakin ingin membatalkan transaksi <b>{dataSelected?.invoice_number}</b> ?
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal={'Form Pembayaran ' + dataSelected?.invoice_number}
        openModal={openModalPayment}
        setOpenModal={setOpenModalPayment}
      >
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, textAlign: 'center' }}>
            <Box>
              <Typography>
                <h3>
                  IDR {format_rupiah(paymentDetail?.res?.data?.amount ?? paymentDetail?.res?.data?.total_bayar ?? '0')}
                </h3>
              </Typography>
            </Box>
            <Box>
              <Typography>Berlaku dalam 10 Menit</Typography>
              {dataSelected?.payment_method_code === 'QRIS_PAYLATER' && (
                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                  BAYAR SESUAI NOMINAL, AGAR PEMBAYARANMU BERHASIL.
                </Typography>
              )}
            </Box>
            <Box>
              <Typography>Metode Pembayaran : {dataSelected?.payment_method_name ?? 'QRIS'}</Typography>
            </Box>
            <Box>
              {dataSelected?.payment_method_code === 'QRIS' || dataSelected?.payment_method_code === 'QRIS_PAYLATER' ? (
                <>
                  <img src={`${paymentDetail?.res?.data?.qr_link}`} width={320} />
                </>
              ) : paymentDetail?.res?.data?.paylater_url ||
                paymentDetail?.res?.data?.ovo_push ||
                paymentDetail?.res?.data?.pay_url ||
                paymentDetail?.res?.data?.checkout_url ? (
                <>
                  <a
                    href={
                      paymentDetail?.res?.data?.ovo_push ??
                      paymentDetail?.res?.data?.checkout_url ??
                      paymentDetail?.res?.data?.pay_url ??
                      paymentDetail?.res?.data?.paylater_url
                    }
                    target='_blank'
                  >
                    <Button variant='contained' size='small' sx={{ m: 3 }}>
                      Bayar {dataSelected?.payment_method_name}
                    </Button>
                  </a>
                </>
              ) : parseInt(dataSelected?.id_payment_method) >= 1 && parseInt(dataSelected?.id_payment_method) <= 10 ? (
                <>
                  <Typography>
                    Nomor Rekening Tujuan :{' '}
                    <b>
                      {spacing4Char(
                        parseInt(dataSelected?.id_payment_method) === 4
                          ? '70017' + paymentDetail?.res?.data?.nomor_va
                          : '' + paymentDetail?.res?.data?.nomor_va
                      )}
                    </b>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography>
                    Nomor Rekening Tujuan :{' '}
                    <b>
                      {spacing4Char(
                        parseInt(dataSelected?.id) === '4'
                          ? '70017' + paymentDetail?.res?.data?.nomor_va
                          : '' + paymentDetail?.res?.data?.nomor_va
                      )}
                    </b>
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              <Typography>
                <Divider>Status Pembayaran</Divider>
              </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant='contained'
                size='small'
                sx={{ m: 3 }}
                disabled={isWaitingForPayment}
                onClick={() => setIsWaitingForPayment(true)}
              >
                {isWaitingForPayment ? 'Dalam Pengecekan' : 'Cek Status Pembayaran'}
              </Button>
              {isWaitingForPayment && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px'
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography>
                <Divider>atau</Divider>
              </Typography>
            </Box>
            <Box>
              <Button
                variant='contained'
                size='small'
                color='warning'
                sx={{ m: 3 }}
                onClick={() => setOpenModalResendBilling(true)}
              >
                Kirim Ulang Tagihan (WA/Email)
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Kirim Ulang Tagihan (WA/Email)'
        openModal={openModalResendBilling}
        setOpenModal={setOpenModalResendBilling}
        handleSubmitFunction={() =>
          (size(valueModalTransaction?.email_customer) > 0 || size(valueModalTransaction?.wa_customer) > 0) &&
          reSendBilling(paymentDetail?.req?.reff_id, valueModalTransaction)
        }
        size='sm'
      >
        <Box>
          <h5>Data Pelanggan (Struk Digital - Go Green)</h5>
          <Box sx={{ mt: 0 }}>
            <TextField
              autoFocus={true}
              label='No Whatsapp'
              variant='outlined'
              fullWidth
              size='small'
              onChange={e =>
                handleChangeEl(
                  'wa_customer',
                  e,
                  valueModalTransaction,
                  setValueModalTransaction,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={valueModalTransaction?.wa_customer}
            />
          </Box>
          <Box>
            <TextField
              label='Email Pelanggan'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 4 }}
              onChange={e =>
                handleChangeEl(
                  'email_customer',
                  e,
                  valueModalTransaction,
                  setValueModalTransaction,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={valueModalTransaction?.email_customer}
            />
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Notifikasi'
        openModal={openModalSuccessPayment}
        setOpenModal={setOpenModalSuccessPayment}
      >
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, paddingBottom: 15, textAlign: 'center' }}>
            <Typography>
              Transaksi <b>{paymentDetail?.req?.reff_id}</b>
            </Typography>
            <Typography>telah dibayar</Typography>
            {paymentDetail?.res?.data?.total_bayar ? (
              <Typography variant='h5'>IDR {format_rupiah(paymentDetail?.res?.data?.total_bayar)}</Typography>
            ) : (
              <Typography variant='h5'>Dengan uang tunai.</Typography>
            )}
          </Box>
        </Box>
      </ModalDialog>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={alertMessage?.open}
        autoHideDuration={6000}
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
