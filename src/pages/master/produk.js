// ** MUI Imports
import {
  Backdrop,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
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

import CryptoJS from 'crypto-js'
import { size } from 'lodash'
import ModalDialog from 'src/components/dialog'
import * as yup from 'yup'
import { format_rupiah, generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** States
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(0)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const [titleModal, setTitleModal] = useState('Tambah Produk')
  const [selectedFile, setSelectedFile] = useState()
  const [widthScreen, setWidthScreen] = useState(1100)

  // ** Hooks
  const router = useRouter()

  const [valueModal, setValueModal] = useState({
    id_product: null,
    product_code: '',
    product_name: '',
    product_desc: '',
    product_qty: 0,
    product_price: 0,
    product_status: 1
  })

  let schemaData = yup.object().shape({
    product_code: yup.string().required(),
    product_barcode: yup.string(),
    product_name: yup.string().required(),
    product_desc: yup.string(),
    product_qty: yup.number().min(1).required(),
    product_price: yup.number().min(100).required(),
    product_status: yup.number().required()
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
      headerName: 'Harga',
      width: 120,
      renderCell: params => format_rupiah(params?.value)
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
            setData(res?.data)
            setDataFiltered(res?.data)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
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

  useEffect(() => {
    function handleResize() {
      setWidthScreen(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClickButton = async (_isAdd = false, _params = {}) => {
    if (_isAdd === true) {
      setSelectedFile(null)
      setIsAdd(true)
      setTitleModal('Tambah Produk')
      setValueModal({
        id_product: null,
        product_code: '',
        product_barcode: '',
        product_name: '',
        product_qty: 0,
        product_price: 0,
        product_status: '1'
      })
    } else {
      const _img = _params?.row?.product_image_url ?? _params?.product_image_url
      setSelectedFile(`` + _img)
      setIsAdd(false)
      setTitleModal('Ubah Produk')
      setValueModal(_params?.row ?? _params)
    }

    setOpenModal(true)
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
          dataX.append(itemX, valueModal[itemX])
        })

        // dataX.append('description', externalURL)
        // dataX.append('height', data?.height)
        // dataX.append('width', data?.width)
        // console.log('selectedFile: ')
        // dataX.append('userfile', selectedFile, selectedFile.name)

        if (typeof selectedFile === 'object') {
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
            setData(res?.data)
            setOpenModal(false)
            setIsAdd(false)
            setTitleModal('Tambah Produk')
            handleChangeEl('product_code', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_barcode', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('product_name', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('id_product', null, valueModal, setValueModal, schemaData, setErrorsField)
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

  useEffect(() => {
    if (size(searchProduct) > 0) {
      const _newData = data?.filter(item => {
        if (
          item?.product_name?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
          item?.product_code?.toLowerCase().includes(searchProduct?.toLowerCase()) ||
          item?.product_barcode?.toLowerCase().includes(searchProduct?.toLowerCase())
        ) {
          return item
        }
      })
      setDataFiltered([..._newData])
    } else {
      setDataFiltered([...data])
    }
  }, [searchProduct])

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
        <Box>
          <TextField
            label='Cari Produk di Katalog'
            variant='outlined'
            fullWidth
            size='small'
            sx={{ mb: 1, mt: 5 }}
            onChange={e => setSearchProduct(e.target.value)}
            value={searchProduct}

            // error={errorsField?.product_category}
            // helperText={errorsField?.product_category}
          />
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
                    height='140'
                    image={process.env.NEXT_PUBLIC_API + item?.product_image_url}
                    alt={item?.product_name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h6' component='div' sx={{ fontSize: '16px !important' }}>
                      Rp {format_rupiah(item?.product_price)}
                    </Typography>
                    <Typography noWrap gutterBottom variant='body2' component='div'>
                      Code : {item?.product_code}
                    </Typography>
                    <Typography noWrap variant='h6' sx={{ color: 'text.secondary', fontSize: '16px !important' }}>
                      {item?.product_name}
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
              sx={{ mt: 5 }}
              onChange={e => handleChangeEl('product_name', e, valueModal, setValueModal, schemaData, setErrorsField)}
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
              onChange={e => handleChangeEl('product_price', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={valueModal?.product_price}
              error={errorsField?.product_price}
              helperText={errorsField?.product_price}
            />
          </Box>
          <Box>
            <TextField
              label='Stok Produk'
              variant='outlined'
              size='small'
              sx={{ mt: 5 }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>Qty</InputAdornment>
              }}
              onFocus={e => e.target.select()}
              onChange={e => handleChangeEl('product_qty', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={valueModal?.product_qty}
              error={errorsField?.product_qty}
              helperText={errorsField?.product_qty}
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

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </Grid>
  )
}

export default MUITable
