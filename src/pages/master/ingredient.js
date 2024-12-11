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
import TablePagination from '/src/components/table-pagination'

import * as yup from 'yup'

import CryptoJS from 'crypto-js'
import ModalDialog from 'src/components/dialog'
import { format_rupiah, generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** States
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Tambah Ingredient')

  const [valueModal, setValueModal] = useState({
    id_satuan: '0',
    code_bahan: '',
    nama_bahan: '',
    harga: '0',
    stok: 0
  })
  const [data, setData] = useState([])
  const [dataSatuan, setDataSatuan] = useState([])

  // ** Hooks
  const router = useRouter()

  let _loopNumber = 1

  let schemaData = yup.object().shape({
    code_bahan: yup.string().nullable(),
    nama_bahan: yup.string().required('Nama Bahan harus diisi'),
    harga: yup.string().required('Harga harus diisi').typeError('Harga harus diisi'),
    stok: yup.number().required('Stok harus diisi').typeError('Stok harus diisi')
  })

  const getData = async () => {
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
            setData(res?.data)
            setDataSatuan(res?.satuan)
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
    { field: 'code_bahan', headerName: 'Kode Bahan', width: 110 },
    { field: 'nama_bahan', headerName: 'Nama Bahan', width: 350 },
    { field: 'harga', headerName: 'Harga', width: 150, renderCell: params => format_rupiah(params.value) },
    { field: 'stok', headerName: 'Stok', width: 150, renderCell: params => format_rupiah(params.value) },
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
      setTitleModal('Tambah Ingredient')
      setValueModal({
        id_satuan: '0',
        code_bahan: '',
        nama_bahan: '',
        harga: '0',
        stok: 0
      })
    } else {
      setIsAdd(false)
      setTitleModal('Ubah Ingredient')
      setValueModal(_params?.row)
    }

    setOpenModal(true)
  }

  const handleClickDelete = async (_params = {}) => {
    setIsAdd(false)
    const _x = confirm('Anda yakin ingin menghapus Ingredient ' + _params?.row?.nama_bahan + ' ?')
    if (_x) {
      handleSubmit(true, _params?.row)
    }
  }

  const handleSubmit = async (isDelete = false, _rows = {}) => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    const _data = isDelete === true ? _rows : valueModal
    if (_data['harga_tambahan']) {
      _data['harga'] =
        parseInt(_data['harga'].toString().replace(/\,|\./g, '')) +
        parseInt(_data['harga_tambahan'].toString().replace(/\,|\./g, ''))
      delete _data['harga_tambahan']
    }
    if (_data['stok_tambahan']) {
      _data['stok'] =
        parseInt(_data['stok'].toString().replace(/\,|\./g, '')) +
        parseInt(_data['stok_tambahan'].toString().replace(/\,|\./g, ''))
      delete _data['stok_tambahan']
    }
    _data['harga'] = _data['harga'].toString().replace(/\,|\./g, '')
    _data['stok'] = _data['stok'].toString().replace(/\,|\./g, '')

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
            ? '/master/ingredient/create'
            : isDelete === true
            ? '/master/ingredient/delete'
            : '/master/ingredient/update'
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
          body: JSON.stringify(_data)
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setOpenModal(false)
            setIsAdd(true)
            setTitleModal('Tambah Ingredient')
            setValueModal({
              id_satuan: '0',
              code_bahan: '',
              nama_bahan: '',
              harga: '0',
              stok: 0
            })
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
              getRowId={row => row.id_bahan}
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
                          data?.reduce(
                            (total, item) => parseInt(total) + parseInt(item?.harga) * parseInt(item?.stok),
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

      <ModalDialog
        titleModal={titleModal}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handleSubmit()}
      >
        <Box>
          <TextField
            label='Kode Bahan'
            variant='outlined'
            sx={{ mt: 5, textTransform: 'uppercase' }}
            inputProps={{ style: { textTransform: 'uppercase' }, maxLength: 15 }}
            fullWidth
            onChange={e => handleChangeEl('code_bahan', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.code_bahan.toUpperCase()}
            error={errorsField?.code_bahan}
            helperText={errorsField?.code_bahan}
            placeholder='Optional'
          />
        </Box>
        <Box>
          <TextField
            label='Nama Bahan'
            variant='outlined'
            sx={{ mt: 5, textTransform: 'capitalize' }}
            inputProps={{ style: { textTransform: 'capitalize' }, maxLength: 50 }}
            fullWidth
            onChange={e => handleChangeEl('nama_bahan', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.nama_bahan?.charAt(0)?.toUpperCase() + valueModal?.nama_bahan?.slice(1)}
            error={errorsField?.nama_bahan}
            helperText={errorsField?.nama_bahan}
          />
        </Box>
        {!valueModal?.id_bahan && (
          <>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                label='Harga Modal'
                variant='outlined'
                sx={{ mt: 5 }}
                onChange={e => handleChangeEl('harga', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.harga)}
                error={errorsField?.harga}
                helperText={errorsField?.harga}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>Rp</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                label='Stok'
                variant='outlined'
                sx={{ mt: 5 }}
                // fullWidth
                onChange={e => handleChangeEl('stok', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.stok ?? '0')}
                error={errorsField?.stok}
                helperText={errorsField?.stok}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Qty</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
          </>
        )}
        {valueModal?.id_bahan?.length > 0 && (
          <>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                label='Modal Saat Ini'
                variant='outlined'
                sx={{ mt: 5 }}
                disabled
                // onChange={e => handleChangeEl('harga', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.harga)}
                error={errorsField?.harga}
                helperText={errorsField?.harga}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>Rp</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                label='Stok Saat Ini'
                variant='outlined'
                sx={{ mt: 5 }}
                // fullWidth
                // disabled
                onChange={e => handleChangeEl('stok', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.stok)}
                error={errorsField?.stok}
                helperText={errorsField?.stok}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Qty</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                label='Harga Tambahan'
                variant='outlined'
                sx={{ mt: 5 }}
                onChange={e =>
                  handleChangeEl('harga_tambahan', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
                value={format_rupiah(valueModal?.harga_tambahan ?? '0')}
                error={errorsField?.harga_tambahan}
                helperText={errorsField?.harga_tambahan}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>Rp</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                label='Stok Tambahan'
                variant='outlined'
                sx={{ mt: 5 }}
                // fullWidth
                onChange={e =>
                  handleChangeEl('stok_tambahan', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
                value={format_rupiah(valueModal?.stok_tambahan ?? '0')}
                error={errorsField?.stok_tambahan}
                helperText={errorsField?.stok_tambahan}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Qty</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
          </>
        )}
        <Box>
          <InputLabel id='satuan'>Satuan Bahan</InputLabel>
          <Select
            disabled={valueModal?.id_bahan?.length > 0}
            value={valueModal?.id_satuan || ''}
            onChange={e => handleChangeEl('id_satuan', e, valueModal, setValueModal, schemaData, setErrorsField)}
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
