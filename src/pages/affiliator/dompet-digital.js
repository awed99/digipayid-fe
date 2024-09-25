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
  InputAdornment,
  Paper,
  Snackbar,
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { AccessTime, Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import { filter, forEach } from 'lodash'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import * as yup from 'yup'
import { format_rupiah, generateSignature, spacing4Char } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [openModalPaymentInfo, setOpenModalPaymentInfo] = useState(false)
  const [data, setData] = useState([])
  const [dataBank, setDataBank] = useState([])
  const [amountDeposit, setAmountDeposit] = useState(0)
  const [isEditableSelect, setIsEditableSelect] = useState(false)
  const [dataPM, setDataPM] = useState({})
  const [inputValuePM, setInputValuePM] = useState()
  const [inputValueWD, setInputValueWD] = useState()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [withdrawMethods, setWithdrawMethods] = useState([])
  const [paymentDetail, setPaymentDetail] = useState({})
  const [paymentDetailInfo, setPaymentDetailInfo] = useState({})
  const [saldo, setSaldo] = useState(0)
  const [errorsField, setErrorsField] = useState({})
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
            label='Dalam Proses'
            color={
              parseInt(params?.row?.accounting_type) === 1 || parseInt(params?.row?.accounting_type) === 2
                ? 'warning'
                : 'secondary'
            }
            onClick={() => {
              ;(parseInt(params?.row?.accounting_type) === 1 || parseInt(params?.row?.accounting_type) === 2) &&
                handleCheckDeposit(
                  params?.row?.amount_credit,
                  params?.row?.invoice_number,
                  filter(paymentMethods, [
                    'payment_method_name',
                    params?.row?.description?.split('(')[1].replace(')', '')
                  ])[0]?.payment_method_code
                )
            }}
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

  let schemaDataWithdraw = yup.object().shape({
    amount: yup.number().min(50000).max(saldo).required(),
    data_bank: yup.object().json().required(),
    bank_account: yup.number().required(),
    bank_account_name: yup.string().required()
  })

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
        const _uri = '/transactions/journal/list_ewallet'
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
          body: JSON.stringify({ start_date: startDate, end_date: endDate })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setSaldo(res?.saldo)
            setData(res?.data)
            setDataBank(res?.data_bank)
            setValueWD({
              amount: valueWD?.amount ?? 0,
              bank_account: res?.data_bank?.bank_account,
              bank_account_name: res?.data_bank?.bank_account_name,
              data_bank: {
                id: 0,
                label: '',
                bank_short_name: res?.data_bank?.bank_short_name,
                bank_name: res?.data_bank?.bank_name
              }
            })

            // console.log('xxx: ', withdrawMethods)
            if (withdrawMethods?.length > 0) {
              // console.log('withdrawMethods: ', withdrawMethods)
              handleChangeEl(
                'amount',
                valueWD?.amount,
                valueWD,
                setValueWD,
                schemaDataWithdraw,
                setErrorsField,
                errorsField
              )
              handleChangeEl(
                'bank_account',
                res?.data_bank?.bank_account,
                valueWD,
                setValueWD,
                schemaDataWithdraw,
                setErrorsField,
                errorsField
              )
              handleChangeEl(
                'bank_account_name',
                res?.data_bank?.bank_account_name,
                valueWD,
                setValueWD,
                schemaDataWithdraw,
                setErrorsField,
                errorsField
              )
              handleChangeEl(
                'data_bank',
                filter(withdrawMethods, {
                  bank_short_name: res?.data_bank?.bank_short_name
                })[0],
                valueWD,
                setValueWD,
                schemaDataWithdraw,
                setErrorsField,
                errorsField
              )
              setValueWD({
                amount: valueWD?.amount,
                bank_account: res?.data_bank?.bank_account,
                bank_account_name: res?.data_bank?.bank_account_name,
                data_bank: filter(withdrawMethods, {
                  bank_short_name: res?.data_bank?.bank_short_name
                })[0]
              })
            }
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

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
        const _uri = '/master/payment_method/lists'
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
            forEach(_dataMain, (item, index) => {
              const ___data = {
                id: item?.id_payment_method,
                label: item?.payment_method_name + ' (Proses ' + item?.settlement_day + ' hari)',
                ...item
              }
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
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    getPaymentMethods()
  }, [])

  useEffect(() => {
    if (withdrawMethods?.length > 0) {
      // console.log('withdrawMethods: ', withdrawMethods)
      // getData(
      //   dayjs().startOf('month').format('YYYY-MM-DD'),
      //   dayjs().endOf('month').format('YYYY-MM-DD'),
      //   withdrawMethods
      // )
    }
  }, [withdrawMethods])

  const handleDeposit = async () => {
    setOpenModalPayment(false)

    // console.log('amountDeposit:', amountDeposit)
    // return false

    if (amountDeposit?.length < 1) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Isikan nominal deposit IDR 10.000'
      })

      return false
    }
    if (!parseInt(amountDeposit) || parseInt(amountDeposit) < 10000) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Isikan nominal deposit IDR 10.000'
      })

      return false
    }
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
        const _uri = '/transactions/journal/deposit_ewallet'
        const _secret = await generateSignature(_uri)

        const _total_amount = parseInt(amountDeposit)

        const _pg_fee_amount = parseFloat(
          filter(paymentMethods, { id_payment_method: valuePM?.id })[0]?.fee_original ?? '0'
        )

        const _pg_fee_percent =
          parseFloat(filter(paymentMethods, { id_payment_method: valuePM?.id })[0]?.fee_original_percent ?? '0') / 100

        const _pg_fee = _total_amount * _pg_fee_percent + _pg_fee_amount
        const _app_fee = 2000
        const _fee = _pg_fee + _app_fee
        const _amount_deposit = _total_amount + _fee

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
            payment_method: valuePM?.payment_method_code,
            payment_method_name: valuePM?.payment_method_name,
            amount: _amount_deposit,
            fee: _fee,
            app_fee: _app_fee,
            pg_fee: _pg_fee
          })
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code == 1 ? 'error' : 'success',
              message: res?.message
            })
            getPaymentMethods()

            // setData(res?.data)
            // setDataBank(res?.data_bank)
            setPaymentDetail(res?.payment)
            setLoading(false)
            setOpenModalPayment(true)
            setDataBank(res?.data_bank)
            setData([...res?.data])
            setValueWD({
              amount: valueWD?.amount ?? 0,
              bank_account: res?.data_bank?.bank_account,
              bank_account_name: res?.data_bank?.bank_account_name,
              data_bank: {
                id: 0,
                label: '',
                bank_short_name: res?.data_bank?.bank_short_name,
                bank_name: res?.data_bank?.bank_name
              }
            })
          })
      })
      .catch(() => setLoading(false))
  }

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
        const _uri = '/transactions/journal/check_deposit_ewallet'
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
            payment_method: _pg_method
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
            setData([...res?.data])
            setValueWD({
              amount: valueWD?.amount ?? 0,
              bank_account: res?.data_bank?.bank_account,
              bank_account_name: res?.data_bank?.bank_account_name,
              data_bank: {
                id: 0,
                label: '',
                bank_short_name: res?.data_bank?.bank_short_name,
                bank_name: res?.data_bank?.bank_name
              }
            })
            setAlertMessage({
              open: true,
              type: res?.code == 1 ? 'error' : 'success',
              message: res?.message
            })
          })
      })
      .catch(() => setLoading(false))
  }

  const handleWithdraw = async () => {
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
        const _uri = '/transactions/journal/withdraw_ewallet'
        const _secret = await generateSignature(_uri)

        const _total_amount = parseInt(valueWD?.amount)

        const _pg_fee = 0
        const _app_fee = 5000
        const _fee = _pg_fee + _app_fee
        const _amount_withdraw = _total_amount - _fee

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
            payment_method: valueWD?.data_bank?.bank_short_name,
            payment_method_name:
              filter(withdrawMethods, ['bank_short_name', valueWD?.data_bank?.bank_short_name])[0]
                ?.payment_method_name ?? valueWD?.data_bank?.bank_short_name,
            amount: _amount_withdraw,
            data_bank: filter(withdrawMethods, ['bank_short_name', valueWD?.data_bank?.bank_short_name])[0],
            bank_account: valueWD?.data_bank?.bank_account ?? dataBank?.bank_account,
            bank_account_name: valueWD?.data_bank?.bank_account_name ?? dataBank?.bank_account_name,
            fee: _fee,
            app_fee: _app_fee,
            pg_fee: _pg_fee
          })
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code == 1 ? 'error' : 'success',
              message: res?.message
            })
            setData([...res?.data])
            getPaymentMethods()
            setOpenModal(false)
            setLoading(false)
          })
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    // console.log('textSelectRef: ', textSelectRef)
    // selectRef?.current
  }, [textSelectRef])

  // useEffect(() => {
  //   console.log('valueWD: ', valueWD)
  // }, [valueWD])

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
          <Link>
            Dompet Digital (<b>IDR {format_rupiah(saldo)}</b>)
          </Link>
        </Typography>
        <Typography variant='body2'>History Dompet Digital</Typography>
      </Grid>

      <Grid item xs={12} flex={1} justifyContent={'space-between'} sx={{ display: 'flex' }}>
        <Grid container spacing={6} flex={1} justifyContent={'space-between'} sx={{ display: 'flex' }}>
          <Grid item xs={12} md={5}>
            <div style={{ width: '100%', display: 'inline-block' }}>
              <div>
                <Paper sx={{ padding: '20px', paddingTop: '5px', paddingBottom: '30px' }}>
                  <h5>Deposit Uang ke Dompet Digital Kamu.</h5>
                  <Typography sx={{ fontSize: '12px' }}>Minimal deposit IDR 50.000.</Typography>
                  <Typography sx={{ fontSize: '10px' }}>Biaya admin penarikan bersifat variatif.</Typography>
                  <Typography sx={{ fontSize: '10px' }}>Uang yang anda terima akan dikurangi biaya admin.</Typography>
                  <br />
                  <NumericFormat
                    value={amountDeposit}
                    customInput={TextField}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
                    }}
                    label='*Deposit belum termasuk biaya'
                    placeholder='Min. 10.000'
                    variant='outlined'
                    size='small'
                    fullWidth
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    onFocus={e => e?.target?.select()}
                    onBlur={e => {
                      e && e?.target?.value && e?.target?.value.toString() !== ''
                        ? setAmountDeposit(parseInt(e?.target?.value.toString()?.replace(/\./g, '').replace(/\,/g, '')))
                        : setAmountDeposit(0)
                    }}
                    onValueChange={values => {
                      if (parseInt(values?.value) < 10000) {
                        setErrorsField({ ...errorsField, amountTP: 'Min. 10.000' })
                      } else if (parseInt(values?.value) > 100000000) {
                        setErrorsField({ ...errorsField, amountTP: 'Max. 100.000.000' })
                      } else if (!values?.value) {
                        setErrorsField({ ...errorsField, amountTP: 'Min. 10.000' })
                      } else {
                        setErrorsField({ ...errorsField, amountTP: false })
                        setAmountDeposit(parseInt(values?.value.toString()?.replace(/\./g, '').replace(/\,/g, '')))
                      }
                    }}
                    error={errorsField?.amountTP}
                    helperText={errorsField?.amountTP}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Autocomplete
                      value={valuePM}
                      onChange={(event, newValuePM) => {
                        setValuePM(newValuePM)
                      }}
                      inputValue={inputValuePM}
                      onInputChange={(event, newInputValuePM) => {
                        setInputValuePM(newInputValuePM)
                      }}
                      id='combo-box-demo'
                      size='small'
                      options={paymentMethods}
                      renderInput={params => <TextField size='small' {...params} label='Metode Pembayaran' />}
                    />
                  </Box>
                  <br />
                  <br />
                  <br />
                  <Button
                    variant='contained'
                    onClick={() => handleDeposit(true)}
                    style={{ marginTop: '-30px', float: 'right' }}
                    disabled={
                      amountDeposit?.length < 1 || parseInt(amountDeposit) < 10000 || !valuePM?.payment_method_code
                    }
                  >
                    Deposit Uang
                  </Button>
                </Paper>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={5}>
            <div style={{ width: '100%', display: 'inline-block' }}>
              <div>
                <Paper sx={{ padding: '20px', paddingTop: '5px', paddingBottom: '30px' }}>
                  <h5>Penarikan Uang ke Rekening Pribadi Kamu.</h5>
                  <Typography sx={{ fontSize: '12px' }}>
                    <b>Saldo Dompet Digital : IDR {format_rupiah(saldo)}</b>
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>Minimal penarikan IDR 50.000.</Typography>
                  <Typography sx={{ fontSize: '12px' }}>Maximal penarikan IDR 100.000.000.</Typography>
                  <Typography sx={{ fontSize: '10px' }}>Biaya admin penarikan IDR 5.000.</Typography>
                  <Typography sx={{ fontSize: '10px' }}>Uang yang anda terima akan dikurangi biaya admin.</Typography>
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
                    value={valueWD?.amount}
                    onValueChange={e => {
                      handleChangeEl(
                        'amount',
                        e,
                        valueWD,
                        setValueWD,
                        schemaDataWithdraw,
                        setErrorsField,
                        errorsField,
                        'int'
                      )
                    }}
                    onFocus={e => e.target.select()}
                    error={errorsField?.amount}
                    helperText={errorsField?.amount}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Autocomplete
                      value={valuePM?.data_bank}
                      onChange={(event, newValueWD) => {
                        // console.log('event: ', event)
                        // console.log('event?._reactName: ', event?._reactName)

                        if (event?._reactName === 'onClick' && event?.detail === 1) {
                          handleChangeEl(
                            'data_bank',
                            newValueWD,
                            valueWD,
                            setValueWD,
                            schemaDataWithdraw,
                            setErrorsField,
                            errorsField
                          )
                        }
                      }}
                      ref={selectRef}
                      onBlur={e => setIsEditableSelect(false)}
                      inputValue={inputValueWD}
                      onInputChange={(event, newInputValueWD) => {
                        setInputValueWD(newInputValueWD)
                      }}
                      sx={{ display: isEditableSelect ? 'block' : 'none' }}
                      id='combo-box-demo'
                      size='small'
                      autoSelect={true}
                      options={filter(withdrawMethods, ['can_withdraw', '1'])}
                      renderInput={params => (
                        <TextField
                          size='small'
                          {...params}
                          inputRef={textSelectRef}
                          label='Metode Penarikan Uang'
                          error={errorsField?.data_bank}
                          helperText={errorsField?.data_bank}
                        />
                      )}
                    />
                    <TextField
                      fullWidth
                      size='small'
                      value={valueWD?.data_bank?.bank_short_name}
                      label='Metode Penarikan Uang'
                      error={errorsField?.data_bank}
                      helperText={errorsField?.data_bank}
                      sx={{ display: isEditableSelect ? 'none' : 'block' }}
                      onFocus={e => {
                        const dataBank = e.target.value
                        setIsEditableSelect(true)

                        setTimeout(() => {
                          textSelectRef.current.focus()
                          setTimeout(() => {
                            // setInputValueWD(dataBank)
                            // textSelectRef.current.value = dataBank
                            textSelectRef.current?.nextSibling?.children[1]?.click() ??
                              textSelectRef.current?.nextSibling?.children[0]?.click()
                            setTimeout(() => {
                              textSelectRef.current.value = dataBank

                              // setTimeout(() => {
                              //   textSelectRef.current?.nextSibling?.children[0]?.click()
                              // }, 150)

                              // textSelectRef.current?.nextSibling?.children[0]?.click()
                              // setInputValueWD(dataBank)
                              // textSelectRef.current.value = dataBank
                              // setTimeout(() => textSelectRef.current.select(), 100)
                            }, 100)
                          }, 100)
                        }, 100)
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      type='number'
                      size='small'
                      label='Nomor Rekening/E-Wallet'
                      value={valueWD?.bank_account}
                      onChange={e =>
                        handleChangeEl(
                          'bank_account',
                          e,
                          valueWD,
                          setValueWD,
                          schemaDataWithdraw,
                          setErrorsField,
                          errorsField
                        )
                      }
                      error={errorsField?.bank_account}
                      helperText={errorsField?.bank_account}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      size='small'
                      label='Nama Rekening/E-Wallet'
                      value={valueWD?.bank_account_name}
                      onChange={e =>
                        handleChangeEl(
                          'bank_account_name',
                          e,
                          valueWD,
                          setValueWD,
                          schemaDataWithdraw,
                          setErrorsField,
                          errorsField
                        )
                      }
                      error={errorsField?.bank_account_name}
                      helperText={errorsField?.bank_account_name}
                    />
                  </Box>
                  <br />
                  <br />
                  <br />
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => setOpenModal(true)}
                    style={{ marginTop: '-30px', float: 'right' }}
                    disabled={
                      parseInt(saldo) < 50000 || Object.keys(errorsField)?.length > 0 || valueWD?.amount < 50000
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
                          filter(data, ['status', '2'])
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_credit), 0)
                            ?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Debet : IDR{' '}
                        {format_rupiah(
                          filter(data, ['status', '2'])
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.amount_debet), 0)
                            ?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Total : IDR{' '}
                        {format_rupiah(
                          filter(data, ['status', '2'])?.reduce(
                            (total1, item) => parseInt(total1) + parseInt(item?.amount_credit),
                            0
                          ) -
                            filter(data, ['status', '2'])?.reduce(
                              (total2, item) => parseInt(total2) + parseInt(item?.amount_debet),
                              0
                            )
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

      <ModalDialog
        titleModal='Konfirmasi Penarikan Dana'
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={handleWithdraw}
      >
        <Box style={{ width: 550 }}>
          Apakah anda yakin ingin melakukan penarikan dana sebesar <br />
          <b>Permintaan : IDR {format_rupiah(valueWD?.amount)} ?</b>
          <Typography>
            <b>Biaya : IDR {format_rupiah(5000)}</b>
          </Typography>
          <Typography sx={{ fontSize: 24 }}>
            <b>Diterima : IDR {format_rupiah(valueWD?.amount - 5000)}</b>
          </Typography>
        </Box>
      </ModalDialog>

      <ModalDialog titleModal='Detail Pembayaran' openModal={openModalPayment} setOpenModal={setOpenModalPayment}>
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
                    <h3>IDR {format_rupiah(paymentDetail?.res?.data?.total_bayar)}</h3>
                  </Typography>
                </Box>
                <Box>
                  <Typography>Berlaku dalam 10 Menit</Typography>
                </Box>
                <Box>
                  <Typography>
                    Metode Pembayaran :{' '}
                    <b>{filter(paymentMethods, ['id_payment_method', valuePM?.id])[0]?.payment_method_name}</b>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
                  {parseInt(valuePM?.id) == 18 || parseInt(valuePM?.id) == 19 ? (
                    <>
                      <img src={`${process.env.NEXT_PUBLIC_API}/${paymentDetail?.image_src}`} />
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
                      <img src={`${process.env.NEXT_PUBLIC_API}/${paymentDetail?.image_src}`} />
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

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </Grid>
  )
}

export default MUITable
