// ** MUI Imports
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextField
} from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
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
import { filter } from 'lodash'
import ModalImage from 'react-modal-image'
import ModalDialog from 'src/components/dialog'
import { format_rupiah, generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** States
  const [loading, setLoading] = useState(false)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [openModal3, setOpenModal3] = useState(false)
  const [openModal4, setOpenModal4] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const [countDownSearchProduct, setCountDownSearchProduct] = useState(4)
  const [titleModal, setTitleModal] = useState('Ambil produk dari katalog')
  const [titleModal2, setTitleModal2] = useState('Tambahkan produk baru secara manual')
  const [titleModal3, setTitleModal3] = useState('Detail pembayaran')
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [paymentDetail, setPaymentDetail] = useState([])
  const [reffID, setReffID] = useState(null)

  // const [valueModal, setValueModal] = useState({ id_product_category: null, product_category: '' })
  const [data, setData] = useState([])
  const [dataFinal, setDataFinal] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [selectedFile, setSelectedFile] = useState()
  const [widthScreen, setWidthScreen] = useState(1100)

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
    id_payment_method: 0,
    amount_to_pay: 0,
    fee: 0
  })

  let schemaDataProduct = yup.object().shape({
    product_code: yup.string().required(),
    product_name: yup.string().required(),
    product_qty: yup.number().min(1).required(),
    product_price: yup.number().min(100).required()
  })

  const useFakeMutation = () => {
    return useCallback(
      row =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (row.product_qty.toString().trim() === '' || row.product_price.toString().trim() === '') {
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
        const _uri = '/transactions/orders/get_temp_products'
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
    getPaymentMethods()
    function handleResize() {
      setWidthScreen(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      router.push('/auth')
    }
  }, [])

  let _loopNumber = 1

  const columns = [
    // { field: 'product_code', headerName: 'Kode', width: 100 },
    { field: 'product_name', headerName: 'Nama Produk', width: 100 },

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
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'total_price',
      headerName: 'Total Harga',
      width: 120,
      renderCell: params => format_rupiah((params?.row?.product_qty * params?.row?.product_price).toString())
    },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 120,
      renderCell: params => <img src={`${process.env.NEXT_PUBLIC_API}` + params?.value} width={100} />
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
      renderCell: params => <img src={`${process.env.NEXT_PUBLIC_API}` + params?.value} width={100} />
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
    setIsAdd(false)
    const _x = confirm('Anda yakin ingin membatalkan produk ' + _params?.row?.product_name + ' ?')
    if (_x) {
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
          const _uri = '/transactions/orders/delete_temp_products'
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
            body: JSON.stringify({ id: _params?.row?.id })
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
    setLoading(true)
    if (
      valueModalTransaction?.amount_to_pay === null ||
      valueModalTransaction?.amount_to_pay === '' ||
      (parseInt(valueModalTransaction?.id_payment_method) === 0 &&
        parseInt((valueModalTransaction?.amount_to_pay).toString().replace(/\./g, '')) <
          parseInt(
            dataFinal?.reduce(
              (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
              0
            )
          ))
    ) {
      alert('Uang pembayaran masih kurang!')

      return false
    }

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
        const _uri = reffID ? '/transactions/orders/update' : '/transactions/orders/create'
        const _secret = await generateSignature(_uri)

        const _total_amount = dataFinal?.reduce(
          (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
          0
        )

        const _pg_fee_amount = parseFloat(
          filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })[0]?.fee_original ??
            '0'
        )

        const _pg_fee_percent =
          parseFloat(
            filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })[0]
              ?.fee_original_percent ?? '0'
          ) / 100

        const _app_fee_amount = parseFloat(
          filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })[0]?.fee_app ?? '500'
        )

        const _app_fee_percent =
          parseFloat(
            filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })[0]
              ?.fee_app_percent ?? '0'
          ) / 100

        const _pg_fee = _total_amount * _pg_fee_percent + _pg_fee_amount
        const _app_fee = _total_amount * _app_fee_percent + _app_fee_amount

        const _fee_on_merchant =
          parseInt(
            filter(paymentMethods, {
              id_payment_method: valueModalTransaction?.id_payment_method.toString()
            })[0]?.fee_on_merchant
          ) ?? 1

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
            email_customer: valueModalTransaction?.email_customer,
            wa_customer: valueModalTransaction?.wa_customer,
            total_product: dataFinal?.length,
            amount: _fee_on_merchant === 0 ? _total_amount + _pg_fee + _app_fee : _total_amount,

            amount_to_pay:
              parseInt(valueModalTransaction?.id_payment_method) > 0
                ? _fee_on_merchant === 0
                  ? _total_amount + _pg_fee + _app_fee
                  : _total_amount
                : parseInt(valueModalTransaction?.amount_to_pay.toString().replace(/\./g, '')),

            pg_fee: _pg_fee,
            app_fee: _app_fee,
            fee: _pg_fee + _app_fee,
            id_payment_method: parseInt(valueModalTransaction?.id_payment_method),
            payment_method_code: filter(paymentMethods, {
              id_payment_method: valueModalTransaction?.id_payment_method.toString()
            })[0]?.payment_method_code,
            payment_method_name: filter(paymentMethods, {
              id_payment_method: valueModalTransaction?.id_payment_method.toString()
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

            if (res?.code === 1) {
              setReffID(res?.payment?.req?.reff_id)
              setPaymentDetail(res?.payment)
              setOpenModal4(true)
            } else {
              setValueModalTransaction({
                email_customer: '',
                wa_customer: '',
                payment_method_code: '',
                id_payment_method: 0,
                amount_to_pay: 0,
                fee: 0
              })
            }

            setReffID(null)
            setData(res?.data)
            getPaymentMethods()
            setOpenModal3(false)

            // Finish And Go To New Payment
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleCreateTempProducts = async (isDelete = false) => {
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    if ((await schemaDataProduct.isValid(valueModalProduct)) === false) {
      alert('Mohon lengkapi semua data.')

      return false
    }

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
        const _uri = '/transactions/orders/create_temp_products'
        const _secret = await generateSignature(_uri)

        delete valueModalProduct?.selectedFile
        const dataX = new FormData()
        Object.keys(valueModalProduct).forEach(item => {
          dataX.append(item, valueModalProduct[item])
        })
        dataX.append('userfile', selectedFile, selectedFile.name)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
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
        const _uri = '/transactions/orders/update_temp_products'
        const _secret = await generateSignature(_uri)

        const dataX = new FormData()
        dataX.append('id', _data?.id)
        dataX.append('product_qty', _data?.product_qty)
        dataX.append('product_price', _data?.product_price)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
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
          const _uri = '/transactions/orders/create_temp_products2'
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

            body: JSON.stringify({ id_product: rowSelectionModel })
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
    if (searchProduct.length > 0) {
      setCountDownSearchProduct(1)
    }
  }, [searchProduct])

  useEffect(() => {
    if (!openModal4) {
      setValueModalTransaction({
        email_customer: '',
        wa_customer: '',
        id_payment_method: 0,
        amount_to_pay: 0,
        payment_method_code: '',
        fee: 0
      })
    }
  }, [openModal4])

  useEffect(() => {
    setDataFinal(data)
  }, [data])

  useEffect(() => {
    const _fee_on_merchant =
      parseInt(
        filter(paymentMethods, {
          id_payment_method: valueModalTransaction?.id_payment_method.toString() ?? '0'
        })[0]?.fee_on_merchant
      ) ?? 1

    const _total_amount = dataFinal?.reduce(
      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
      0
    )

    const _pg_fee_amount = parseFloat(
      filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })?.[0]?.fee_original ??
        '500'
    )

    const _pg_fee_percent =
      parseFloat(
        filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })?.[0]
          ?.fee_original_percent ?? '0'
      ) / 100

    const _app_fee_amount = parseFloat(
      filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })?.[0]?.fee_app ?? '0'
    )

    const _app_fee_percent =
      parseFloat(
        filter(paymentMethods, { id_payment_method: valueModalTransaction?.id_payment_method })?.[0]?.fee_app_percent ??
          '0'
      ) / 100

    const _total_fee_percent = _pg_fee_percent + _app_fee_percent
    const _total_fee_amount = _pg_fee_amount + _app_fee_amount
    const _total_fee_temp = _total_amount * _total_fee_percent
    const _fee = _fee_on_merchant === 0 ? _total_fee_temp + _total_fee_amount : 0

    const _valueModalTransaction = valueModalTransaction
    _valueModalTransaction.fee = _fee
    setValueModalTransaction({ ..._valueModalTransaction })
  }, [paymentMethods, valueModalTransaction?.id_payment_method, valueModalTransaction?.amount_to_pay])

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
        const _uri = '/master/payment_method/list'
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
            setPaymentMethods(res?.data)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const searchProducts = async () => {
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
        const _uri = '/master/product/list'
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
          body: JSON.stringify({ search: searchProduct })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setDataSearch(res?.data)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

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
      console.log(_newData)
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

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null
    }

    const { newRow, oldRow } = promiseArguments
    const mutation = computeMutation(newRow, oldRow)

    return (
      <Dialog maxWidth='xs' TransitionProps={{ onEntered: handleEntered }} open={!!promiseArguments}>
        <DialogTitle>Apakah anda yakin?</DialogTitle>
        <DialogContent dividers>{`Klik 'Ya' untuk merubah ${mutation}.`}</DialogContent>
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
          <Link>Pembayaran - Kasir</Link>
        </Typography>
        <Typography variant='body2'>Pembelian produk</Typography>
        <Divider />
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ mr: 3.5, mb: 5 }} onClick={() => handleClickButton()}>
            Katalog Produk
          </Button>
          &emsp; &emsp;
          <Button
            variant='contained'
            color='warning'
            size='small'
            sx={{ mr: 3.5, mb: 5 }}
            onClick={() => handleClickButtonNew()}
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
              pageSizeOptions={[100]}
              slots={{
                toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
                footer: () => (
                  <Box sx={{ p: 3 }}>
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
        titleModal={titleModal}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handleSubmit()}
      >
        <Box sx={{ width: '100%' }}>
          <TextField
            label='Cari Produk di Katalog'
            variant='outlined'
            fullWidth
            size='small'
            sx={{ mb: 1 }}
            onChange={e => setSearchProduct(e.target.value)}
            value={searchProduct}

            // error={errorsField?.product_category}
            // helperText={errorsField?.product_category}
          />
          <Divider sx={{ mb: 1 }} />

          <Grid item xs={12}>
            <Card>
              <Box sx={{ width: '100%', overflow: 'auto' }}>
                <DataGrid
                  density={'compact'}
                  autoHeight
                  rows={dataSearch}
                  columns={columnsSearch}
                  getRowId={row => row.id_product}
                  pageSizeOptions={[100]}
                  slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true
                    }
                  }}
                  sx={{ pt: 2, minHeight: '350px', '--DataGrid-overlayHeight': '300px' }}
                  isRowSelectable={params => params.row.product_qty > 0}
                  checkboxSelection
                  onRowSelectionModelChange={newRowSelectionModel => {
                    setRowSelectionModel(newRowSelectionModel)
                  }}
                  rowSelectionModel={rowSelectionModel}

                  // disableRowSelectionOnClick
                />
              </Box>
            </Card>
          </Grid>
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
              value={valueModalProduct?.product_price}
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
        handleSubmitFunction={() => handleCreateTransaction()}
      >
        <Box>
          <h5>Data Pelanggan (Struk Digital - Go Green)</h5>
          <Box sx={{ mt: -4 }}>
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
          <Box>
            <TextField
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
          <Divider />
          <h5>Metode Pembayaran</h5>
          <Box sx={{ mt: -6 }}>
            <TextField
              label='Jumlah Pembayaran'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled={parseInt(valueModalTransaction?.id_payment_method) > 0}
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
                parseInt(valueModalTransaction?.id_payment_method) > 0
                  ? format_rupiah(
                      dataFinal?.reduce(
                        (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                        0
                      ) + parseInt(valueModalTransaction?.fee)
                    )
                  : format_rupiah(valueModalTransaction?.amount_to_pay)
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Select
              size='small'
              onChange={e =>
                handleChangeEl(
                  'id_payment_method',
                  e,
                  valueModalTransaction,
                  setValueModalTransaction,
                  schemaDataProduct,
                  setErrorsField,
                  errorsField,
                  'int'
                )
              }
              value={valueModalTransaction?.id_payment_method}
            >
              {paymentMethods?.map((item, index) => (
                <MenuItem key={index} value={item?.id_payment_method}>
                  {item?.payment_method_name}
                </MenuItem>
              ))}
              {/* <MenuItem value={0}>Tunai (Cash)</MenuItem> */}
            </Select>
          </Box>
          <Divider />

          <Box>
            <h3>
              Pembayaran : IDR{' '}
              {parseInt(valueModalTransaction?.id_payment_method) > 0
                ? format_rupiah(
                    dataFinal?.reduce(
                      (total, item) => parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                      0
                    ) + parseInt(valueModalTransaction?.fee)
                  )
                : format_rupiah(valueModalTransaction?.amount_to_pay)}
            </h3>
            <h3>
              Kembalian : IDR{' '}
              {parseInt(valueModalTransaction?.id_payment_method) > 0
                ? 0
                : format_rupiah(
                    (
                      parseInt((valueModalTransaction?.amount_to_pay).toString().replace(/\./g, '')) -
                      parseInt(
                        dataFinal?.reduce(
                          (total, item) =>
                            parseInt(total) + parseInt(item?.product_price) * parseInt(item?.product_qty),
                          0
                        ) + parseInt(valueModalTransaction?.fee)
                      )
                    )?.toString()
                  )}
            </h3>
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
              label='Biaya Layanan'
              variant='outlined'
              size='small'
              sx={{ mt: 4 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
              }}
              disabled
              onChange={e =>
                handleChangeEl(
                  'fee',
                  e,
                  valueModalTransaction,
                  setValueModalTransaction,
                  schemaDataProduct,
                  setErrorsField
                )
              }
              value={format_rupiah(valueModalTransaction?.fee)}
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
                ) + parseInt(valueModalTransaction?.fee)
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
            {parseInt(valueModalTransaction?.id_payment_method) >= 18 &&
              parseInt(valueModalTransaction?.id_payment_method) <= 19 && (
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
                      {filter(paymentMethods, [
                        'id_payment_method',
                        parseInt(valueModalTransaction?.id_payment_method ?? 0)
                      ])[0]?.payment_method_name ?? 'QRIS'}
                    </Typography>
                  </Box>
                  <Box>
                    {parseInt(valueModalTransaction?.id_payment_method) == 18 ||
                    parseInt(valueModalTransaction?.id_payment_method) == 19 ? (
                      <>
                        <img src={`${process.env.NEXT_PUBLIC_API}/${paymentDetail?.image_src}`} />
                      </>
                    ) : (
                      <>
                        <Typography>
                          Nomor Rekening Tujuan : <b>{paymentDetail?.payment_number}</b>
                        </Typography>
                      </>
                    )}
                  </Box>
                </>
              )}
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
