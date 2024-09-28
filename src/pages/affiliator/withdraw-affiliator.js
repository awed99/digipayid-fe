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
import { styled } from '@mui/material/styles'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import { filter, forEach } from 'lodash'
import moment from 'moment'
import { MuiOtp } from 'mui-otp-input-field'
import { NumericFormat } from 'react-number-format'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import * as yup from 'yup'
import { format_rupiah, generateSignature, spacing4Char } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const MUITable = () => {
  // ** States
  const [countDown, setCountDown] = useState(0)
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [openModalPaymentInfo, setOpenModalPaymentInfo] = useState(false)
  const [data, setData] = useState([])
  const [dataBank, setDataBank] = useState([])
  // const [amountDeposit, setAmountDeposit] = useState(0)
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
  const [openModalOTP, setOpenModalOTP] = useState(false)
  const [oTPWA, setOTPWA] = useState('')

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
        const _uri = '/affiliator/transactions/journal/list_ewallet'
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
        const _uri = '/affiliator/transactions/journal/withdraw_ewallet'
        const _secret = await generateSignature(_uri)

        const _total_amount = parseInt(valueWD?.amount)

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
            amount: _total_amount,
            data_bank: filter(withdrawMethods, ['bank_short_name', valueWD?.data_bank?.bank_short_name])[0],
            bank_account: valueWD?.data_bank?.bank_account ?? dataBank?.bank_account,
            bank_account_name: valueWD?.data_bank?.bank_account_name ?? dataBank?.bank_account_name
            // fee: _fee,
            // app_fee: _app_fee,
            // pg_fee: _pg_fee
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

  const handleBeforeSubmit = async () => {
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
        const _uri = '/affiliator/transactions/journal/getOTP'

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
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem('data-module'))?.email,
            amount: parseInt(valueWD?.amount)
          })
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            if (res?.code !== 0) {
              setLoading(false)
              setOpenModalOTP(false)
              setOpenModal(false)
              return false
            }

            setLoading(false)
            setOpenModal(false)
            setOpenModalOTP(true)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const _handleCheckValidOTP = async _type => {
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
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/affiliator/transactions/journal/check_valid_otp'

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
          body: JSON.stringify({ otp_wa: oTPWA })
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message ?? 'Invalid OTP'
            })

            console.log(res)

            if (res?.code === 0) {
              handleWithdraw(true)
            }

            setLoading(false)
            setOpenModalOTP(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const _handleResendOTP = async _type => {
    setCountDown(60)
    setLoading(true)
    let _values = {}
    if (_type == 'otp_email') {
      _values = {
        type: 'otp_email',
        email: JSON.parse(localStorage.getItem('data-module'))?.email
      }
    } else if (_type == 'otp_wa') {
      _values = {
        type: 'otp_wa',

        // merchant_wa: data?.merchant_wa,
        email: JSON.parse(localStorage.getItem('data-module'))?.email
      }
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
        const _uri = '/affiliator/transactions/journal/resend_otp'

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
          body: JSON.stringify(_values)
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            setLoading(false)
          })
          .catch(() => setLoading(false))
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
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

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
          <Grid item xs={12} md={5}></Grid>

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
        handleSubmitFunction={async () => handleBeforeSubmit()}
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

      <ModalDialog
        titleModal='Konfirmasi OTP Withdraw'
        openModal={openModalOTP}
        setOpenModal={setOpenModalOTP}
        handleSubmitFunction={_handleCheckValidOTP}
      >
        <Typography>
          Kode OTP Login anda sudah dikirim
          <br />
          ke Email & WhatsApp anda {data?.merchant_wa}.
        </Typography>
        <Typography>Silakan masukkan kode OTP.</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp autoComplete length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
        </Box>

        <Box>
          <Typography variant='body2'>
            {countDown == 0 ? (
              <>
                <LinkStyled onClick={e => _handleResendOTP('otp_wa')}>Kirim Ulang Kode OTP Melalui WhatsApp</LinkStyled>
                <br />
                <br />
                <LinkStyled onClick={e => _handleResendOTP('otp_email')}>Kirim Ulang Kode OTP Melalui Email</LinkStyled>
              </>
            ) : (
              <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                Kirim Ulang Kode OTP dalam ({countDown})
              </LinkStyled>
            )}
          </Typography>
        </Box>
      </ModalDialog>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </Grid>
  )
}
export default MUITable
