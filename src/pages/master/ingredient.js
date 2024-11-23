// ** MUI Imports
import { Button, Divider, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { Delete, Edit } from '@mui/icons-material'

// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

import * as yup from 'yup'

import CryptoJS from 'crypto-js'
import ModalDialog from 'src/components/dialog'
import { generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** States
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Tambah Ingridient')
  const [valueModal, setValueModal] = useState({
    nama_bahan: '',
    harga: '',
    stok: '',
    satuan: '',
    code_bahan: ''
  })
  const [data, setData] = useState([])
  const [dataSatuan, setDataSatuan] = useState([])

  // ** Hooks
  const router = useRouter()

  let _loopNumber = 1

  let schemaData = yup.object().shape({
    nama_bahan: yup.string().required('Nama Bahan harus diisi'),
    harga: yup.number().required('Harga harus diisi').typeError('Harga harus diisi'),
    satuan: yup.string().required(),
    stok: yup.number().required('Stok harus diisi').typeError('Stok harus diisi'),
    code_bahan: yup.string().nullable()
  })

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
          router.push('/auth')
          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uriIngredient = '/master/product/ingredient'
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
            setData(res?.data)

            // Setelah berhasil mendapatkan data ingredient, ambil data dari /master/user/master_satuan
            const _uriSatuan = '/master/user/master_satuan'
            const _secretSatuan = await generateSignature(_uriSatuan)

            fetch(`${process.env.NEXT_PUBLIC_API}${_uriSatuan}`, {
              method: 'POST',
              headers: {
                'x-signature': _secretSatuan?.signature,
                'x-timestamp': _secretSatuan?.timestamp,
                Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
                  .toString(CryptoJS.enc.Utf8)
                  .replace(/\"/g, '')
              },
              body: JSON.stringify({ id: 0 })
            })
              .then(res => res.json())
              .then(res => {
                setDataSatuan(res?.data) // Simpan data satuan
              })
              .catch(() => false)
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
      router.push('/auth')
    }
  }, [])

  const columns = [
    { field: 'nama_bahan', headerName: 'Nama Bahan', width: 350 },
    { field: 'harga', headerName: 'Harga', width: 350 },
    { field: 'stok', headerName: 'Stok', width: 350 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: params => <Chip label={'Aktif'} color='primary' />
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
  ]

  const handleClickButton = async (_isAdd = false, _params = {}) => {
    if (_isAdd === true) {
      setIsAdd(true)
      setTitleModal('Tambah Ingridient')
      handleChangeEl('satuan_bahan', '', valueModal, setValueModal, schemaData, setErrorsField)
    } else {
      setIsAdd(false)
      setTitleModal('Ubah Kategori')
      handleChangeEl(
        'product_category',
        _params?.row?.product_category,
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'id_product_category',
        _params?.row?.id_product_category,
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
    }

    setOpenModal(true)
  }

  const handleClickDelete = async (_params = {}) => {
    setIsAdd(false)
    const _x = confirm('Anda yakin ingin menghapus Kategori ' + _params?.row?.product_category + ' ?')
    if (_x) {
      handleChangeEl(
        'product_category',
        _params?.row?.product_category,
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'id_product_category',
        _params?.row?.id_product_category,
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )

      handleSubmit(true)
    }
  }

  const handleSubmit = async (isDelete = false) => {
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
        const _uri =
          isAdd === true && isDelete === false
            ? '/master/product/ingredient_create'
            : isDelete === true
            ? '/master/product/ingredient_delete'
            : '/master/product/ingredient_update'
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
          body: JSON.stringify(valueModal)
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setOpenModal(false)
            setIsAdd(true)
            setTitleModal('Tambah Ingridient')
            handleChangeEl('product_category', '', valueModal, setValueModal, schemaData, setErrorsField)
            handleChangeEl('id_product_category', null, valueModal, setValueModal, schemaData, setErrorsField)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Ingredient</Link>
        </Typography>
        <Typography variant='body2'>Semua kategori ingredient yang tersedia</Typography>
        <Divider />
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ marginRight: 3.5 }} onClick={() => handleClickButton(true)}>
            Tambah
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              columns={columns}
              getRowId={row => row.id_product_category}
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
          <TextField
            label='Nama Bahan'
            variant='outlined'
            sx={{ mt: 5 }}
            fullWidth
            onChange={e => handleChangeEl('nama_bahan', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.nama_bahan}
            error={errorsField?.nama_bahan}
            helperText={errorsField?.nama_bahan}
            inputProps={{
              maxLength: 50 // misalnya, batas maksimal 50 karakter
            }}
          />
        </Box>
        <Box>
          <TextField
            label='Kode Bahan'
            variant='outlined'
            sx={{ mt: 5 }}
            fullWidth
            onChange={e => handleChangeEl('code_bahan', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.code_bahan}
            error={errorsField?.code_bahan}
            helperText={errorsField?.code_bahan}
            placeholder='Optional'
          />
        </Box>
        <Box>
          <TextField
            label='Harga'
            variant='outlined'
            sx={{ mt: 5 }}
            fullWidth
            onChange={e => handleChangeEl('harga', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.harga}
            error={errorsField?.harga}
            helperText={errorsField?.harga}
            type='number'
            InputProps={{
              startAdornment: <InputAdornment position='start'>Rp</InputAdornment>
            }}
          />
        </Box>
        <Box>
          <TextField
            label='Stok'
            variant='outlined'
            sx={{ mt: 5 }}
            fullWidth
            onChange={e => handleChangeEl('stok', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.stok}
            error={errorsField?.stok}
            helperText={errorsField?.stok}
            type='number'
            InputProps={{
              endAdornment: <InputAdornment position='end'>Qty</InputAdornment>
            }}
          />
        </Box>
        <Box>
          <InputLabel id='demo-simple-select-label'>Satuan Bahan</InputLabel>
          <Select
            fullWidth
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={valueModal?.satuan_bahan || ''}
            label='Satuan Bahan'
            onChange={e => handleChangeEl('satuan_bahan', e, valueModal, setValueModal, schemaData, setErrorsField)}
          >
            {dataSatuan?.map(item => (
              <MenuItem key={item?.id_satuan} value={item?.id_satuan}>
                {item?.satuan}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </ModalDialog>
    </Grid>
  )
}

export default MUITable
