// ** MUI Imports
import {
  Alert,
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch
} from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Edit, Visibility, VisibilityOff } from '@mui/icons-material'

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
import { filter } from 'lodash'
import ModalDialog from 'src/components/dialog'
import { generateSignature } from '/helpers/general'
import { handleChangeEl } from '/hooks/general'

const MUITable = () => {
  // ** States
  const [loading, setLoading] = useState(true)

  // ** States
  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(0)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Tambah User')
  const [valueModal, setValueModal] = useState({ id_user: null, username: '' })
  const [data, setData] = useState([])
  const [userPrivileges, setUserPrivileges] = useState([])

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  // ** Hooks
  const router = useRouter()

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/

  let schemaData = yup.object().shape({
    id_user: yup.string(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().matches(passwordRegExp, 'Min 8 Chars, Uppercase, Lowercase, Number and Special Character'),
    telp: yup.string().required(),
    user_privilege: yup.string().required()
  })

  let _loopNumber = 1

  const columns = [
    { field: 'username', headerName: 'Name', width: 200 },
    { field: 'user_privilege_name', headerName: 'Hak Akses', width: 200 },
    {
      field: 'telp',
      headerName: 'Telp/WA',
      width: 200,
      renderCell: params => (
        <a target='_blank' href={'//wa.me/+62' + params.value} rel='noreferrer'>
          +62{params.value}
        </a>
      )
    },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: params => (
        <Switch
          checked={params?.value === '1'}
          onChange={async e => {
            setIsAdd(false)
            const _row = params?.row
            _row.is_active = e?.target?.checked === true ? 1 : 0
            _row.user_status = e?.target?.checked === true ? 'ACTIVE' : 'NON ACTIVE'
            delete _row.id_user_privilege
            delete _row.user_privilege_name
            delete _row.user_privilege_type
            delete _row.user_privilege_updated_at
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
    }

    // {
    //   field: 'delete',
    //   headerName: 'Delete',
    //   width: 100,
    //   renderCell: params => (
    //     <IconButton aria-label='delete' onClick={() => handleClickDelete(params)}>
    //       <Delete color='error' />
    //     </IconButton>
    //   )
    // }
  ]

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
        const _uri = '/affiliator/master/user/list'
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
            getUserPrivileges()
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const getUserPrivileges = async () => {
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
        const _uri = '/affiliator/master/user/privilege_list'
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
            setUserPrivileges(res?.data)
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

  useEffect(() => {
    if (triggerUpdateStatus > 0) {
      handleSubmit()
    }
  }, [triggerUpdateStatus])

  const handleClickButton = async (_isAdd = false, _params = {}) => {
    if (_isAdd === true) {
      setIsAdd(true)
      setTitleModal('Tambah User')
      handleChangeEl('username', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('email', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('password', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('telp', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('user_privilege', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('id_user', null, valueModal, setValueModal, schemaData, setErrorsField)
    } else {
      setIsAdd(false)
      setTitleModal('Ubah User')
      handleChangeEl('username', _params?.row?.username, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('email', _params?.row?.email, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('password', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('telp', _params?.row?.telp, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl(
        'user_privilege',
        _params?.row?.user_privilege,
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl('id_user', _params?.row?.id_user, valueModal, setValueModal, schemaData, setErrorsField)
    }

    setOpenModal(true)
  }

  const handleClickDelete = async (_params = {}) => {
    setIsAdd(false)
    const _x = confirm('Anda yakin ingin menghapus User ' + _params?.row?.username + ' ?')
    if (_x) {
      handleChangeEl('username', _params?.row?.username, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('id_user', _params?.row?.id_user, valueModal, setValueModal, schemaData, setErrorsField)

      handleSubmit(true)
    }
  }

  const handleSubmit = async (isDelete = false) => {
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
        const _uri =
          isAdd === true && isDelete === false
            ? '/affiliator/master/user/create'
            : isDelete === true
            ? '/affiliator/master/user/delete'
            : '/affiliator/master/user/update'
        const _secret = await generateSignature(_uri)

        const _valueModal = valueModal
        if (!_valueModal?.password) {
          delete _valueModal?.password
        }

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
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            if (res?.code === 0) {
              // console.log(res?.data)
              setData(res?.data)
              setOpenModal(false)
              setIsAdd(true)
              setTitleModal('Tambah User')
              handleChangeEl('username', '', valueModal, setValueModal, schemaData, setErrorsField)
              handleChangeEl('id_user', null, valueModal, setValueModal, schemaData, setErrorsField)
            }
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>User</Link>
        </Typography>
        <Typography variant='body2'>Semua User yang tersedia</Typography>
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
              getRowId={row => row.id_user}
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
        <Box sx={{ p: 2 }}>
          <TextField
            label='User Name'
            variant='outlined'
            fullWidth
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('username', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.username}
            error={errorsField?.username}
            helperText={errorsField?.username}
            inputProps={{
              autoComplete: 'new-password'
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('email', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.email}
            error={errorsField?.email}
            helperText={errorsField?.email}
            inputProps={{
              autoComplete: 'new-password'
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            id='standard-basic'
            label={'Password'}
            variant='outlined'
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('password', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.password}
            error={errorsField?.password}
            helperText={errorsField?.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              autoComplete: 'new-password',
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label='toggle password visibility'
                  >
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            id='standard-basic'
            label={'Telephone/Whatsapp'}
            variant='outlined'
            size='small'
            autoComplete={false}
            onChange={e => handleChangeEl('telp', e, valueModal, setValueModal, schemaData, setErrorsField)}
            value={valueModal?.telp}
            error={errorsField?.telp}
            helperText={errorsField?.telp}
            InputProps={{
              autoComplete: 'new-password',
              startAdornment: <InputAdornment position='start'>+62</InputAdornment>
            }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <InputLabel id='demo-simple-select-label'>Privilege</InputLabel>
          <Select
            fullWidth
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={valueModal?.user_privilege}
            label='Privilege'
            size='small'
            onChange={e => handleChangeEl('user_privilege', e, valueModal, setValueModal, schemaData, setErrorsField)}
          >
            {filter(userPrivileges, ['user_privilege_type', '1'])?.map(item => (
              <MenuItem key={item?.id_user_privilege} value={item?.id_user_privilege}>
                {item?.user_privilege_name}
              </MenuItem>
            ))}
          </Select>
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
