// ** MUI Imports
import { Delete } from '@mui/icons-material'
import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  TextField
} from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

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
import { filter, isNaN, size, uniqBy } from 'lodash'
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
  const [filterProduct, setFilterProduct] = useState()
  const [titleModal, setTitleModal] = useState('Operasional Stok')
  const [tabValue, setTabValue] = useState(0)
  const [typeInput, setTypeInput] = useState(1)

  const [valueModal, setValueModal] = useState({
    id_satuan: '0',
    code_bahan: '',
    nama_bahan: '',
    harga_credit: '0',
    stok_credit: 0,
    harga_debet: '0',
    stok_debet: 0,
    modal_avg: 0,
    keterangan: '',
    is_stok: true
  })
  const [data, setData] = useState([])
  const [dataStock, setDataStock] = useState([])
  const [dataSatuan, setDataSatuan] = useState([])

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  // ** Hooks
  const router = useRouter()

  let _loopNumber = 1

  let schemaData = yup.object().shape({
    code_bahan: yup.string().required('Kode Bahan harus diisi'),
    nama_bahan: yup.string().required('Nama Bahan harus diisi'),
    harga_credit: yup.string().required('Harga harus diisi').typeError('Harga harus diisi'),
    stok_credit: yup.number().required('Stok harus diisi').typeError('Stok harus diisi'),
    harga_debet: yup.string().required('Harga harus diisi').typeError('Harga harus diisi'),
    stok_debet: yup.number().required('Stok harus diisi').typeError('Stok harus diisi')
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
            const _data = []
            res?.data?.map(item => {
              _data.push({ ...item, satuan: filter(res?.satuan, { id_satuan: item?.id_satuan })[0]?.satuan })
            })
            setData(_data)

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
    { field: 'nama_bahan', headerName: 'Nama Bahan', width: 300 },
    {
      field: 'harga_credit',
      headerName: 'Harga Beli',
      width: 150,
      renderCell: params => format_rupiah(params.value)
    },
    {
      field: 'harga_debet',
      headerName: 'Biaya Debet',
      width: 150,
      renderCell: params => format_rupiah(params.value)
    },
    { field: 'stok_credit', headerName: 'Stok Masuk', width: 150, renderCell: params => format_rupiah(params.value) },
    ,
    { field: 'stok_debet', headerName: 'Stok Keluar', width: 150, renderCell: params => format_rupiah(params.value) },
    { field: 'satuan', headerName: 'Satuan', width: 100, renderCell: params => params.value },

    // { field: 'harga_debet', headerName: 'Harga Debet', width: 150, renderCell: params => format_rupiah(params.value) },
    {
      field: 'modal_avg',
      headerName: 'Modal / Satuan',
      width: 150,
      renderCell: params => 'Rp ' + format_rupiah(Math.ceil(params.value)) + ' /' + params?.row?.satuan
    },
    { field: 'keterangan', headerName: 'Keterangan', width: 200 },

    // {
    //   field: 'update',
    //   headerName: 'Update',
    //   width: 100,
    //   renderCell: params => (
    //     <IconButton aria-label='delete' onClick={() => handleClickButton(false, params)}>
    //       <Edit color='primary' />
    //     </IconButton>
    //   )
    // }

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

  const handleClickButton = async _typeInput => {
    // if (_isAdd === true) {
    setIsAdd(true)
    setTitleModal(_typeInput == 1 ? 'Operasional Penambahan Stok' : 'Operasional Pengurangan Stok')
    setValueModal({
      id_satuan: '0',
      code_bahan: '',
      nama_bahan: '',
      harga_credit: '0',
      stok_credit: 0,
      harga_debet: '0',
      stok_debet: 0,
      keterangan: '',
      is_stok: true
    })
    setTypeInput(_typeInput)

    // } else {
    //   setIsAdd(false)
    //   setTitleModal('Ubah Ingredient')
    //   setValueModal(_params?.row)
    // }

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

    if (size(errorsField) > 0 && isAdd === true && isDelete === false) {
      // console.log('errorsField', errorsField)
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'isi data yang kosong!'
      })

      return
    }

    const _data = isDelete === true ? _rows : valueModal
    if (_data['harga_tambahan']) {
      _data['harga'] =
        parseInt(_data['harga']?.toString().replace(/\,|\./g, '')) +
        parseInt(_data['harga_tambahan']?.toString().replace(/\,|\./g, ''))
      delete _data['harga_tambahan']
    }
    if (_data['stok_tambahan']) {
      _data['stok'] =
        parseInt(_data['stok']?.toString().replace(/\,|\./g, '')) +
        parseInt(_data['stok_tambahan']?.toString().replace(/\,|\./g, ''))
      delete _data['stok_tambahan']
    }
    _data['harga'] = _data['harga']?.toString().replace(/\,|\./g, '')
    _data['stok'] = _data['stok']?.toString().replace(/\,|\./g, '')

    _data['harga_credit'] = parseInt(_data['harga_credit']?.toString().replace(/\,|\./g, '')) ?? 0
    _data['stok_credit'] = parseInt(_data['stok_credit']?.toString().replace(/\,|\./g, '')) ?? 0

    _data['harga_debet'] = parseInt(_data['harga_debet']?.toString().replace(/\,|\./g, '')) ?? 0
    _data['stok_debet'] = parseInt(_data['stok_debet']?.toString().replace(/\,|\./g, '')) ?? 0

    _data['modal_avg'] = isNaN(parseInt(_data['harga_credit'] / _data['stok_credit']))
      ? 0
      : parseInt(_data['harga_credit'] / _data['stok_credit'])

    // console.log(_data)

    // return

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

        // const _uri = '/master/ingredient/create'
        const _secret = await generateSignature(_uri)

        delete _data?.satuan

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
            const _data = []
            res?.data?.map(item => {
              _data.push({ ...item, satuan: filter(dataSatuan, { id_satuan: item?.id_satuan })[0]?.satuan })
            })
            setData(_data)

            const _dataTotal = []
            res?.data_total?.map(item2 => {
              _dataTotal.push({ ...item2, satuan: filter(dataSatuan, { id_satuan: item2?.id_satuan })[0]?.satuan })
            })
            setDataStock(_dataTotal)

            setDataSatuan(res?.satuan)

            setOpenModal(false)
            setIsAdd(true)
            setTabValue(1)

            // setTitleModal('Tambah Ingredient')
            setValueModal({
              id_satuan: '0',
              code_bahan: '',
              nama_bahan: '',
              harga_credit: '0',
              stok_credit: 0,
              harga_debet: '0',
              stok_debet: 0,
              modal_avg: 0,
              keterangan: '',
              is_stok: true
            })
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
  }

  useEffect(() => {
    // console.log('filterProduct', filterProduct)
    if (filterProduct) {
      handleChangeEl(
        'code_bahan',
        filterProduct?.code_bahan?.toUpperCase(),
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl('nama_bahan', filterProduct?.nama_bahan, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('id_satuan', filterProduct?.id_satuan, valueModal, setValueModal, schemaData, setErrorsField)
    }
  }, [filterProduct])

  useEffect(() => {
    // console.log('openModal', openModal)
    if (!openModal) {
      setFilterProduct(null)
      handleChangeEl('code_bahan', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('nama_bahan', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('harga_credit', '0', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('harga_debet', '0', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('stok_credit', '0', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('stok_debet', '0', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('id_satuan', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('modal_avg', 0, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('is_stok', true, valueModal, setValueModal, schemaData, setErrorsField)
    }
  }, [openModal])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='#'>Ingredient / Stock Opname</Link>
        </Typography>
        <Typography variant='body2'>Semua kategori ingredient yang tersedia</Typography>
        <Divider />
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ marginRight: 3.5 }} onClick={() => handleClickButton(1)}>
            Penambahan Stok
          </Button>{' '}
          &emsp;{' '}
          <Button
            variant='contained'
            color='warning'
            size='small'
            sx={{ marginRight: 3.5 }}
            onClick={() => handleClickButton(2)}
          >
            Pengurangan Stok
          </Button>
        </Typography>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', ml: 10, mt: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label='basic tabs example'>
          <Tab label='Total Stok' {...a11yProps(0)} />
          <Tab label='Jurnal Stok' {...a11yProps(1)} />
        </Tabs>
      </Box>

      <Box sx={{ width: '100%' }}>
        <CustomTabPanel value={tabValue} index={0}>
          <Grid item xs={12}>
            <Card>
              <Box sx={{ width: '100%', overflow: 'auto' }}>
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
                              data?.reduce(
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
            </Card>
          </Grid>
        </CustomTabPanel>
      </Box>

      <Box sx={{ width: '100%' }}>
        <CustomTabPanel value={tabValue} index={1}>
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
                              data?.reduce((total, item) => parseInt(total) + parseInt(item?.harga_credit), 0)
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
        </CustomTabPanel>
      </Box>
      <ModalDialog
        titleModal={titleModal}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => handleSubmit()}
      >
        <Box>
          <InputLabel id='satuan'>Jenis Input</InputLabel>
          <Select value={typeInput} onChange={e => setTypeInput(e?.target?.value)}>
            <MenuItem value={1}>Penambahan Stok</MenuItem>
            <MenuItem value={2}>Pengurangan Stok</MenuItem>
          </Select>
        </Box>
        <Box>
          <Autocomplete
            sx={{ mt: 5, textTransform: 'uppercase' }}
            onChange={(e, x) => setFilterProduct(x)}
            value={filterProduct}
            id='combo-box-demo'
            options={uniqBy(data, item => item?.code_bahan)?.map(item => ({
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
            label='Kode Bahan'
            variant='outlined'
            sx={{ mt: 5, textTransform: 'uppercase' }}
            inputProps={{ style: { textTransform: 'uppercase' }, maxLength: 15 }}
            // fullWidth
            onChange={e => handleChangeEl('code_bahan', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.code_bahan?.toUpperCase()}
            error={errorsField?.code_bahan}
            helperText={errorsField?.code_bahan}
            placeholder='Kode Bahan'
            disabled={typeInput === 2 || filterProduct}
          />
        </Box>
        <Box>
          <TextField
            onFocus={e => e?.target?.select()}
            label='Nama Bahan'
            variant='outlined'
            sx={{ mt: 5, textTransform: 'capitalize' }}
            inputProps={{ style: { textTransform: 'capitalize' }, maxLength: 50 }}
            fullWidth
            onChange={e =>
              handleChangeEl(
                'nama_bahan',
                e?.target?.value ?? '',
                valueModal,
                setValueModal,
                schemaData,
                setErrorsField
              )
            }
            value={valueModal?.nama_bahan?.charAt(0)?.toUpperCase() + valueModal?.nama_bahan?.slice(1)}
            error={errorsField?.nama_bahan}
            helperText={errorsField?.nama_bahan}
            disabled={typeInput === 2 || filterProduct}
          />
        </Box>
        {typeInput === 1 ? (
          <>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                onBlur={e =>
                  e?.target?.value == ''
                    ? handleChangeEl('harga_credit', '0', valueModal, setValueModal, schemaData, setErrorsField)
                    : handleChangeEl('harga_credit', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
                label='Harga Beli'
                variant='outlined'
                sx={{ mt: 5 }}
                onChange={e => handleChangeEl('harga_credit', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.harga_credit)}
                error={errorsField?.harga}
                helperText={errorsField?.harga}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>Rp</InputAdornment>,
                  inputMode: 'numeric'
                }}
              />
            </Box>
            {!filterProduct && (
              <Box>
                <InputLabel id='satuan'>Satuan Bahan</InputLabel>
                <Select
                  disabled={valueModal?.id_bahan?.length > 0 || filterProduct || typeInput === 2}
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
            )}
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                onBlur={e =>
                  e?.target?.value == ''
                    ? handleChangeEl('stok_credit', '0', valueModal, setValueModal, schemaData, setErrorsField)
                    : handleChangeEl('stok_credit', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
                label='Stok Masuk'
                variant='outlined'
                sx={{ mt: 5 }}
                // fullWidth
                onChange={e => handleChangeEl('stok_credit', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.stok_credit ?? '0')}
                error={errorsField?.stok}
                helperText={errorsField?.stok}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {filter(dataSatuan, ['id_satuan', valueModal?.id_satuan])[0]?.satuan}
                    </InputAdornment>
                  ),
                  inputMode: 'numeric'
                }}
              />
            </Box>
          </>
        ) : (
          <>
            <Box>
              <TextField
                onFocus={e => e?.target?.select()}
                onBlur={e =>
                  e?.target?.value == ''
                    ? handleChangeEl('harga_debet', '0', valueModal, setValueModal, schemaData, setErrorsField)
                    : handleChangeEl('harga_debet', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
                label='Biaya Tambahan'
                variant='outlined'
                sx={{ mt: 5 }}
                onChange={e => handleChangeEl('harga_debet', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.harga_debet)}
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
                onBlur={e =>
                  e?.target?.value == ''
                    ? handleChangeEl('stok_debet', '0', valueModal, setValueModal, schemaData, setErrorsField)
                    : handleChangeEl('stok_debet', e, valueModal, setValueModal, schemaData, setErrorsField)
                }
                label='Stok Keluar'
                variant='outlined'
                sx={{ mt: 5 }}
                onChange={e => handleChangeEl('stok_debet', e, valueModal, setValueModal, schemaData, setErrorsField)}
                value={format_rupiah(valueModal?.stok_debet ?? '0')}
                error={errorsField?.stok}
                helperText={errorsField?.stok}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {filter(dataSatuan, ['id_satuan', valueModal?.id_satuan])[0]?.satuan}
                    </InputAdornment>
                  ),
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
          <TextField
            onFocus={e => e?.target?.select()}
            label='Keterangan'
            variant='outlined'
            sx={{ mt: 5 }}
            fullWidth
            onChange={e => handleChangeEl('keterangan', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.keterangan ?? '0'}
            error={errorsField?.keterangan}
            helperText={errorsField?.keterangan}
          />
        </Box>
        <Box>
          <FormLabel component='legend'>Apakah produk ini masuk stok barang?</FormLabel>
          <Switch
            checked={valueModal?.is_stok}
            onChange={e =>
              handleChangeEl('is_stok', e?.target.checked, valueModal, setValueModal, schemaData, setErrorsField)
            }
          />
        </Box>
      </ModalDialog>

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
