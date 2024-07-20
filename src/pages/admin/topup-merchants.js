// ** MUI Imports
import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Snackbar,
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import { filter } from 'lodash'
import moment from 'moment'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import { format_rupiah, generateSignature, spacing4Char } from '/helpers/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [dataPM, setDataPM] = useState({})
  const [dataBank, setDataBank] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [withdrawMethods, setWithdrawMethods] = useState([])
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [paymentDetail, setPaymentDetail] = useState({})
  const [paymentDetailInfo, setPaymentDetailInfo] = useState({})
  const [openModalPaymentInfo, setOpenModalPaymentInfo] = useState(false)
  const [saldo, setSaldo] = useState(0)
  const [valuePM, setValuePM] = useState()

  const [IdMerchantSelected, setIdMerchantSelected] = useState(0)
  const [merchants, setMerchants] = useState([])

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
      field: 'amount_credit',
      headerName: 'Nominal',
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
            label='Dalam Proses'
            color={
              parseInt(params?.row?.accounting_type) === 1 || parseInt(params?.row?.accounting_type) === 2
                ? 'warning'
                : 'secondary'
            }
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
        ) : (
          <Chip
            label='Canceled'
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

  const getPaymentMethods = async () => {
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'x-signature': _secret0?.signature,
        'x-timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(async res => await res.json())
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

        await fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
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
          .then(async res => await res.json())
          .then(async res => {
            // console.log(res?.data)
            const _data = []
            const __data = []

            // const _dataMain = (res?.data).filter(({ id_payment_method }) =>
            //   console.log('id_payment_method: ', id_payment_method)
            // )
            const _dataMain = (res?.data).filter(({ id_payment_method }) => parseInt(id_payment_method) > 0)

            // console.log('_dataMain: ', _dataMain)
            _dataMain?.forEach((item, index) => {
              const ___data = { id: item?.id_payment_method, label: item?.payment_method_name, ...item }
              _data.push(___data)
              if (item?.can_withdraw === '1') {
                const ____data = { id: item?.id_payment_method, label: item?.bank_short_name, ...item }
                __data.push(____data)
              }
            })

            // console.log({ _data, __data })
            await setPaymentMethods(_data)
            await setWithdrawMethods(__data)

            return __data
          })

          // .then(async _res => {
          //   if (_res?.length > 0) {
          //     // console.log('_res: ', _res)
          //     await getData(
          //       dayjs().startOf('month').format('YYYY-MM-DD'),
          //       dayjs().endOf('month').format('YYYY-MM-DD'),
          //       _res
          //     )
          //   }
          // })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const getData = async (
    startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate = dayjs().endOf('month').format('YYYY-MM-DD'),
    _withdrawMethods = withdrawMethods
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
        const _uri = '/admin/transactions/journal/list_topup_users'
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
          body: JSON.stringify({ start_date: startDate, end_date: endDate, id_merchant: IdMerchantSelected })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setSaldo(
              filter(res?.data, ['status', '1'])?.reduce(
                (total1, item) => parseInt(total1) + parseInt(item?.amount_credit),
                0
              ) -
                filter(res?.data, ['status', '1'])?.reduce(
                  (total2, item) => parseInt(total2) + parseInt(item?.amount_debet),
                  0
                )
            )
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
          .catch(() => false)
      })
      .catch(() => false)
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

  const handleCheckDeposit = async (_amount, _inv_no, _pg_method) => {
    setOpenModalPaymentInfo(false)
    setLoading(true)
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    setDataPM(filter(paymentMethods, ['payment_method_code', _pg_method])[0])
    setValuePM(filter(paymentMethods, ['payment_method_code', _pg_method])[0])

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
        const _uri = '/admin/transactions/journal/check_deposit_ewallet'
        const _secret = await generateSignature(_uri)

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
            invoice_number: _inv_no,
            amount: _amount,
            payment_method: _pg_method,
            id_merchant: IdMerchantSelected
          })
        })
          .then(res => res.json())
          .then(res => {
            getPaymentMethods()
            setPaymentDetail(res?.payment)
            setPaymentDetailInfo(res?.payment)
            setLoading(false)
            setOpenModalPaymentInfo(true)
            setDataBank(res?.data_bank)
          })
      })
      .catch(() => setLoading(false))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Topup Merchants</Link>
        </Typography>
        <Typography variant='body2'>History Topup Merchants</Typography>
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
                    <Typography color='primary'>
                      <b>
                        Sudah Dibayar : IDR{' '}
                        {format_rupiah(
                          filter(data, ['status', '1'])
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_credit), 0)
                            ?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography color='orange'>
                      <b>
                        Belum Dibayar : IDR{' '}
                        {format_rupiah(
                          filter(data, ['status', '0'])
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_credit), 0)
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
        titleModal='Detail Info Pembayaran'
        openModal={openModalPaymentInfo}
        setOpenModal={setOpenModalPaymentInfo}
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
                    <h3>IDR {format_rupiah(paymentDetailInfo?.res?.data?.total_bayar)}</h3>
                  </Typography>
                </Box>
                <Box>
                  <Typography>Berlaku dalam 10 Menit</Typography>
                </Box>
                <Box>
                  <Typography>
                    Metode Pembayaran :{' '}
                    <b>
                      {filter(paymentMethods, ['id_payment_method', dataPM?.id_payment_method])[0]?.payment_method_name}
                    </b>
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Status :{' '}
                    <b>
                      {(paymentDetailInfo?.res?.data?.status === 'Unpaid' ? 'Belum Dibayar' : 'Sudah Dibayar') ??
                        'Belum Dibayar'}
                    </b>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
                  {parseInt(valuePM?.id) == 18 || parseInt(valuePM?.id) == 19 ? (
                    <>
                      <img src={`${process.env.NEXT_PUBLIC_API}/${paymentDetailInfo?.image_src}`} />
                    </>
                  ) : parseInt(valuePM?.id) >= 12 && parseInt(valuePM?.id) <= 16 ? (
                    <>
                      <Button
                        variant='contained'
                        size='small'
                        sx={{ m: 3 }}
                        onClick={() => (window.location = paymentDetail?.res?.data?.pay_url)}
                      >
                        Bayar {valuePM?.label}
                      </Button>
                    </>
                  ) : parseInt(valuePM?.id) >= 1 && parseInt(valuePM?.id) <= 10 ? (
                    <>
                      <Typography>
                        Nomor Rekening Tujuan :{' '}
                        <b>
                          {spacing4Char(
                            parseInt(valuePM?.id) === '4'
                              ? '70017' + paymentDetail?.res?.data?.nomor_va
                              : '' + paymentDetail?.res?.data?.nomor_va
                          )}
                        </b>
                      </Typography>
                    </>
                  ) : (parseInt(valuePM?.id) >= 11 && parseInt(valuePM?.id) <= 17) ||
                    (parseInt(valuePM?.id) >= 20 && parseInt(valuePM?.id) <= 23) ||
                    (parseInt(valuePM?.id) >= 35 && parseInt(valuePM?.id) <= 37) ? (
                    <>
                      <Typography sx={{ maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis' }} noWrap>
                        Klik link berikut :{' '}
                        <b>
                          <a href={paymentDetail?.res?.data?.checkout_url} target='_blank'>
                            {paymentDetail?.res?.data?.checkout_url}
                          </a>
                        </b>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>
                        Nomor Rekening Tujuan :{' '}
                        <b>
                          {spacing4Char(
                            parseInt(valuePM?.id) === '4'
                              ? '70017' + paymentDetail?.res?.data?.nomor_va
                              : '' + paymentDetail?.res?.data?.nomor_va
                          )}
                        </b>
                      </Typography>
                    </>
                  )}
                </Box>
              </>
            }
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
