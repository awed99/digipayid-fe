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
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Switch,
  TextField
} from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import ModalImage from 'react-modal-image'

import { Close, Delete, Edit, PhotoCamera } from '@mui/icons-material'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'
import TablePagination from '/src/components/table-pagination'

import CryptoJS from 'crypto-js'
import { filter, size, uniqBy } from 'lodash'
import ModalDialog from 'src/components/dialog'
import * as yup from 'yup'
import { format_rupiah, generateSignature, randomString } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [openModalRacik, setOpenModalRacik] = useState(false)
  const [openModalRacikAll, setOpenModalRacikAll] = useState(false)

  // ** States
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [dataRacik, setDataRacik] = useState([])
  const [dataRacikAll, setDataRacikAll] = useState([])
  const [dataStock, setDataStock] = useState([])
  const [dataSatuan, setDataSatuan] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [filterProduct, setFilterProduct] = useState()
  const [productCategories, setProductCategories] = useState([])
  const [productCategoriesSelected, setProductCategoriesSelected] = useState([])
  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(0)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const [searchCategory, setSearchCategory] = useState([])
  const [titleModal, setTitleModal] = useState('Tambah Produk')
  const [selectedFile, setSelectedFile] = useState()

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  // ** Hooks
  const router = useRouter()

  const [valueModal, setValueModal] = useState({
    id_product: null,
    product_code: '',
    product_name: '',
    product_desc: '',
    product_categories: '',
    kode_racik: '',
    product_qty: 0,
    product_price: 0,
    product_hpp: 0,
    product_discount: 0,
    product_status: 1,
    product_is_racikan: false
  })

  const [valueModalRacik, setValueModalRacik] = useState({
    id_racik: null,
    kode_racik: '',
    code_bahan: '0',
    takaran: 0,
    id_satuan: '0',
    status: 1
  })

  let schemaData = yup.object().shape({
    product_code: yup.string().min(1).max(15).required(),
    product_barcode: yup.string().nullable(),
    product_name: yup.string().required(),
    product_desc: yup.string().max(255),
    product_qty: yup.string().min(1),
    product_price: yup.string().required(),
    product_hpp: yup.string(),
    product_discount: yup.string().max(2).required(),
    product_status: yup.number().required(),
    product_is_racikan: yup.boolean()
  })

  let _loopNumber = 1

  const columns = [
    { field: 'product_code', headerName: 'Kode Produk', width: 150 },
    { field: 'product_barcode', headerName: 'Barcode Produk', width: 150 },
    { field: 'product_name', headerName: 'Nama Produk', width: 350 },
    { field: 'product_desc', headerName: 'Keterangan Produk', width: 350 },
    { field: 'product_qty', headerName: 'Stok', width: 100 },

    // { field: 'product_image_url', headerName: 'Image', width: 150 },
    {
      field: 'product_price',
      headerName: 'Harga Jual',
      width: 150,
      renderCell: params => format_rupiah(params?.value)
    },
    {
      field: 'product_price',
      headerName: 'Harga Beli',
      width: 150,
      renderCell: params => format_rupiah(params?.value)
    },
    {
      field: 'product_discount',
      headerName: 'Harga Beli',
      width: 110,
      renderCell: params => params?.value + '%'
    },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 120,
      renderCell: params => <img src={process.env.NEXT_PUBLIC_API + params?.value} width={100} />
    },
    {
      field: 'product_status',
      headerName: 'Status',
      width: 100,
      renderCell: params => (
        <Switch
          checked={params?.value === '1'}
          onChange={async e => {
            setIsAdd(false)
            const _row = params?.row
            _row.product_status = e?.target?.checked === true ? 1 : 0
            setValueModal(_row)
            setTriggerUpdateStatus(triggerUpdateStatus + 1)
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 100,
      renderCell: params => (
        <IconButton aria-label='delete' onClick={() => handleClickButton(false, params)}>
          <Edit color='primary' />
        </IconButton>
      )
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

  const columnsRacik = [
    { field: 'code_bahan', headerName: 'Kode Bahan', width: 110 },
    { field: 'nama_bahan', headerName: 'Nama Bahan', width: 300 },
    {
      field: 'takaran',
      headerName: 'Takaran',
      width: 150,
      renderCell: params => format_rupiah(Math.ceil(params.value)) + ' ' + params?.row?.satuan
    },

    // { field: 'satuan', headerName: 'Satuan', width: 100 },
    {
      field: 'modal',
      headerName: 'Modal Bahan',
      width: 300,
      renderCell: params => 'Rp ' + format_rupiah(Math.ceil(params.value))
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: params => (
        <IconButton
          aria-label='delete'
          onClick={() => {
            const x = confirm('Anda yakin akan menghapus racikan bahan ' + params?.row?.nama_bahan)
            if (x) handleSubmitRacik(params?.row)
          }}
        >
          <Delete color='error' />
        </IconButton>
      )
    }
  ]

  const columnsTotal = [
    { field: 'code_bahan', headerName: 'Kode Bahan', width: 110 },
    { field: 'nama_bahan', headerName: 'Nama Bahan', width: 300 },
    {
      field: 'total_stok',
      headerName: 'Total Stok',
      width: 150,
      renderCell: params => format_rupiah(Math.ceil(params.value))
    },
    { field: 'satuan', headerName: 'Satuan', width: 100 },
    {
      field: 'modal',
      headerName: 'Modal / Satuan',
      width: 300,
      renderCell: params => 'Rp ' + Math.ceil(params.value) + ' /' + params?.row?.satuan
    }
  ]

  const getData = async () => {
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
        const _uri = '/master/product/lists'
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
            setData([...res?.data])
            setDataFiltered([...res?.data])
            setProductCategories([...res?.categories])
            getDataRacikAll()
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const getDataRacikAll = async () => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API}${_uri0}`, {
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
        const _uriIngredient = '/master/ingredient/list'
        const _secretIngredient = await generateSignature(_uriIngredient)

        // Fetch data dari endpoint /master/product/ingredient
        fetch(`${process.env.NEXT_PUBLIC_API}${_uriIngredient}`, {
          method: 'POST',
          headers: {
            'x-signature': _secretIngredient?.signature,
            'x-timestamp': _secretIngredient?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ id: 0 })
        })
          .then(res => res.json())
          .then(async res => {
            const _data = []
            res?.data?.map(item => {
              _data.push({ ...item, satuan: filter(res?.satuan, { id_satuan: item?.id_satuan })[0]?.satuan })
            })
            setDataRacikAll(_data)

            const _dataTotal = []
            res?.data_total?.map(item2 => {
              _dataTotal.push({ ...item2, satuan: filter(res?.satuan, { id_satuan: item2?.id_satuan })[0]?.satuan })
            })
            setDataStock(_dataTotal)

            setDataSatuan(res?.satuan)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const getDataRacik = async () => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API}${_uri0}`, {
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
        const _uriIngredient = '/master/product/list_racik'
        const _secretIngredient = await generateSignature(_uriIngredient)

        // Fetch data dari endpoint /master/product/ingredient
        fetch(`${process.env.NEXT_PUBLIC_API}${_uriIngredient}`, {
          method: 'POST',
          headers: {
            'x-signature': _secretIngredient?.signature,
            'x-timestamp': _secretIngredient?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ kode_racik: valueModal?.kode_racik })
        })
          .then(res => res.json())
          .then(async res => {
            setDataRacik([...res?.data])
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  useEffect(() => {
    getData()
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
    if (triggerUpdateStatus > 0) {
      handleSubmit()
    }
  }, [triggerUpdateStatus])

  const handleClickButton = async (_isAdd = false, _params = {}) => {
    setLoading(true)
    if (_isAdd === true) {
      setSelectedFile(null)
      setIsAdd(true)
      setTitleModal('Tambah Produk')
      setValueModal({
        id_product: null,
        product_code: '',
        product_barcode: '',
        product_name: '',
        product_desc: '',
        product_categories: '',
        kode_racik: 'RACIK-' + randomString(8),
        product_qty: 0,
        product_discount: 0,
        product_price: 0,
        product_status: '1'
      })
      setProductCategoriesSelected([])
    } else {
      // console?.log('_params:', _params)
      const _img = _params?.row?.product_image_url ?? _params?.product_image_url
      setSelectedFile(`` + _img)
      setIsAdd(false)
      setTitleModal('Ubah Produk')

      // console?.log('kode_racik:', _params?.kode_racik)
      if (!_params?.row?.kode_racik && !_params?.kode_racik) {
        _params.kode_racik = 'RACIK-' + randomString(8)
      }
      setValueModal(_params?.row ?? _params)

      const _cats = []

      const _selected = _params?.row?.product_categories ?? _params?.product_categories

      _selected?.split(',')?.forEach(item => {
        _cats.push(filter(productCategories, { product_category: item })[0])
      })
      setProductCategoriesSelected([..._cats])
    }

    setTimeout(() => {
      setOpenModal(true)
      setLoading(false)
    }, 500)
  }

  const handleClickDelete = async (_params = {}) => {
    setIsAdd(false)
    const _row = _params?.row ?? _params
    const _x = confirm('Anda yakin ingin menghapus Produk ' + _row.product_name + ' ?')
    if (_x) {
      handleChangeEl('product_name', _row.product_name, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('id_product', _row.id_product, valueModal, setValueModal, schemaData, setErrorsField)

      handleSubmit(true)
    }
  }

  const handleSubmit = async (isDelete = false) => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    if ((await schemaData.isValid(valueModal)) === false && !isDelete) {
      alert('Mohon lengkapi semua data.')

      return false
    }

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
        const _uri =
          isAdd === true && isDelete === false
            ? '/master/product/create'
            : isDelete === true
            ? '/master/product/delete'
            : '/master/product/update'
        const _secret = await generateSignature(_uri)

        delete valueModal?.selectedFile

        const dataX = new FormData()
        Object.keys(valueModal).forEach(itemX => {
          if (itemX === 'product_price' || itemX === 'product_qty' || itemX === 'product_hpp') {
            dataX.append(itemX, valueModal[itemX]?.replace(/\,|\./g, ''))
          } else {
            dataX.append(itemX, valueModal[itemX])
          }
        })

        dataX.append('product_categories', productCategoriesSelected?.map(item => item?.product_category).join(','))

        if (typeof selectedFile === 'object' && !isDelete) {
          dataX.append('userfile', selectedFile, selectedFile.name)
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

          // body: JSON.stringify(valueModal)
          body: dataX
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setLoading(false)
            setData([...res?.data])
            setDataFiltered([...res?.data])
            setOpenModal(false)
            setIsAdd(false)
            setTitleModal('Tambah Produk')
            handleChangeEl('product_code', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_price', '0', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_barcode', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_name', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_desc', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_discount', '0', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_categories', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('id_product', null, valueModal, setValueModal, schemaData, setErrorsField)
            setProductCategoriesSelected([])
            setSearchProduct('')
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleSubmitRacik = async (isDelete = false) => {
    // console.log('valueModalRacik', valueModalRacik)
    if (
      (valueModalRacik?.takaran == '' ||
        valueModalRacik?.takaran == '0' ||
        valueModalRacik?.takaran == 0 ||
        !filterProduct) &&
      !isDelete
    ) {
      // console.log('valueModalRacik', valueModalRacik)
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Mohon isi takaran dengan benar!'
      })

      return
    }

    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    // if ((await schemaData.isValid(valueModal)) === false && !isDelete) {
    //   alert('Mohon lengkapi semua data.')

    //   return false
    // }

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
        const _uri = isDelete ? '/master/product/delete_racik' : '/master/product/create_racik'
        const _secret = await generateSignature(_uri)
        const _valueModalRacik = isDelete ? isDelete : valueModalRacik
        delete _valueModalRacik?.id_racik
        _valueModalRacik.takaran = _valueModalRacik?.takaran.replace(/\,|\./g, '')

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },

          // body: JSON.stringify(valueModal)
          body: JSON.stringify(_valueModalRacik)
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setLoading(false)
            setDataRacik([...res?.data])
            setOpenModalRacikAll(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleUploadfile = event => {
    if (event?.target?.files[0]) {
      setSelectedFile(event?.target?.files[0])
      handleChangeEl('selectedFile', event?.target?.files[0], valueModal, setValueModal, schemaData, setErrorsField)
    }
  }

  // useEffect(() => {
  //   if (size(searchProduct) > 0) {
  //     const _newData = data?.filter(item => {
  //       if (
  //         item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
  //         item?.product_code?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
  //         item?.product_barcode?.toLowerCase().includes(searchProduct?.toLowerCase())
  //       ) {
  //         return item
  //       }
  //     })
  //     setDataFiltered([..._newData])
  //   } else {
  //     setDataFiltered([...data])
  //   }
  // }, [searchProduct])

  useEffect(() => {
    let _newData = data
    if (size(searchProduct) > 0) {
      _newData = data?.filter(item => {
        if (
          item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
          item?.product_desc?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
          item?.product_code?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
          item?.product_barcode?.toLowerCase().includes(searchProduct?.toLowerCase())
        ) {
          if (size(searchCategory) > 0) {
            return searchCategory?.map(item2 => {
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
    _newData?.map(item => {
      if (size(searchCategory) > 0) {
        searchCategory?.map(item2 => {
          if (item?.product_categories?.toLowerCase().includes(item2?.product_category?.toLowerCase())) {
            _newData2.push(item)
          }
        })
      } else {
        _newData2.push(item)
      }
    })

    setDataFiltered([..._newData2])
  }, [searchProduct, searchCategory])

  useEffect(() => {
    if (!openModal) {
      // handleChangeEl('kode_racik', 'RACIK-' + randomString(8), valueModal, setValueModal, schemaData, setErrorsField)
      setDataRacik([])
    }
  }, [openModal])

  useEffect(() => {
    getDataRacik()
    if (openModalRacik || openModalRacikAll) {
      setFilterProduct(null)
    }
    if (!openModalRacik && valueModal?.product_is_racikan === '1') {
      const totalModal = dataRacik?.reduce((total, item) => parseInt(total) + Math.ceil(item?.modal), 0)

      handleChangeEl('product_hpp', totalModal.toString(), valueModal, setValueModal, schemaData, setErrorsField)
    }
  }, [openModalRacik, openModalRacikAll])

  useEffect(() => {
    // console.log('filterProduct', filterProduct)
    if (filterProduct) {
      handleChangeEl(
        'kode_racik',
        valueModal?.kode_racik,
        valueModalRacik,
        setValueModalRacik,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'code_bahan',
        filterProduct?.code_bahan?.toUpperCase(),
        valueModalRacik,
        setValueModalRacik,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'nama_bahan',
        filterProduct?.nama_bahan,
        valueModalRacik,
        setValueModalRacik,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'id_satuan',
        filterProduct?.id_satuan,
        valueModalRacik,
        setValueModalRacik,
        schemaData,
        setErrorsField
      )
      handleChangeEl('takaran', 0, valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
    } else {
      handleChangeEl('code_bahan', '', valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
      handleChangeEl('nama_bahan', '', valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
      handleChangeEl('id_satuan', '', valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
      handleChangeEl('takaran', 0, valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
    }
  }, [filterProduct])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Produk</Link>
        </Typography>
        <Typography variant='body2'>Semua produk yang tersedia</Typography>
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ mr: 3.5, mt: 5 }} onClick={() => handleClickButton(true)}>
            Tambah
          </Button>
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: '100%' }}>
                <TextField
                  label='Cari Produk di Katalog'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1, mt: 5 }}
                  onChange={e => setSearchProduct(e.target.value)}
                  value={searchProduct}

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
                  sx={{ mt: 5, textTransform: 'capitalize' }}
                  options={productCategories}
                  getOptionLabel={option => option?.product_category}
                  onChange={(e, v) => setSearchCategory(v)}
                  value={searchCategory}
                  renderInput={params => (
                    <TextField {...params} variant='outlined' label='Kategori Produk' placeholder='Kategori Produk' />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ width: '100%', overflow: 'auto', m: 5, mr: '0px' }}>
        <Grid container spacing={2}>
          {dataFiltered?.map((item, index) => (
            <Grid key={index} item xs={6} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 'auto',
                  p: {
                    xs: 2,
                    sm: 3
                  },
                  maxWidth: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <CardActionArea onClick={() => handleClickButton(false, item)}>
                  <CardMedia
                    component='img'
                    height='250'
                    image={process.env.NEXT_PUBLIC_API + item?.product_image_url}
                    alt={item?.product_name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h6' component='div' sx={{ fontSize: '16px !important' }}>
                      Rp {format_rupiah(item?.product_price)}
                    </Typography>
                    <Typography noWrap gutterBottom variant='body2' component='div'>
                      Code : {item?.product_code} - Disc : {item?.product_discount}%
                    </Typography>
                    <Typography noWrap variant='h6' sx={{ color: 'text.secondary', fontSize: '16px !important' }}>
                      {item?.product_name}
                    </Typography>
                    <Divider />
                    <Typography noWrap sx={{ color: 'text.secondary', fontSize: '12px !important' }}>
                      {item?.product_desc ?? '-'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between', pt: 0, pb: 3, mt: -3 }}>
                  <Button size='small' color='primary' onClick={() => handleClickButton(false, item)}>
                    {item?.product_status === '1' ? 'Tersedia' : 'Tidak Tersedia'}
                  </Button>
                  <Button size='small' color='error' onClick={() => handleClickDelete(item)}>
                    <Delete color='error' /> Hapus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ display: 'none' }} />

      <Grid item xs={12} sx={{ display: 'none' }}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              getRowId={row => row.id_product}
              columns={columns}
              slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
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
        titleModal={titleModal}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handleSubmit()}
      >
        <Box>
          <Box>
            <TextField
              label='Kode Produk'
              variant='outlined'
              fullWidth
              size='small'
              onChange={e => handleChangeEl('product_code', e, valueModal, setValueModal, schemaData, setErrorsField)}
              inputProps={{ style: { textTransform: 'uppercase' } }}
              value={valueModal?.product_code}
              error={errorsField?.product_code}
              helperText={errorsField?.product_code}
            />
          </Box>
          <Box>
            <TextField
              label='Barcode Produk'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 5 }}
              onChange={e =>
                handleChangeEl('product_barcode', e, valueModal, setValueModal, schemaData, setErrorsField)
              }
              value={valueModal?.product_barcode}
              error={errorsField?.product_barcode}
              helperText={errorsField?.product_barcode}
            />
          </Box>
          <Box>
            <TextField
              label='Nama Produk'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 5, textTransform: 'capitalize' }}
              onChange={e => handleChangeEl('product_name', e, valueModal, setValueModal, schemaData, setErrorsField)}
              inputProps={{ style: { textTransform: 'capitalize' } }}
              value={valueModal?.product_name}
              error={errorsField?.product_name}
              helperText={errorsField?.product_name}
            />
          </Box>
          <Box>
            <TextField
              label='Keterangan Produk'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 5 }}
              onChange={e => handleChangeEl('product_desc', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={valueModal?.product_desc}
              error={errorsField?.product_desc}
              helperText={errorsField?.product_desc}
              filterSelectedOptions
              multiline
              maxRows={4}
              rows={3}
            />
          </Box>
          <Box>
            <Autocomplete
              multiple
              variant='outlined'
              id='categories'
              sx={{ mt: 5, textTransform: 'capitalize' }}
              options={productCategories}
              getOptionLabel={option => option?.product_category}
              onChange={(e, v) => setProductCategoriesSelected(v)}
              value={productCategoriesSelected}
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Kategori Produk' placeholder='Kategori Produk' />
              )}
            />
          </Box>
          <Box>
            <TextField
              onBlur={e =>
                e?.target?.value == ''
                  ? handleChangeEl('product_price', '0', valueModal, setValueModal, schemaData, setErrorsField)
                  : handleChangeEl('product_price', e, valueModal, setValueModal, schemaData, setErrorsField)
              }
              label='Harga Jual Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 5 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>,
                inputMode: 'numeric'
              }}
              onFocus={e => e.target.select()}
              onChange={e => handleChangeEl('product_price', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={format_rupiah(valueModal?.product_price)}
              error={errorsField?.product_price}
              helperText={errorsField?.product_price}
            />
          </Box>
          <Box>
            <TextField
              onBlur={e =>
                e?.target?.value == ''
                  ? handleChangeEl('product_discount', '0', valueModal, setValueModal, schemaData, setErrorsField)
                  : handleChangeEl('product_discount', e, valueModal, setValueModal, schemaData, setErrorsField)
              }
              size='small'
              sx={{ mt: 5 }}
              id='product_discount'
              name='product_discount'
              label='Diskon Produk'
              variant='outlined'
              autoComplete={false}
              onChange={e =>
                handleChangeEl('product_discount', e, valueModal, setValueModal, schemaData, setErrorsField)
              }
              value={format_rupiah(valueModal?.product_discount)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                inputMode: 'numeric'
              }}
              onFocus={e => e?.target?.select()}
              error={errorsField?.product_discount}
              helperText={errorsField?.product_discount}
              inputProps={{
                autoComplete: 'new-password'
              }}
            />
          </Box>
          <Box>
            <TextField
              onBlur={e =>
                e?.target?.value == ''
                  ? handleChangeEl('product_qty', '0', valueModal, setValueModal, schemaData, setErrorsField)
                  : handleChangeEl('product_qty', e, valueModal, setValueModal, schemaData, setErrorsField)
              }
              label='Stok Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 5 }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>Qty</InputAdornment>
              }}
              onFocus={e => e.target.select()}
              onChange={e => handleChangeEl('product_qty', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={format_rupiah(valueModal?.product_qty)}
              error={errorsField?.product_qty}
              helperText={errorsField?.product_qty}
            />
          </Box>
          <Box>
            <FormControlLabel
              sx={{ mt: 5 }}
              control={
                <Checkbox
                  checked={valueModal?.product_is_racikan === '1'}
                  onChange={e =>
                    handleChangeEl(
                      'product_is_racikan',
                      e?.target?.checked ? '1' : '0',
                      valueModal,
                      setValueModal,
                      schemaData,
                      setErrorsField
                    )
                  }
                />
              }
              label='Gunakan Racikan Bahan / Modal ?'
            />
          </Box>
          {valueModal?.product_is_racikan === '1' && (
            <Box>
              <Button variant='contained' color={'warning'} sx={{ mt: 5 }} onClick={() => setOpenModalRacik(true)}>
                Buka Racikan {valueModal?.product_name}
              </Button>
            </Box>
          )}
          <Box>
            <TextField
              onBlur={e =>
                e?.target?.value == ''
                  ? handleChangeEl('product_hpp', '0', valueModal, setValueModal, schemaData, setErrorsField)
                  : handleChangeEl('product_hpp', e, valueModal, setValueModal, schemaData, setErrorsField)
              }
              label='Harga Beli Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 5 }}
              InputProps={{
                startAdornment: <InputAdornment position='start'>IDR</InputAdornment>,
                inputMode: 'numeric'
              }}
              disabled={valueModal?.product_is_racikan === '1'}
              onFocus={e => e.target.select()}
              onChange={e => handleChangeEl('product_hpp', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={format_rupiah(valueModal?.product_hpp ?? 0)}
              error={errorsField?.product_hpp}
              helperText={errorsField?.product_hpp}
            />
          </Box>
          <FormControlLabel
            required
            control={
              <Switch
                size='medium'
                label='Status Produk'
                sx={{ mt: 5 }}
                checked={valueModal?.product_status === '1'}
                onChange={e =>
                  handleChangeEl(
                    'product_status',
                    e?.target?.checked === true ? '1' : '0',
                    valueModal,
                    setValueModal,
                    schemaData,
                    setErrorsField
                  )
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Status Produk'
          />
          <Box sx={{ mt: 5 }}>
            {!selectedFile && (
              <IconButton color='primary' aria-label='upload picture' component='label'>
                <input
                  hidden
                  accept='image/jpeg, image/jpg, image/png, image/svg+xml'
                  type='file'
                  onChange={e => handleUploadfile(e)}
                />
                <PhotoCamera />
              </IconButton>
            )}
            {selectedFile && (
              <>
                <ModalImage
                  small={
                    typeof selectedFile === 'object'
                      ? window?.URL?.createObjectURL(selectedFile)
                      : process.env.NEXT_PUBLIC_API + selectedFile
                  }
                  large={
                    typeof selectedFile === 'object'
                      ? window?.URL?.createObjectURL(selectedFile)
                      : process.env.NEXT_PUBLIC_API + selectedFile
                  }
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
        titleModal={'Racikan ' + valueModal?.product_name + ' (' + valueModal?.kode_racik + ')'}
        openModal={openModalRacik}
        setOpenModal={setOpenModalRacik}
        handleSubmitFunction={() => setOpenModalRacik(false)}
        size='lg'
      >
        <Box>
          <Box sx={{ mb: 2 }}>
            <Button
              variant='contained'
              size='small'
              sx={{ marginRight: 3.5 }}
              onClick={() => setOpenModalRacikAll(true)}
            >
              Tambah / Ubah Racikan
            </Button>
          </Box>
          <DataGrid
            density={'compact'}
            autoHeight
            rows={dataRacik}
            columns={columnsRacik}
            getRowId={row => row.code_bahan}
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
                      Total Modal : IDR &nbsp;
                      {format_rupiah(dataRacik?.reduce((total, item) => parseInt(total) + Math.ceil(item?.modal), 0))}
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
      </ModalDialog>

      <ModalDialog
        titleModal={'Tambah / Ubah Satu (1) Bahan / Modal Produk'}
        openModal={openModalRacikAll}
        setOpenModal={setOpenModalRacikAll}
        handleSubmitFunction={() => handleSubmitRacik(false)}
        size='lg'
      >
        <Box>
          <Box>
            <Autocomplete
              sx={{ mt: 5, textTransform: 'uppercase' }}
              onChange={(e, x) => setFilterProduct(x)}
              value={filterProduct}
              id='combo-box-demo'
              options={uniqBy(dataStock, item => item?.code_bahan)?.map(item => ({
                ...item,
                label: item?.code_bahan + ' - ' + item?.nama_bahan
              }))}
              style={{ width: 300 }}
              renderInput={params => <TextField {...params} label='Cari Bahan Yang Sudah Ada' variant='outlined' />}

              // open={valueModal?.code_bahan?.length > 0}
            />
          </Box>
          <Box>
            <TextField
              onFocus={e => e?.target?.select()}
              onBlur={e =>
                e?.target?.value == ''
                  ? handleChangeEl('takaran', 0, valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
                  : handleChangeEl('takaran', e, valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
              }
              label='Qty Racik'
              variant='outlined'
              sx={{ mt: 5 }}
              onChange={e =>
                handleChangeEl('takaran', e, valueModalRacik, setValueModalRacik, schemaData, setErrorsField)
              }
              value={format_rupiah(valueModalRacik?.takaran ?? 0)}
              error={errorsField?.takaran}
              helperText={errorsField?.takaran}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {filter(dataSatuan, ['id_satuan', valueModalRacik?.id_satuan])[0]?.satuan}
                  </InputAdornment>
                ),
                inputMode: 'numeric'
              }}
            />
          </Box>
          <Box sx={{ mt: 5 }}>
            <Button variant='contained' onClick={() => handleSubmitRacik(false)}>
              Submit
            </Button>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Divider>Tabel Stok / Bahan / Modal</Divider>
          </Box>
          <Box sx={{ mt: 5 }}>
            <DataGrid
              density={'compact'}
              autoHeight
              rows={dataStock}
              columns={columnsTotal}
              getRowId={row => row.code_bahan}
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
                        Total Modal : IDR &nbsp;
                        {format_rupiah(
                          dataRacikAll?.reduce(
                            (total, item) =>
                              parseInt(total) + parseInt(item?.harga_credit) - parseInt(item?.harga_debet),
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
        </Box>
      </ModalDialog>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>

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
    </Grid>
  )
}

export default MUITable
