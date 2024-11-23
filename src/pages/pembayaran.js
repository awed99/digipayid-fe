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
  TextField
} from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { Delete } from '@mui/icons-material'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports

import CryptoJS from 'crypto-js'
import _, { size } from 'lodash'
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
    nama: ''
  })

  let schemaData = yup.object().shape({
    nama: yup.string().min(3).required()
  })

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
          body: JSON.stringify({ id: 0 })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(
            //   _(res?.data)
            //     .groupBy('nama')
            //     .map((value, key) => ({ nama: key, total: _.sumBy(value, 'product_price'), data: value }))
            //     .value()
            // )
            let _id1 = 1
            setData(
              _(res?.data)
                .groupBy('nama')
                .map((value, key, index) => ({
                  id: _id1++,
                  nama: key,
                  total: _.sumBy(value, x => x.product_price * x.product_qty),
                  data: value
                }))
                .value()
            )

            // setData(res?.data)
            let _id2 = 1
            setDataFiltered(
              _(res?.data)
                .groupBy('nama')
                .map((value, key) => ({
                  id: _id2++,
                  nama: key,
                  total: _.sumBy(value, x => x.product_price * x.product_qty),
                  data: value
                }))
                .value()
            )
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
    // function handleResize() {
    //   setWidthScreen(window.innerWidth)
    // }
    // window.addEventListener('resize', handleResize)
    // handleResize()
    // return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClickButton = async (_isAdd = false, nama = '') => {
    router.push('/pembayaran_final?nama=' + nama.toUpperCase())

    return false

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

  const handleClickDelete = async nama => {
    const _x = confirm('Anda yakin ingin membatalkan pesanan a/n ' + nama + ' ?')
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
            body: JSON.stringify({ nama: nama })
          })
            .then(res => res.json())
            .then(res => {
              // console.log(res?.data)
              let _id1 = 1
              setData(
                _(res?.data)
                  .groupBy('nama')
                  .map((value, key, index) => ({
                    id: _id1++,
                    nama: key,
                    total: _.sumBy(value, x => x.product_price * x.product_qty),
                    data: value
                  }))
                  .value()
              )

              // setData(res?.data)
              let _id2 = 1
              setDataFiltered(
                _(res?.data)
                  .groupBy('nama')
                  .map((value, key) => ({
                    id: _id2++,
                    nama: key,
                    total: _.sumBy(value, x => x.product_price * x.product_qty),
                    data: value
                  }))
                  .value()
              )
            })
            .catch(() => false)
        })
    }
  }

  const handleSubmit = async (isDelete = false) => {
    router.push('/pembayaran_final?nama=' + valueModal?.nama.toUpperCase())

    return false

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
        if (item?.nama?.toLowerCase().includes(searchProduct?.toLowerCase())) {
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
          <Link>List Pesanan</Link>
        </Typography>
        <Typography variant='body2'>Semua pesanan yang tersedia</Typography>
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ mr: 3.5, mt: 5 }} onClick={() => setOpenModal(true)}>
            Tambah Pesanan
          </Button>
        </Typography>
        <Box>
          <TextField
            label='Cari Pesanan'
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
                <CardActionArea onClick={() => handleClickButton(false, item?.nama)}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={process.env.NEXT_PUBLIC_API + '/images/logo.png'}
                    alt={item?.nama}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h6' component='div' sx={{ fontSize: '16px !important' }}>
                      Rp {format_rupiah(item?.total)}
                    </Typography>
                    <Typography
                      noWrap
                      gutterBottom
                      variant='h6'
                      component='div'
                      sx={{ fontSize: '16px !important', textTransform: 'uppercase' }}
                    >
                      {item?.nama}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between', pt: 0, pb: 3, mt: -3 }}>
                  <Button size='small' color='primary' onClick={() => handleClickButton(false, item?.nama)}>
                    Detail
                  </Button>
                  <Button size='small' color='error' onClick={() => handleClickDelete(item?.nama)}>
                    <Delete color='error' /> Hapus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <ModalDialog
        titleModal={'Tambah Pesanan Baru'}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handleSubmit()}
        disableButton={errorsField?.nama || valueModal?.nama < 3}
      >
        <Box>
          <Box>
            <TextField
              autoFocus={true}
              label='Nama Pelanggan'
              variant='outlined'
              fullWidth
              size='small'
              sx={{ mt: 5, mb: 5, textTransform: 'uppercase' }}
              onChange={e => handleChangeEl('nama', e, valueModal, setValueModal, schemaData, setErrorsField)}
              value={valueModal?.nama}
              error={errorsField?.nama}
              helperText={errorsField?.nama}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />
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
