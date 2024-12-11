import { HighlightOff } from '@mui/icons-material'

// ** MUI Imports
import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField
} from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { Close, Delete, PhotoCamera } from '@mui/icons-material'

// ** React Imports
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

import * as yup from 'yup'

import CryptoJS from 'crypto-js'
import { filter, includes, map, pull, size } from 'lodash'
import ModalImage from 'react-modal-image'
import ModalDialog from 'src/components/dialog'
import store from 'store'
import { format_rupiah, generateSignature, spacing4Char } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'
import TablePagination from '/src/components/table-pagination'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [amountToPay, setAmountToPay] = useState(0)

  // ** States
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [openModal3, setOpenModal3] = useState(false)
  const [openModal4, setOpenModal4] = useState(false)
  const [openModalWarning, setOpenModalWarning] = useState(false)
  const [openModalResendBilling, setOpenModalResendBilling] = useState(false)
  const [openModalSuccessPayment, setOpenModalSuccessPayment] = useState(false)
  const [openModalSuccessConfirmation, setOpenModalSuccessConfirmation] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const [countDownSearchProduct, setCountDownSearchProduct] = useState(4)
  const [titleModal, setTitleModal] = useState('Ambil produk dari katalog')
  const [titleModal2, setTitleModal2] = useState('Tambahkan produk baru secara manual')
  const [titleModal3, setTitleModal3] = useState('Detail Pembayaran')
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [rowSelectionQty, setRowSelectionQty] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [paymentMethodsFiltered, setPaymentMethodsFiltered] = useState([])
  const [paymentDetail, setPaymentDetail] = useState([])
  const [reffID, setReffID] = useState(null)
  const [loopCheckStatus, setLoopCheckStatus] = useState(0)

  // const [valueModal, setValueModal] = useState({ id_product_category: null, product_category: '' })
  const [saldo, setSaldo] = useState(0)
  const [taxPercentage, setTaxPercentage] = useState(0)
  const [discountAllProducts, setDiscountAllProducts] = useState(0)
  const [data, setData] = useState([])
  const [dataFinal, setDataFinal] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [pageDataSearch, setPageDataSearch] = useState(1)
  const [perPageDataSearch, setPerPageDataSearch] = useState(5)
  const [totalDataSearch, setTotalDataSearch] = useState(0)
  const [dataSearchMaster, setDataSearchMaster] = useState([])
  const [productCategories, setProductCategories] = useState([])
  const [searchCategory, setSearchCategory] = useState([])
  const [selectedFile, setSelectedFile] = useState()
  const [uniqueCode, setUniqueCode] = useState(Math.floor(Math.random() * 900) + 100)

  const [isFree, setIsFree] = useState(false)

  // ** Hooks
  const router = useRouter()

  const [valueModalProduct, setValueModalProduct] = useState({
    product_code: '',
    product_name: '',
    product_qty: 0,
    product_price: 0
  })

  const [valueModalTransaction, setValueModalTransaction] = useState({
    email_customer: '',
    wa_customer: '',
    payment_method_code: '',
    id_payment_method: '38',
    amount_to_pay: 0,
    fee: 0
  })

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'success',
    message: ''
  })

  let schemaDataProduct = yup.object().shape({
    product_code: yup.string(),
    product_name: yup.string().required(),
    product_qty: yup.number().min(1).required(),
    product_price: yup.number().min(100).required()
  })

  // Styled component for the trophy image
  const TrophyImg = styled('img')({
    // right: 36,
    // top: 70,
    // position: 'absolute'
  })

  const useFakeMutation = () => {
    return useCallback(
      row =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (row.product_qty?.toString().trim() === '' || row.product_price?.toString().trim() === '') {
              reject()
            } else {
              resolve(row)
            }
          }, 200)
        }),
      []
    )
  }

  function computeMutation(newRow, oldRow) {
    if (newRow.product_qty !== oldRow.product_qty) {
      return `Jumlah '${oldRow.product_qty}' menjadi '${newRow.product_qty}'`
    }
    if (newRow.product_price !== oldRow.product_price) {
      return `Harga '${oldRow.product_price || ''}' Menjadi '${newRow.product_price || ''}'`
    }

    return null
  }

  const mutateRow = useFakeMutation()
  const noButtonRef = useRef(null)
  const [promiseArguments, setPromiseArguments] = useState(null)

  const [snackbar, setSnackbar] = useState(null)

  const handleCloseSnackbar = () => setSnackbar(null)

  const getData = async () => {
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
        const _uri = '/transactions/orders/get_temp_products'
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
          body: JSON.stringify({ nama: router?.query?.nama })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setIsFree(res?.is_free ?? false)
            setData(res?.data)
            setSaldo(res?.saldo)
            setTaxPercentage(parseInt(res?.tax_percentage))
            setDiscountAllProducts(parseInt(res?.discount_all_products))
            if (res?.saldo < 10000) {
              setOpenModalWarning(true)
            }
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    if (!router?.query?.nama) {
      router.push('/pembayaran')
    }

    // setLoading(true)
    getPaymentMethods()
    setSearchCategory([])

    // function handleResize() {
    //   setWidthScreen(window.innerWidth)
    // }
    // window.addEventListener('resize', handleResize)
    // handleResize()

    // return () => {
    //   // window.removeEventListener('resize', handleResize)
    //   setIsWaitingForPayment(false)
    // }
  }, [])

  let _loopNumber = 1

  const columns = [
    // { field: 'product_code', headerName: 'Kode', width: 100 },
    { field: 'product_name', headerName: 'Nama Produk', width: 350 },
    { field: 'product_desc', headerName: 'Ket. Produk', width: 250 },
    { field: 'product_custom_request', headerName: 'Custom Request', width: 250 },

    // { field: 'product_image_url', headerName: 'Image', width: 150 },
    {
      field: 'product_qty',
      headerName: 'Jml',
      width: 100,
      type: 'number',
      editable: true
    },
    {
      field: 'product_price',
      headerName: 'Harga',
      width: 110,
      type: 'number',
      editable: true,
      renderCell: params => format_rupiah(params?.value?.toString())
    },
    {
      field: 'total_price',
      headerName: 'Total Harga',
      width: 120,
      renderCell: params => format_rupiah((params?.row?.product_qty * params?.row?.product_price)?.toString())
    },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 120,
      renderCell: params => <img src={process.env.NEXT_PUBLIC_API + params?.value} width={100} />
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: params => (
        <IconButton aria-label='delete' onClick={() => handleClickDelete(params)}>
          <Delete color='error' />
        </IconButton>
      )
    }
  ]

  const columnsSearch = [
    { field: 'product_code', headerName: 'Kode', width: 70 },
    { field: 'product_name', headerName: 'Nama Produk', width: 160 },
    { field: 'product_qty', headerName: 'Stok', width: 100 },

    // { field: 'product_image_url', headerName: 'Image', width: 150 },
    {
      field: 'product_price',
      headerName: 'Harga',
      width: 120,
      renderCell: params => format_rupiah(params?.value)
    },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 120,
      renderCell: params => <img src={process.env.NEXT_PUBLIC_API + params?.value} width={100} />
    }
  ]

  const handleClickButton = async () => {
    // if (_isAdd === true) {
    //   setIsAdd(true)
    //   handleChangeEl('product_category', '', valueModal, setValueModal, schemaData, setErrorsField)
    //   handleChangeEl('id_product_category', null, valueModal, setValueModal, schemaData, setErrorsField)
    // }
    setSearchProduct('')
    setTitleModal('Ambil produk dari katalog')
    setOpenModal(true)
    searchProducts()
  }

  const handleClickButtonNew = async () => {
    setTitleModal2('Tambahkan produk baru secara manual')
    setSelectedFile(null)
    setValueModalProduct({
      id_product: null,
      product_code: '',
      product_name: '',
      product_qty: 0,
      product_price: 0,
      product_status: '1'
    })
    setOpenModal2(true)
  }

  const handleClickDelete = async (_params = {}) => {
    const _row = _params?.row ?? _params
    setIsAdd(false)
    const _x = confirm('Anda yakin ingin membatalkan produk ' + _row?.product_name + ' ?')
    if (_x) {
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
          const _uri = '/transactions/orders/delete_temp_products'
          const _secret = await generateSignature(_uri)

          fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
            method: 'POST',
            headers: {
              'X-Signature': _secret?.signature,
              'X-Timestamp': _secret?.timestamp,
              Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
                ?.toString(CryptoJS.enc.Utf8)
                .replace(/\"/g, '')
            },
            body: JSON.stringify({ id: _row?.id, nama: router?.query?.nama })
          })
            .then(res => res.json())
            .then(res => {
              // console.log(res?.data)
              setData(res?.data).catch(() => false)
            })
            .catch(() => false)
        })
    }
  }

  const handleCreateTransaction = async () => {
    // console.log(valueModalTransaction)

    // return false

    if (
      parseInt(valueModalTransaction?.id_payment_method) !== 40 &&
      parseInt(valueModalTransaction?.id_payment_method) !== 46 &&
      valueModalTransaction?.wa_customer?.length < 10 &&
      valueModalTransaction?.email_customer?.length < 10
    ) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Pembayaran Digital wajib mencantumkan Whatsapp / Email pelanggan!'
      })

      return false
    }

    const _tax =
      (dataFinal?.reduce(
        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
        0
      ) *
        taxPercentage) /
      100

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
        const _uri = reffID ? '/transactions/orders/update' : '/transactions/orders/create'
        const _secret = await generateSignature(_uri)

        const _total_amount = dataFinal?.reduce(
          (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
          0
        )

        const _pg_fee_amount = parseInt(
          filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method?.toString() })[0]
            ?.fee_original ?? '0'
        )

        const _pg_fee_percent = parseFloat(
          filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method?.toString() })[0]
            ?.fee_original_percent ?? '0'
        )

        const _app_fee_amount = isFree
          ? 0
          : parseInt(
              filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method?.toString() })[0]
                ?.fee_app ?? '500'
            )

        const _app_fee_percent = isFree
          ? 0
          : parseFloat(
              filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method?.toString() })[0]
                ?.fee_app_percent ?? '0'
            )

        // const _tax_amount = (_total_amount * taxPercentage) / 100
        // const _fee_percent = _pg_fee_percent + _app_fee_percent
        // const _fee_percent_0 = 100 - _fee_percent
        // const _amount0 = _total_amount + _pg_fee_amount + _app_fee_amount + _tax_amount
        // let _final_amount = Math.round(((_amount0 * 100) / _fee_percent_0).toFixed(2))

        // const _pg_fee = Math.round(((_final_amount * _pg_fee_percent) / 100).toFixed(2)) + _pg_fee_amount
        // const _app_fee = Math.round(((_final_amount * _app_fee_percent) / 100).toFixed(2)) + _app_fee_amount

        // // console.log('_app_fee: ', _app_fee)
        // // console.log('_pg_fee: ', _pg_fee)
        // // console.log('_total_amount: ', _total_amount)
        // // console.log('_pg_fee_percent: ', _pg_fee_percent)
        // // console.log('_pg_fee_amount: ', _pg_fee_amount)
        // // console.log('_app_fee_percent: ', _app_fee_percent)
        // // console.log('_app_fee_amount: ', _app_fee_amount)
        // // console.log('_fee_percent: ', _fee_percent)
        // // console.log('_fee_percent_0: ', _fee_percent_0)
        // // console.log('_amount0: ', _amount0)
        // // console.log('_final_amount: ', _final_amount)
        // // setLoading(false)

        // // return false

        // let _fee = 0
        // if (
        //   filter(paymentMethods, {
        //     id_payment_method: valueModalTransaction?.id_payment_method?.toString()
        //   })[0]?.payment_method_code === 'QRIS_PAYLATER'
        // ) {
        //   _fee = _pg_fee + _app_fee + uniqueCode
        // } else {
        //   _fee = _pg_fee + _app_fee
        // }

        const _tax_amount = (_total_amount * taxPercentage) / 100
        const _disc = _total_amount - (_total_amount * discountAllProducts) / 100
        const _discount_all_products = discountAllProducts > 0 ? _disc : 0
        const _fee_percent = _pg_fee_percent + _app_fee_percent
        const _fee_percent_0 = 100 - _fee_percent
        const _amount0 = _total_amount + _pg_fee_amount + _app_fee_amount + _tax_amount - _discount_all_products
        let _final_amount = Math.round(((_amount0 * 100) / _fee_percent_0).toFixed(2))

        const _pg_fee = Math.round(((_final_amount * _pg_fee_percent) / 100).toFixed(2)) + _pg_fee_amount
        const _app_fee = Math.round(((_final_amount * _app_fee_percent) / 100).toFixed(2)) + _app_fee_amount

        const _fee_on_merchant =
          parseInt(
            filter(paymentMethods, {
              id_payment_method: valueModalTransaction?.id_payment_method?.toString()
            })[0]?.fee_on_merchant
          ) ?? 1

        const isQrisPaylater =
          filter(paymentMethods, {
            id_payment_method: valueModalTransaction?.id_payment_method?.toString()
          })[0]?.payment_method_code === 'QRIS_PAYLATER'

        const isCash =
          filter(paymentMethods, {
            id_payment_method: valueModalTransaction?.id_payment_method?.toString()
          })[0]?.payment_method_code === 'CASH'

        const _uniqueCode = isQrisPaylater ? uniqueCode : 0
        const _fee = _pg_fee + _app_fee + _uniqueCode
        const __final_amount = _total_amount + _fee + _tax_amount - _discount_all_products

        // console.log(
        //   'payment_method_code: ',
        //   filter(paymentMethods, {
        //     id_payment_method: valueModalTransaction?.id_payment_method?.toString()
        //   })[0]?.payment_method_code
        // )

        // console.log('_total_amount: ', _total_amount)
        // console.log('_pg_fee: ', _pg_fee)
        // console.log('_app_fee: ', _app_fee)
        // console.log('_fee: ', _fee)
        // console.log('_uniqueCode: ', _uniqueCode)
        // console.log('_tax_amount: ', _tax_amount)
        // console.log('valueModalTransaction: ', valueModalTransaction)

        // console.log({
        //   email_customer: valueModalTransaction?.email_customer,
        //   wa_customer: valueModalTransaction?.wa_customer,
        //   total_product: dataFinal?.length,
        //   amount: _fee_on_merchant === 0 ? __final_amount : _total_amount + _tax_amount,
        //   tax_percentage: taxPercentage,
        //   amount_tax: _tax_amount,
        //   amount_to_pay: !isCash
        //     ? _fee_on_merchant === 0
        //       ? __final_amount
        //       : _total_amount + _tax_amount
        //     : parseInt(valueModalTransaction?.amount_to_pay?.toString().replace(/\./g, '')),
        //   pg_fee: _pg_fee,
        //   app_fee: _app_fee,
        //   fee: _fee,
        //   id_payment_method: parseInt(valueModalTransaction?.id_payment_method),
        //   payment_method_code: filter(paymentMethods, {
        //     id_payment_method: valueModalTransaction?.id_payment_method?.toString()
        //   })[0]?.payment_method_code,
        //   payment_method_name: filter(paymentMethods, {
        //     id_payment_method: valueModalTransaction?.id_payment_method?.toString()
        //   })[0]?.payment_method_name,
        //   fee_on_merchant: _fee_on_merchant,
        //   invoice_number: reffID
        // })

        // setLoading(false)

        // return false

        if (isCash)
          if (
            parseInt(valueModalTransaction?.amount_to_pay?.toString().replace(/\./g, '')) < __final_amount ||
            valueModalTransaction?.amount_to_pay === null ||
            valueModalTransaction?.amount_to_pay === ''

            // || isCash ||
            // parseInt(valueModalTransaction?.amount_to_pay?.toString().replace(/\./g, '')) <
            //   parseInt(
            //     dataFinal?.reduce(
            //       (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
            //       0
            //     ) +
            //       parseInt(valueModalTransaction?.fee) +
            //       (dataFinal?.reduce(
            //         (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
            //         0
            //       ) *
            //         taxPercentage) /
            //         100
            //   )
          ) {
            alert('Uang pembayaran masih kurang!')

            setLoading(false)
            setOpenModalSuccessConfirmation(false)

            return false
          }

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
            nama: router?.query?.nama,
            email_customer: valueModalTransaction?.email_customer,
            wa_customer: valueModalTransaction?.wa_customer,
            total_product: dataFinal?.length,
            tax_percentage: taxPercentage,
            discount: discountAllProducts,
            discount_amount: _discount_all_products,
            amount: _fee_on_merchant === 0 ? __final_amount : _total_amount + _tax_amount,
            amount_tax: _tax_amount,
            amount_to_pay: !isCash
              ? _fee_on_merchant === 0
                ? __final_amount
                : _total_amount + _tax_amount
              : parseInt(valueModalTransaction?.amount_to_pay?.toString().replace(/\./g, '')),

            pg_fee: _pg_fee,
            app_fee: _app_fee + _uniqueCode,
            fee: _fee,
            id_payment_method: parseInt(valueModalTransaction?.id_payment_method),
            payment_method_code: filter(paymentMethods, {
              id_payment_method: valueModalTransaction?.id_payment_method?.toString()
            })[0]?.payment_method_code,
            payment_method_name: filter(paymentMethods, {
              id_payment_method: valueModalTransaction?.id_payment_method?.toString()
            })[0]?.payment_method_name,
            fee_on_merchant: _fee_on_merchant,
            invoice_number: reffID
          })

          // body: dataX
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            // getData()

            // console.log(valueModalTransaction)

            // return

            setUniqueCode(Math.floor(Math.random() * 900) + 100)

            if (res?.error !== '') {
              setAlertMessage({
                type: 'error',
                open: true,
                message: res?.error
              })
              setLoading(false)

              return false
            }

            setIsWaitingForPayment(true)
            setData([])

            // getData()

            if (res?.code === 1) {
              setPaymentDetail(res?.payment)
              setOpenModal4(true)
              setIsWaitingForPayment(true)
              if (res?.reff_id) {
                setReffID(res?.reff_id)
              }
            } else {
              setReffID(res?.reff_id)
              setOpenModal4(true)
              setIsWaitingForPayment(true)
              setAmountToPay(_fee_on_merchant === 0 ? _total_amount + _pg_fee + _app_fee : _total_amount)
            }

            // setReffID(null)
            // setData(res?.data)
            // getPaymentMethods()
            setOpenModal3(false)
            setOpenModalSuccessConfirmation(false)

            // Finish And Go To New Payment
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    return () => {
      setLoopCheckStatus(-1)
      setIsWaitingForPayment(false)
    }
  }, [])

  useEffect(() => {
    // console.log('isWaitingForPayment', isWaitingForPayment)
    // console.log('reffID', reffID)
    // console.log('loopCheckStatus', loopCheckStatus)

    if (isWaitingForPayment === true && reffID && loopCheckStatus === 0) {
      setTimeout(() => setLoopCheckStatus(1), 1000)
    }
    if (isWaitingForPayment === true && reffID && loopCheckStatus > 0) {
      setTimeout(() => handleCheckStatus(reffID), 5000)
    }
  }, [isWaitingForPayment, reffID, loopCheckStatus])

  const handleCheckStatus = async (_reffID, _loop = 0) => {
    const _isWaitingForPayment = isWaitingForPayment
    const _paymentDetail = paymentDetail

    // console.log('_paymentDetail: ', _paymentDetail)
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

          body: JSON.stringify({
            invoice_number: _reffID,
            amount: _paymentDetail?.req?.amount,
            payment_method_code: _paymentDetail?.res?.data?.payment_method_code
          })

          // body: dataX
        })
          .then(res => res.json())
          .then(res => {
            if (parseInt(res?.status) > 0) {
              setAlertMessage({
                open: true,
                type: 'success',
                message: 'Pembayaran Berhasil.'
              })
              setOpenModal4(false)
              setOpenModalSuccessPayment(true)
              setIsWaitingForPayment(false)
              setReffID(null)
              setTimeout(() => router.push('/pembayaran'), 5000)
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

            // setLoading(false)
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
            nama: router?.query?.nama,
            email_customer:
              size(_valueModalTransaction?.email_customer) < 5 ? undefined : _valueModalTransaction?.email_customer,
            wa_customer: size(_valueModalTransaction?.wa_customer) < 5 ? undefined : _valueModalTransaction?.wa_customer
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
            setOpenModalResendBilling(false)
            setLoading(false)

            // setValueModalTransaction({
            //   email_customer: '',
            //   wa_customer: ''
            // })
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleCreateTempProducts = async (isDelete = false) => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    if ((await schemaDataProduct.isValid(valueModalProduct)) === false) {
      // alert('Mohon lengkapi semua data.')
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Mohon lengkapi semua data.'
      })

      return false
    }
    if (!selectedFile) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Foto produk wajib ada!'
      })

      return false
    }

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
        const _uri = '/transactions/orders/create_temp_products'
        const _secret = await generateSignature(_uri)

        delete valueModalProduct?.selectedFile
        const dataX = new FormData()
        Object.keys(valueModalProduct).forEach(item => {
          dataX.append(item, valueModalProduct[item])
        })
        dataX.append('userfile', selectedFile, selectedFile.name)
        dataX.append('nama', router?.query?.nama)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },

          // body: JSON.stringify(valueModalProduct)
          body: dataX
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setOpenModal2(false)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const handleUpdateTempProducts = async _data => {
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
        const _uri = '/transactions/orders/update_temp_products'
        const _secret = await generateSignature(_uri)

        const dataX = new FormData()
        dataX.append('id', _data?.id)
        dataX.append('product_qty', _data?.product_qty)
        dataX.append('product_price', _data?.product_price)
        dataX.append('nama', router?.query?.nama)
        dataX.append('email', store.get('data-module')?.email)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },

          // body: JSON.stringify({ id: _data?.id, product_qty: _data?.product_qty, product_price: _data?.product_price })
          body: dataX
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setOpenModal2(false)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const handleSubmit = async () => {
    if (rowSelectionModel?.length > 0) {
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
          const _uri = '/transactions/orders/create_temp_products2'
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

            body: JSON.stringify({ id_product: rowSelectionModel, nama: router?.query?.nama, qty: rowSelectionQty })
          })
            .then(res => res.json())
            .then(res => {
              // console.log(res?.data)
              setData(res?.data)
              setOpenModal(false)
              setRowSelectionModel([])
            })
            .catch(() => false)
        })
        .catch(() => false)
    }
  }

  useEffect(() => {
    handleSearchProduct()
  }, [searchCategory])

  useEffect(() => {
    // if (size(searchProduct) < 1) {
    handleSearchProduct()

    // }
  }, [searchProduct])

  const handleSearchProduct = e => {
    if (size(dataSearchMaster) > 0) {
      // setLoading(true)
      setTimeout(() => {
        let _newData = dataSearchMaster
        if (size(searchProduct) > 0) {
          _newData = dataSearchMaster?.filter(item => {
            if (
              item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
              item?.product_desc?.toLowerCase().includes(searchProduct?.toLowerCase())
            ) {
              if (size(searchCategory) > 0) {
                return map(searchCategory, item2 => {
                  if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
                    return item
                  }
                })
              } else {
                return item
              }
            }
          })
        }

        const _newData2 = []
        map(_newData, item => {
          if (size(searchCategory) > 0) {
            map(searchCategory, item2 => {
              if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
                _newData2.push(item)
              }
            })
          } else {
            _newData2.push(item)
          }
        })

        // console.log('_newData2', _newData2)

        setTotalDataSearch(_newData2?.length)

        // const _dataSearch = _newData2?.slice(0 * perPageDataSearch, 0 * perPageDataSearch + perPageDataSearch)
        // setDataSearch([..._dataSearch])
        setDataSearch([..._newData2])

        // setDataSearch([..._newData2])
        setPageDataSearch(1)

        // setLoading(false)
      }, 1)
    }
  }

  // useEffect(() => {
  //   if (size(dataSearchMaster) > 0) {
  //     setLoading(true)
  //     setTimeout(() => {
  //       let _newData = dataSearchMaster
  //       if (size(searchProduct) > 0) {
  //         _newData = dataSearchMaster?.filter(item => {
  //           if (
  //             item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
  //             item?.product_desc?.toLowerCase().includes(searchProduct?.toLowerCase())
  //           ) {
  //             if (size(searchCategory) > 0) {
  //               return map(searchCategory, item2 => {
  //                 if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
  //                   return item
  //                 }
  //               })
  //             } else {
  //               return item
  //             }
  //           }
  //         })
  //       }

  //       const _newData2 = []
  //       map(_newData, item => {
  //         if (size(searchCategory) > 0) {
  //           map(searchCategory, item2 => {
  //             if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
  //               _newData2.push(item)
  //             }
  //           })
  //         } else {
  //           _newData2.push(item)
  //         }
  //       })

  //       setTotalDataSearch(_newData2?.length)

  //       const _dataSearch = _newData2?.slice(
  //         (pageDataSearch - 1) * perPageDataSearch,
  //         (pageDataSearch - 1) * perPageDataSearch + perPageDataSearch
  //       )
  //       setDataSearch([..._dataSearch])

  //       // setPageDataSearch(1)
  //       setLoading(false)
  //     }, 350)
  //   }
  // }, [pageDataSearch])

  // useEffect(() => {
  //   let _newData = dataSearchMaster
  //   if (size(searchProduct) > 0) {
  //     _newData = dataSearchMaster?.filter(item => {
  //       if (
  //         item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
  //         item?.product_desc?.toLowerCase().includes(searchProduct?.toLowerCase())
  //       ) {
  //         if (size(searchCategory) > 0) {
  //           return map(searchCategory, item2 => {
  //             if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
  //               return item
  //             }
  //           })
  //         } else {
  //           return item
  //         }
  //       }
  //     })
  //   }

  //   const _newData2 = []
  //   map(_newData, item => {
  //     if (size(searchCategory) > 0) {
  //       map(searchCategory, item2 => {
  //         if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
  //           _newData2.push(item)
  //         }
  //       })
  //     } else {
  //       _newData2.push(item)
  //     }
  //   })

  //   setDataSearch([..._newData2])
  // }, [searchProduct, searchCategory])

  useEffect(() => {
    const _rowSelectionQty = []
    rowSelectionModel?.map((item, index) => {
      const _qty = filter(dataSearchMaster, ['id_product', item?.toString()])[0]?.qty ?? 1
      const _req0 = filter(dataSearchMaster, ['id_product', item?.toString()])[0]?.product_custom_request
      const _req = _req0 === null ? '' : _req0
      _rowSelectionQty.push({
        id_product: item,
        qty: _qty,
        product_custom_request: _req
      })
    })

    // console.log('_rowSelectionQty: ', _rowSelectionQty)
    setRowSelectionQty([..._rowSelectionQty])
  }, [rowSelectionModel, dataSearch])

  useEffect(() => {
    // console.log('openModal4', openModal4)
    if (!openModal4 || !openModal3 || !openModal) {
      // setReffID(null)
      setAmountToPay(0)
      setSearchCategory([])
      setSearchProduct('')

      // setValueModalTransaction({
      //   email_customer: '',
      //   wa_customer: '',
      //   id_payment_method: '38',
      //   amount_to_pay: 0,
      //   payment_method_code: '',
      //   fee: 0
      // })

      // setIsWaitingForPayment(false)
    }

    if (!openModal4) {
      setValueModalTransaction({
        email_customer: '',
        wa_customer: '',
        payment_method_code: '',
        id_payment_method: 0,
        amount_to_pay: 0,
        fee: 0
      })
    }

    if (openModal3) {
      const $paymentMethods = filter(
        paymentMethods,
        item =>
          parseInt(item?.min_transaction) <=
            dataFinal?.reduce(
              (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
              0
            ) +
              parseInt(valueModalTransaction?.fee) +
              (dataFinal?.reduce(
                (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                0
              ) *
                taxPercentage) /
                100 &&
          parseInt(item?.max_transaction) >=
            dataFinal?.reduce(
              (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
              0
            ) +
              parseInt(valueModalTransaction?.fee) +
              (dataFinal?.reduce(
                (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                0
              ) *
                taxPercentage) /
                100
      )
      setPaymentMethodsFiltered([...$paymentMethods])

      handleChangeEl(
        'id_payment_method',
        $paymentMethods[0]?.id_payment_method ?? 0,
        valueModalTransaction,
        setValueModalTransaction,
        schemaDataProduct,
        setErrorsField,
        errorsField,
        'int'
      )
    }
  }, [openModal4, openModal3, openModal])

  useEffect(() => {
    setDataFinal(data)
  }, [data])

  useEffect(() => {
    setUniqueCode(Math.floor(Math.random() * 900) + 100)
  }, [openModal, openModal3])

  useEffect(() => {
    const _fee_on_merchant =
      parseInt(
        filter(paymentMethods, {
          id_payment_method: valueModalTransaction?.id_payment_method?.toString() ?? '0'
        })[0]?.fee_on_merchant
      ) ?? 1

    const _total_amount = dataFinal?.reduce(
      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
      0
    )

    const _pg_fee_amount = parseInt(
      filter(paymentMethods, {
        id_payment_method: valueModalTransaction?.id_payment_method?.toString()
      })?.[0]?.fee_original ?? '500'
    )

    const _pg_fee_percent = parseFloat(
      filter(paymentMethods, {
        id_payment_method: valueModalTransaction?.id_payment_method?.toString()
      })?.[0]?.fee_original_percent ?? '0'
    )

    const _app_fee_amount = isFree
      ? 0
      : parseInt(
          filter(paymentMethods, {
            id_payment_method: valueModalTransaction?.id_payment_method?.toString()
          })?.[0]?.fee_app ?? '0'
        )

    const _app_fee_percent = isFree
      ? 0
      : parseFloat(
          filter(paymentMethods, {
            id_payment_method: valueModalTransaction?.id_payment_method?.toString()
          })?.[0]?.fee_app_percent ?? '0'
        )

    // console?.log('paymentMethods: ', paymentMethods)
    // console?.log('id_payment_method: ', valueModalTransaction?.id_payment_method)
    // console?.log(
    //   '_data: ',
    //   filter(paymentMethods, {
    //     id_payment_method: valueModalTransaction?.id_payment_method?.toString()
    //   })[0]
    // )
    // console?.log('_pg_fee_amount: ', _pg_fee_amount)
    // console?.log('_pg_fee_percent: ', _pg_fee_percent)
    // console?.log('_app_fee_amount: ', _app_fee_amount)
    // console?.log('_app_fee_percent: ', _app_fee_percent)

    // const _total_fee_percent = _pg_fee_percent + _app_fee_percent
    // const _total_fee_amount = _pg_fee_amount + _app_fee_amount
    // const _total_fee_temp = (_total_amount * _total_fee_percent).toFixed(2)
    // const _fee = _fee_on_merchant === 0 ? _total_fee_temp + _total_fee_amount : 0

    const _tax_amount = (_total_amount * taxPercentage) / 100
    const _disc = _total_amount - (_total_amount * discountAllProducts) / 100
    const _discount_all_products = discountAllProducts > 0 ? _disc : 0
    const _fee_percent = _pg_fee_percent + _app_fee_percent
    const _fee_percent_0 = 100 - _fee_percent
    const _amount0 = _total_amount + _pg_fee_amount + _app_fee_amount + _tax_amount
    let _final_amount = Math.round(((_amount0 * 100) / _fee_percent_0).toFixed(2))

    const _pg_fee = Math.round(((_final_amount * _pg_fee_percent) / 100).toFixed(2)) + _pg_fee_amount
    const _app_fee = Math.round(((_final_amount * _app_fee_percent) / 100).toFixed(2)) + _app_fee_amount
    let _fee = 0

    if (
      filter(paymentMethods, {
        id_payment_method: valueModalTransaction?.id_payment_method?.toString()
      })[0]?.payment_method_code === 'QRIS_PAYLATER'
    ) {
      _fee = _pg_fee + _app_fee + uniqueCode
    } else {
      _fee = _pg_fee + _app_fee
    }

    // console?.log('_fee: ', _fee)

    // console.log('_pg_fee_percent: ', _pg_fee_percent)
    // console.log('_pg_fee: ', _pg_fee)

    const _valueModalTransaction = valueModalTransaction
    _valueModalTransaction.fee = _fee
    setValueModalTransaction({ ..._valueModalTransaction })
  }, [paymentMethods, valueModalTransaction?.id_payment_method, valueModalTransaction?.amount_to_pay, openModal3])

  useEffect(() => {
    if (countDownSearchProduct > 0 && countDownSearchProduct < 3) {
      setTimeout(() => {
        if (countDownSearchProduct > 0 && countDownSearchProduct < 3) {
          setCountDownSearchProduct(countDownSearchProduct - 1)
        }
      }, 1000)

      // console.log('countDownSearchProduct: ', countDownSearchProduct)
    } else if (countDownSearchProduct < 1) {
      // console.log('countDownSearchProduct: ', countDownSearchProduct)
      setCountDownSearchProduct(4)
      searchProducts()
    }
  }, [countDownSearchProduct])

  const getPaymentMethods = async () => {
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
        const _uri = '/master/payment_method/list'
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
          body: JSON.stringify({ id: 0 })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setPaymentMethods(res?.data)

            getData()
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const searchProducts = async () => {
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
        const _uri = '/master/product/list'
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
          body: JSON.stringify({ search: searchProduct })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            // setDataSearch(res?.data)
            const _qty = []

            const _data = map(res?.data, item => ({ ...item, qty: 1, product_custom_request: '' }))

            // map(res?.data, item => {
            //   _qty.push({
            //     // id_product: item?.id_product,
            //     // product_code: item?.product_code,
            //     // product_name: item?.product_name,
            //     // product_price: item?.product_price,
            //     // product_status: item?.product_status,
            //     // product_qty: item?.product_qty,
            //     ...item,
            //     qty: 1
            //   })
            // })
            setDataSearchMaster([..._data])
            setTotalDataSearch(size(_data))

            // const _dataSearch = _data?.slice(0 * perPageDataSearch, 0 * perPageDataSearch + perPageDataSearch)
            // setDataSearch([..._dataSearch])
            setDataSearch([..._data])

            // console.log('_data: ', _data)
            setProductCategories([...res?.categories])
            setLoading(false)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }
  }, [])

  const handleUploadfile = event => {
    if (event?.target?.files[0]) {
      setSelectedFile(event?.target?.files[0])
      handleChangeEl(
        'selectedFile',
        event?.target?.files[0],
        valueModalProduct,
        setValueModalProduct,
        schemaDataProduct,
        setErrorsField
      )
    }
  }

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow)
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow })
        } else {
          resolve(oldRow) // Nothing was changed
        }
      }),
    []
  )

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments
    resolve(oldRow) // Resolve with the old row to not update the internal state
    setPromiseArguments(null)
  }

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow)

      // console.log(response)
      const _newData = dataFinal?.map(item => ({
        ...item,
        product_qty: item?.id === response?.id ? response.product_qty : item?.product_qty,
        product_price: item?.id === response?.id ? response.product_price : item?.product_price
      }))

      // console.log(_newData)
      setDataFinal([..._newData])

      handleUpdateTempProducts(response)

      setSnackbar({ children: 'Data sudah di perbaharui.', severity: 'success' })
      resolve(response)
      setPromiseArguments(null)
    } catch (error) {
      setSnackbar({ children: 'Data tidak boleh kosong!', severity: 'error' })
      reject(oldRow)
      setPromiseArguments(null)
    }
  }

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  }

  const handleRowSelectionModel = (id_product = false) => {
    setLoading(true)
    setTimeout(() => {
      const _rowSelectionModel = rowSelectionModel
      if (id_product) {
        if (!_rowSelectionModel.includes(parseInt(id_product))) {
          _rowSelectionModel.push(parseInt(id_product))
        } else {
          pull(_rowSelectionModel, parseInt(id_product))
        }
        setRowSelectionModel([..._rowSelectionModel])

        // const rowDataSearch = filter(dataSearch, ['id_product', id_product])
        // handleQty(id_product, rowDataSearch[0]?.qty)
      }
      setLoading(false)
    }, 500)
  }

  const handleQty = (id_product, qty, customReq = '') => {
    const _dataSearchMaster = dataSearchMaster

    const _data = _dataSearchMaster?.map(item => ({
      ...item,
      qty: item?.id_product === id_product ? qty : item?.qty,
      product_custom_request: item?.id_product === id_product ? customReq : item?.product_custom_request
    }))
    setDataSearchMaster([..._data])

    // return false

    const _rowSelectionQty = []
    rowSelectionModel?.map((item, index) => {
      const _qty = filter(_data, ['id_product', item?.toString()])[0]?.qty
      _rowSelectionQty.push({
        id_product: item,
        qty: _qty,
        product_custom_request: customReq
      })
    })

    // setDataSearch([..._data])

    // const _dataSearch = _data?.slice(
    //   (pageDataSearch - 1) * perPageDataSearch,
    //   (pageDataSearch - 1) * perPageDataSearch + perPageDataSearch
    // )

    setRowSelectionQty(_rowSelectionQty)

    let _newData = _data
    if (size(searchProduct) > 0) {
      _newData = _data?.filter(item => {
        if (
          item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
          item?.product_desc?.toLowerCase().includes(searchProduct?.toLowerCase())
        ) {
          if (size(searchCategory) > 0) {
            return map(searchCategory, item2 => {
              if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
                return {
                  ...item,
                  qty: item?.id_product === id_product ? qty : item?.qty,
                  product_custom_request: item?.id_product === id_product ? customReq : item?.product_custom_request
                }
              }
            })
          } else {
            return {
              ...item,
              qty: item?.id_product === id_product ? qty : item?.qty,
              product_custom_request: item?.id_product === id_product ? customReq : item?.product_custom_request
            }
          }
        }
      })
    }

    const _newData2 = []
    map(_newData, item => {
      if (size(searchCategory) > 0) {
        map(searchCategory, item2 => {
          if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
            _newData2.push({
              ...item,
              qty: item?.id_product === id_product ? qty : item?.qty,
              product_custom_request: item?.id_product === id_product ? customReq : item?.product_custom_request
            })
          }
        })
      } else {
        _newData2.push({
          ...item,
          qty: item?.id_product === id_product ? qty : item?.qty,
          product_custom_request: item?.id_product === id_product ? customReq : item?.product_custom_request
        })
      }
    })

    // setTotalDataSearch(_newData2?.length)

    const _dataSearch = _newData2

    setDataSearch([..._dataSearch])
  }

  // useEffect(() => {
  //   console.log('rowSelectionModel: ', rowSelectionModel)
  // }, [rowSelectionModel])

  // useEffect(() => {
  //   console.log('paymentMethods: ', paymentMethods)
  //   console.log(filter(paymentMethods, ['id_payment_method', valueModalTransaction?.id_payment_method?.toString()])[0])
  // }, [valueModalTransaction])

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null
    }

    const { newRow, oldRow } = promiseArguments
    const mutation = computeMutation(newRow, oldRow)

    return (
      <Dialog maxWidth='xs' TransitionProps={{ onEntered: handleEntered }} open={!!promiseArguments}>
        <DialogTitle>Apakah anda yakin?</DialogTitle>
        <DialogContent dividers>
          <Typography>Klik 'Ya' untuk merubah</Typography>
          <Typography>{mutation}</Typography>
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            Tidak
          </Button>
          <Button onClick={handleYes}>Ya</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Pembayaran Pelanggan {router?.query?.nama}</Link>
        </Typography>
        <Typography variant='body2'>Pembelian produk</Typography>

        <Divider />

        <Typography variant='body2'>
          <Button
            variant='contained'
            size='small'
            sx={{ mr: 3.5, mb: 5 }}
            onClick={() => handleClickButton()}
            disabled={saldo < 10000}
          >
            Pilih Produk
          </Button>
          &emsp; &emsp;
          <Button
            variant='contained'
            color='warning'
            size='small'
            sx={{ mr: 3.5, mb: 5 }}
            onClick={() => handleClickButtonNew()}
            disabled={saldo < 10000}
          >
            Produk Baru
          </Button>
          {data?.length > 0 && (
            <>
              &emsp; &emsp;
              <Button
                variant='contained'
                color='success'
                size='small'
                sx={{ mr: 3.5, mb: 5 }}
                onClick={() => setOpenModal3(true)}
                disabled={saldo < 10000}
              >
                ($) Proses Pembayaran
              </Button>
            </>
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            {renderConfirmDialog()}
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
              editMode='row'
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
                      <b>{data?.length} Produk</b>
                    </Typography>
                    <Typography>
                      <b>
                        Jumlah Item :{' '}
                        {format_rupiah(
                          dataFinal
                            ?.reduce((total, item) => parseInt(total) + parseInt(item?.product_qty), 0)
                            ?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>
                        Total :{' '}
                        {format_rupiah(
                          dataFinal
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
              processRowUpdate={processRowUpdate}

              // onCellEditStop={async (params, e, details) => {
              //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              //     setTimeout(() => {
              //       console.log(params)
              //       console.log(details)
              //     }, 1000)

              //     // event.defaultMuiPrevented = true
              //   }
              // }}

              // disableRowSelectionOnClick
            />
            {!!snackbar && (
              <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
          </Box>
        </Card>
      </Grid>

      <ModalDialog
        titleModal={
          <>
            <Typography variant='h5'>{titleModal}</Typography>
            {/* <TextField
              label='Cari Produk di Katalog'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mb: 1, mt: 3 }}
              onChange={e => setSearchProduct(e.target.value)}
              value={searchProduct}

              // error={errorsField?.product_category}
              // helperText={errorsField?.product_category}
            /> */}

            <Box display={'flex'} justifyContent={'space-between'}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      label='Cari Produk di Katalog'
                      variant='outlined'
                      fullWidth
                      size='small'
                      sx={{ mb: 1, mt: 5 }}
                      onChange={e => setSearchProduct(e.target.value)}
                      value={searchProduct}
                      InputProps={{
                        endAdornment: (
                          <>
                            <InputAdornment position='end'>
                              <Button color='warning' size='small' variant='contained' onClick={handleSearchProduct}>
                                Cari
                              </Button>
                            </InputAdornment>
                            {size(searchProduct) > 0 && (
                              <>
                                &nbsp; &nbsp;
                                <HighlightOff onClick={() => setSearchProduct('')} sx={{ cursor: 'pointer' }} />
                              </>
                            )}
                          </>
                        )
                      }}

                      // error={errorsField?.product_category}
                      // helperText={errorsField?.product_category}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box sx={{ width: '100%' }}>
                    <Autocomplete
                      multiple
                      variant='outlined'
                      id='categories'
                      size='small'
                      sx={{ mt: 5, textTransform: 'capitalize' }}
                      options={productCategories}
                      getOptionLabel={option => option?.product_category}
                      onChange={(e, v) => setSearchCategory(v)}
                      value={searchCategory}
                      renderInput={params => (
                        <TextField
                          {...params}
                          variant='outlined'
                          label='Kategori Produk'
                          placeholder='Kategori Produk'
                        />
                      )}
                    />
                  </Box>
                </Grid>
                {/* <Box sx={{ p: 2 }}>
                  <Pagination
                    page={pageDataSearch}
                    count={parseInt(totalDataSearch / perPageDataSearch < 1 ? 1 : totalDataSearch / perPageDataSearch)}
                    variant='outlined'
                    color='primary'
                    onChange={(e, page) => setPageDataSearch(page)}
                  />
                </Box> */}
              </Grid>
            </Box>
          </>
        }
        size='xl'
        fullScreen
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handleSubmit()}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%', overflow: 'auto', m: 0, justifyContent: 'center' }}>
            <Grid container spacing={2}>
              {size(dataSearch) === 0 && <Box sx={{ m: 10 }}>Silakan pilih produk terlebih dahulu.</Box>}
              {dataSearch?.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={3}
                  sx={{
                    justifyContent: 'center'
                  }}
                >
                  <Card
                    sx={{
                      p: {
                        xs: 2,
                        sm: 3
                      },
                      maxWidth: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                    className={
                      includes(rowSelectionModel, parseInt(item?.id_product)) ? 'border-selected' : 'border-gray'
                    }
                  >
                    <CardActionArea>
                      <Checkbox
                        checked={includes(rowSelectionModel, parseInt(item?.id_product))}
                        onClick={() => handleRowSelectionModel(item?.id_product)}
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 28 },
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          p: 2,
                          backgroundColor: 'grey'
                        }}
                      />
                      <CardMedia
                        component='img'
                        height='250'
                        image={process.env.NEXT_PUBLIC_API + item?.product_image_url}
                        alt={item?.product_name}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant='h6'
                          component='div'
                          sx={{
                            fontSize: '16px !important',
                            textAlign: 'center'
                          }}
                        >
                          Rp {format_rupiah(item?.product_price)}
                        </Typography>
                        <Typography
                          noWrap
                          variant='h6'
                          sx={{ color: 'text.secondary', fontSize: '16px !important', textAlign: 'center' }}
                        >
                          {item?.product_name}
                        </Typography>
                        <Divider />
                        <Typography
                          noWrap
                          sx={{ color: 'text.secondary', fontSize: '12px !important', textAlign: 'center' }}
                        >
                          {item?.product_desc ?? '-'}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ justifyContent: 'center', pt: 0, pb: 3, mt: -3 }}>
                        {includes(rowSelectionModel, parseInt(item?.id_product)) && (
                          <Box>
                            <TextField
                              label='Jumlah Pembelian'
                              variant='outlined'
                              size='small'
                              sx={{ mt: 4 }}
                              InputProps={{
                                endAdornment: <InputAdornment position='start'>pcs</InputAdornment>,
                                inputMode: 'numeric'
                              }}
                              onFocus={e => e.target.select()}
                              value={item?.qty}
                              onChange={e =>
                                handleQty(item?.id_product, e?.target?.value, item?.product_custom_request ?? '')
                              }
                            />
                          </Box>
                        )}
                      </CardActions>

                      <CardActions sx={{ justifyContent: 'center', pt: 0, pb: 3, mt: -3 }}>
                        {includes(rowSelectionModel, parseInt(item?.id_product)) && (
                          <Box sx={{ width: '100%' }}>
                            <TextField
                              fullWidth
                              label='Permintaan (cth: Pedas & banyak kuah)'
                              variant='outlined'
                              size='small'
                              sx={{ mt: 4 }}
                              onFocus={e => e.target.select()}
                              value={item?.product_custom_request}
                              onChange={e => handleQty(item?.id_product, item?.qty, e?.target?.value ?? '')}
                            />
                          </Box>
                        )}
                      </CardActions>

                      <CardActions sx={{ justifyContent: 'center', pt: 0, pb: 3, mt: 2 }}>
                        <Box>
                          <Button
                            size='small'
                            color={includes(rowSelectionModel, parseInt(item?.id_product)) ? 'error' : 'success'}
                            variant='contained'
                            onClick={() => handleRowSelectionModel(parseInt(item?.id_product))}
                          >
                            {includes(rowSelectionModel, parseInt(item?.id_product)) ? 'Batal' : 'Pilih'}
                          </Button>
                        </Box>
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal={titleModal2}
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        handleSubmitFunction={() => handleCreateTempProducts()}
      >
        <Box>
          <Box>
            <TextField
              label='Kode Produk'
              variant='outlined'
              fullWidth
              size='small'
              onChange={e =>
                handleChangeEl(
                  'product_code',
                  e,
                  valueModalProduct,
                  setValueModalProduct,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={valueModalProduct?.product_code}
              error={errorsField?.product_code}
              helperText={errorsField?.product_code}
            />
          </Box>
          <Box>
            <TextField
              label='Nama Produk'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 5 }}
              onFocus={e => e.target.select()}
              onChange={e =>
                handleChangeEl(
                  'product_name',
                  e,
                  valueModalProduct,
                  setValueModalProduct,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={valueModalProduct?.product_name}
              error={errorsField?.product_name}
              helperText={errorsField?.product_name}
            />
          </Box>
          <Box>
            <TextField
              label='Harga Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 5 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              onFocus={e => e.target.select()}
              onChange={e =>
                handleChangeEl(
                  'product_price',
                  e,
                  valueModalProduct,
                  setValueModalProduct,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={format_rupiah(valueModalProduct?.product_price?.toString())}
              error={errorsField?.product_price}
              helperText={errorsField?.product_price}
            />
          </Box>
          <Box>
            <TextField
              label='Jumlah Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 5 }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>Qty</InputAdornment>
              }}
              onChange={e =>
                handleChangeEl(
                  'product_qty',
                  e,
                  valueModalProduct,
                  setValueModalProduct,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={valueModalProduct?.product_qty}
              error={errorsField?.product_qty}
              helperText={errorsField?.product_qty}
            />
          </Box>
          <Box sx={{ mt: 5 }}>
            {!selectedFile && (
              <IconButton color='primary' aria-label='upload picture' component='label'>
                <input hidden accept='image/*' type='file' onChange={e => handleUploadfile(e)} />
                <PhotoCamera />
              </IconButton>
            )}
            {selectedFile && (
              <>
                <ModalImage
                  small={typeof selectedFile === 'object' ? window?.URL?.createObjectURL(selectedFile) : selectedFile}
                  large={typeof selectedFile === 'object' ? window?.URL?.createObjectURL(selectedFile) : selectedFile}
                  alt='Tuntaz'
                  className='image-thumbnail2'
                  style={{ width: '50px' }}
                />{' '}
                &emsp;
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`Delete`}
                  onClick={() => setSelectedFile()}
                >
                  <Close style={{ color: 'red' }} />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal={titleModal3}
        openModal={openModal3}
        setOpenModal={setOpenModal3}
        handleSubmitFunction={() => setOpenModalSuccessConfirmation(true)}

        // handleSubmitFunction={() => handleCreateTransaction()}
      >
        <Box>
          <h5>Data Pelanggan (Struk Digital - Go Green)</h5>

          <Box sx={{ mt: -6 }}>
            <TextField
              onFocus={e => e?.target?.select()}
              inputProps={{ inputMode: 'numeric' }}
              autoFocus={true}
              label='No Whatsapp'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 4 }}
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

          <Box sx={{ mt: 2 }}>
            <TextField
              label='Email Pelanggan'
              variant='outlined'
              fullWidth
              size='small'
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

          <Divider />

          <h5>Metode Pembayaran</h5>

          <Box sx={{ mt: 0 }}>
            <Autocomplete
              value={
                filter(paymentMethodsFiltered, [
                  'id_payment_method',
                  valueModalTransaction?.id_payment_method?.toString()
                ])[0]?.id
                  ? {
                      id: filter(paymentMethodsFiltered, [
                        'id_payment_method',
                        valueModalTransaction?.id_payment_method?.toString()
                      ])[0]?.id,
                      label: filter(paymentMethodsFiltered, [
                        'id_payment_method',
                        valueModalTransaction?.id_payment_method?.toString()
                      ])[0]?.payment_method_name
                    }
                  : null
              }
              onChange={(event, newValuePM) => {
                handleChangeEl(
                  'id_payment_method',
                  newValuePM?.id_payment_method,
                  valueModalTransaction,
                  setValueModalTransaction,
                  schemaDataProduct,
                  setErrorsField,
                  errorsField,
                  'int'
                )
              }}
              id='combo-box-demo'
              size='small'
              options={filter(
                paymentMethodsFiltered,
                item =>
                  parseInt(item?.min_transaction) <=
                    dataFinal?.reduce(
                      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                      0
                    ) +
                      parseInt(valueModalTransaction?.fee) +
                      (dataFinal?.reduce(
                        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                        0
                      ) *
                        taxPercentage) /
                        100 &&
                  parseInt(item?.max_transaction) >=
                    dataFinal?.reduce(
                      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                      0
                    ) +
                      parseInt(valueModalTransaction?.fee) +
                      (dataFinal?.reduce(
                        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                        0
                      ) *
                        taxPercentage) /
                        100
              )?.map(item => ({
                ...item,
                id: item?.payment_method_id,
                label: item?.payment_method_name
              }))}
              renderInput={params => (
                <TextField
                  size='small'
                  {...params}
                  label='Metode Pembayaran'
                  fullWidth={false}
                  sx={{ minWidth: '300px' }}
                />
              )}
            />
          </Box>

          <Box sx={{ mt: 1 }}>
            <TextField
              label='Jumlah Pembayaran'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>,
                inputMode: 'numeric'
              }}
              disabled={
                filter(paymentMethods, {
                  id_payment_method: valueModalTransaction?.id_payment_method?.toString()
                })[0]?.payment_method_code !== 'CASH'
              }
              onFocus={e => e.target.select()}
              onChange={e =>
                handleChangeEl(
                  'amount_to_pay',
                  e,
                  valueModalTransaction,
                  setValueModalTransaction,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={
                filter(paymentMethods, {
                  id_payment_method: valueModalTransaction?.id_payment_method?.toString()
                })[0]?.payment_method_code !== 'CASH'
                  ? format_rupiah(
                      dataFinal?.reduce(
                        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                        0
                      ) +
                        parseInt(valueModalTransaction?.fee) -
                        (dataFinal?.reduce(
                          (total, item) =>
                            parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                          0
                        ) *
                          discountAllProducts) /
                          100 +
                        (dataFinal?.reduce(
                          (total, item) =>
                            parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                          0
                        ) *
                          taxPercentage) /
                          100
                    )
                  : format_rupiah(valueModalTransaction?.amount_to_pay)
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <TrophyImg
              alt={
                filter(paymentMethods, ['id_payment_method', valueModalTransaction?.id_payment_method?.toString()])[0]
                  ?.payment_method_name
              }
              src={
                filter(paymentMethods, ['id_payment_method', valueModalTransaction?.id_payment_method?.toString()])[0]
                  ?.payment_method_image_url
              }
              width={70}
              height={'auto'}
            />
          </Box>

          <Divider />

          <Box>
            <p>
              Total Tagihan : IDR{' '}
              {format_rupiah(
                parseInt(
                  dataFinal?.reduce(
                    (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                    0
                  ) +
                    parseInt(valueModalTransaction?.fee) +
                    (dataFinal?.reduce(
                      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                      0
                    ) *
                      taxPercentage) /
                      100
                )?.toString()
              )}
            </p>
            <p>
              Diskon : IDR {discountAllProducts == 0 ? '' : '-'}
              {format_rupiah(
                parseInt(
                  (dataFinal?.reduce(
                    (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                    0
                  ) *
                    discountAllProducts) /
                    100
                )?.toString()
              )}{' '}
              ({discountAllProducts}%)
            </p>
            <p>
              Pembayaran : IDR{' '}
              {filter(paymentMethods, {
                id_payment_method: valueModalTransaction?.id_payment_method?.toString()
              })[0]?.payment_method_code !== 'CASH'
                ? format_rupiah(
                    dataFinal?.reduce(
                      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                      0
                    ) +
                      parseInt(valueModalTransaction?.fee) -
                      (dataFinal?.reduce(
                        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                        0
                      ) *
                        discountAllProducts) /
                        100 +
                      (dataFinal?.reduce(
                        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                        0
                      ) *
                        taxPercentage) /
                        100
                  )
                : format_rupiah(valueModalTransaction?.amount_to_pay) ?? 0}
            </p>
            <p>
              Kembalian :{' '}
              <b>
                IDR{' '}
                {filter(paymentMethods, {
                  id_payment_method: valueModalTransaction?.id_payment_method?.toString()
                })[0]?.payment_method_code !== 'CASH'
                  ? 0
                  : format_rupiah(
                      (
                        parseInt(valueModalTransaction?.amount_to_pay?.toString().replace(/\./g, '')) -
                        parseInt(
                          dataFinal?.reduce(
                            (total, item) =>
                              parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                            0
                          ) +
                            parseInt(valueModalTransaction?.fee) -
                            (dataFinal?.reduce(
                              (total, item) =>
                                parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                              0
                            ) *
                              discountAllProducts) /
                              100 +
                            (dataFinal?.reduce(
                              (total, item) =>
                                parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                              0
                            ) *
                              taxPercentage) /
                              100
                        )
                      )?.toString()
                    ) ?? 0}
              </b>
            </p>
          </Box>
          <Divider />
          <h5>Total Pembelian</h5>
          <Box sx={{ mt: -4 }}>
            <TextField
              label='Jumlah Produk'
              variant='outlined'
              size='small'
              disabled
              InputProps={{
                startAdornment: <InputAdornment position='start'>Qty</InputAdornment>,
                endAdornment: <InputAdornment position='end'>Items</InputAdornment>
              }}
              value={dataFinal?.length}
            />
          </Box>
          <Box>
            <TextField
              label='Harga Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled
              value={format_rupiah(
                dataFinal
                  ?.reduce(
                    (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                    0
                  )
                  ?.toString()
              )}
            />
          </Box>
          <Box>
            <TextField
              label='Diskon Pembelian'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled
              value={
                format_rupiah(
                  parseInt(
                    (dataFinal?.reduce(
                      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                      0
                    ) *
                      discountAllProducts) /
                      100
                  )?.toString()
                ) +
                ' (' +
                discountAllProducts +
                '%)'
              }
            />
          </Box>
          <Box>
            <TextField
              label='Biaya Layanan'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled
              value={format_rupiah(Math.round(valueModalTransaction?.fee))}
            />
          </Box>
          <Box>
            <TextField
              label='Pajak'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled
              value={format_rupiah(
                (dataFinal?.reduce(
                  (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                  0
                ) *
                  taxPercentage) /
                  100
              )}
            />
          </Box>
          <Box>
            <TextField
              label='Total Tagihan'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled
              value={format_rupiah(
                dataFinal?.reduce(
                  (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                  0
                ) +
                  parseInt(valueModalTransaction?.fee) -
                  (dataFinal?.reduce(
                    (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                    0
                  ) *
                    discountAllProducts) /
                    100 +
                  (dataFinal?.reduce(
                    (total2, item2) => parseInt(total2) + parseInt(item2?.product_price) * parseInt(item2?.product_qty),
                    0
                  ) *
                    taxPercentage) /
                    100
              )}
            />
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog titleModal='Detail Pembayaran' openModal={openModal4} setOpenModal={setOpenModal4}>
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, textAlign: 'center' }}>
            <Box>
              <Typography>
                <h3>IDR {format_rupiah(paymentDetail?.req?.amount ?? amountToPay)}</h3>
              </Typography>
            </Box>
            <Box>
              <Typography>Berlaku dalam 10 Menit</Typography>
              {valueModalTransaction?.payment_method_code === 'QRIS_PAYLATER' && (
                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                  BAYAR SESUAI NOMINAL, AGAR PEMBAYARANMU BERHASIL.
                </Typography>
              )}
            </Box>
            <Box>
              <Typography>
                Metode Pembayaran :{' '}
                {filter(paymentMethods, {
                  id_payment_method: valueModalTransaction?.id_payment_method?.toString()
                })[0]?.payment_method_name ?? 'QRIS'}
              </Typography>
            </Box>
            <Box>
              {valueModalTransaction?.payment_method_code === 'QRIS' ||
              valueModalTransaction?.payment_method_code === 'QRIS_PAYLATER' ||
              valueModalTransaction?.payment_method_code === 'QRISREALTIME' ||
              filter(paymentMethods, {
                id_payment_method: valueModalTransaction?.id_payment_method?.toString()
              })[0]?.payment_method_code === 'QRIS' ||
              filter(paymentMethods, {
                id_payment_method: valueModalTransaction?.id_payment_method?.toString()
              })[0]?.payment_method_code === 'QRIS_PAYLATER' ||
              filter(paymentMethods, {
                id_payment_method: valueModalTransaction?.id_payment_method?.toString()
              })[0]?.payment_method_code === 'QRISREALTIME' ? (
                <>
                  <img src={`${paymentDetail?.res?.data?.qr_link}`} height={250} />
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
                      Bayar{' '}
                      {
                        filter(paymentMethods, {
                          id_payment_method: valueModalTransaction?.id_payment_method?.toString()
                        })[0]?.payment_method_name
                      }
                    </Button>
                  </a>
                </>
              ) : parseInt(valueModalTransaction?.id_payment_method) >= 1 &&
                parseInt(valueModalTransaction?.id_payment_method) <= 10 ? (
                <>
                  <Typography>
                    Nomor Rekening Tujuan :<br />
                    <b>
                      {spacing4Char(
                        parseInt(valueModalTransaction?.id_payment_method) === 4
                          ? '70017' + paymentDetail?.res?.data?.nomor_va
                          : '' + paymentDetail?.res?.data?.nomor_va
                      )}
                    </b>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography>Bayar sesuai nominal tagihan.</Typography>
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

      <ModalDialog titleModal='Peringatan' openModal={openModalWarning} setOpenModal={setOpenModalWarning}>
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, paddingBottom: 15, textAlign: 'center' }}>
            <Typography>
              <h3>Saldo Anda IDR {format_rupiah(saldo)}</h3>
              <h5>Minimal saldo penggunaan Menu Kasir adalah IDR {format_rupiah(10000)}</h5>
              <Button variant='contained' onClick={() => router.push('/dompet-digital')}>
                Deposit Saldo
              </Button>
            </Typography>
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
              onFocus={e => e?.target?.select()}
              inputProps={{ inputMode: 'numeric' }}
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
            <Typography>Dibayar di Kasir</Typography>
            {/* {paymentDetail?.req?.reff_id ? (
              <Typography variant='h5'>IDR {format_rupiah(paymentDetail?.req?.reff_id)}</Typography>
            ) : (
              <Typography variant='h5'>Dengan uang tunai.</Typography>
            )} */}
          </Box>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi'
        openModal={openModalSuccessConfirmation}
        setOpenModal={setOpenModalSuccessConfirmation}
        handleSubmitFunction={() => handleCreateTransaction()}
      >
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, paddingBottom: 15, textAlign: 'center' }}>
            <Typography variant='h6'>Apakah anda yakin akan meneruskan transaksi ini?</Typography>
            <Typography>
              Pastikan informasi pelanggan dengan benar, jika anda memasukkan Nomor Whatsapp dan/atau Email.
            </Typography>
            {/* {valueModalTransaction?.amount_to_pay ? (
              <Typography variant='h5'>IDR {format_rupiah(valueModalTransaction?.amount_to_pay)}</Typography>
            ) : (
              <Typography variant='h5'>Dengan uang tunai.</Typography>
            )} */}
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
