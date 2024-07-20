// ** MUI Imports
import { Button, Divider, IconButton, TextField } from '@mui/material'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { Delete, Edit } from '@mui/icons-material'

// ** React Imports
import { useEffect, useState } from 'react'

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
  const [titleModal, setTitleModal] = useState('Tambah Kategori')
  const [valueModal, setValueModal] = useState({ id_product_category: null, product_category: '' })
  const [data, setData] = useState([])

  // ** Hooks
  const router = useRouter()

  let _loopNumber = 1

  let schemaData = yup.object().shape({
    id_product_category: yup.string(),
    product_category: yup.string().required()
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
          // console.log(res?.auth?.user)
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/master/product/categories'
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
  }, [])

  const columns = [
    { field: 'product_category', headerName: 'Kategori Produk', width: 350 },
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

  const handleClickButton = async (_isAdd = false, _params = {}) => {
    if (_isAdd === true) {
      setIsAdd(true)
      setTitleModal('Tambah Kategori')
      handleChangeEl('product_category', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('id_product_category', null, valueModal, setValueModal, schemaData, setErrorsField)
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
            ? '/master/product/category_create'
            : isDelete === true
            ? '/master/product/category_delete'
            : '/master/product/category_update'
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
            setTitleModal('Tambah Kategori')
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
          <Link>Kategori Produk</Link>
        </Typography>
        <Typography variant='body2'>Semua kategori produk yang tersedia</Typography>
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
            label='Kategori Produk'
            variant='outlined'
            fullWidth
            onChange={e => handleChangeEl('product_category', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.product_category}
            error={errorsField?.product_category}
            helperText={errorsField?.product_category}
          />
        </Box>
      </ModalDialog>
    </Grid>
  )
}

export default MUITable
