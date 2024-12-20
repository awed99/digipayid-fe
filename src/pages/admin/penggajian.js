// ** MUI Imports
import {
  Alert,
  Autocomplete,
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
import { MuiOtp } from 'mui-otp-input-field'
import { NumericFormat } from 'react-number-format'

import { Edit } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

// ** React Imports
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

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

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const MUITable = () => {
  // ** States
  const [countDown, setCountDown] = useState(0)
  const [loading, setLoading] = useState(true)

  // ** States
  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(0)
  const [errorsField, setErrorsField] = useState()
  const [isAdd, setIsAdd] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [openModalPenggajian, setOpenModalPenggajian] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Tambah User')
  const [data, setData] = useState([])
  const [dataTrf, setDataTrf] = useState([])
  const [userPrivileges, setUserPrivileges] = useState([])
  const [withdrawMethods, setWithdrawMethods] = useState([])
  const [dataBank, setDataBank] = useState(null)
  const [isEditableSelect, setIsEditableSelect] = useState(false)
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [oTPWA, setOTPWA] = useState('')
  const [openModalOTP, setOpenModalOTP] = useState(false)

  const [valueModal, setValueModal] = useState({
    id_user: null,
    username: '',
    salary: '0',
    bank_short_name: '',
    bank_name: '',
    bank_account: '',
    bank_account_name: ''
  })

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  // ** Hooks
  const router = useRouter()
  const selectRef = useRef()
  const textSelectRef = useRef()

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?"'@#\$%\^&\*.,])(?=.{8,})/

  let schemaData = yup.object().shape({
    id_user: yup.string(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().matches(passwordRegExp, 'Min 8 Chars, Uppercase, Lowercase, Number and Special Character'),
    telp: yup.string().required(),
    user_privilege: yup.string().required(),
    salary: yup.string().min(4).max(11),
    bank_short_name: yup.string().nullable(),
    bank_name: yup.string().nullable(),
    bank_account: yup.string().nullable(),
    bank_account_name: yup.string().nullable()
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
    { field: 'email', headerName: 'Email', width: 350 },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: params => (
        <Switch
          checked={params?.value === '1'}
          // onChange={async e => {
          //   setIsAdd(false)
          //   const _row = params?.row
          //   _row.is_active = e?.target?.checked === true ? 1 : 0
          //   _row.user_status = e?.target?.checked === true ? 'ACTIVE' : 'NON ACTIVE'
          //   delete _row.id_user_privilege
          //   delete _row.user_privilege_name
          //   delete _row.user_privilege_type
          //   delete _row.user_privilege_updated_at
          //   setValueModal(_row)
          //   setTriggerUpdateStatus(triggerUpdateStatus + 1)
          // }}
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
    //   field: 'update',
    //   headerName: 'Update',
    //   width: 100,
    //   renderCell: params => (
    //     <IconButton aria-label='delete' onClick={() => handleClickButtonPenggajian(false, params)}>
    //       <Edit color='primary' />
    //     </IconButton>
    //   )
    // }

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
        const _uri = '/master/user/list'
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
            setData(filter(res?.data, { is_active: '1', is_verified: '1' }))
            setDataTrf([])
            getPaymentMethods()
            getUserPrivileges()
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const getPaymentMethods = async () => {
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/check_auth`, {
      method: 'POST',
      headers: {
        'X-Signature': _secret0?.signature,
        'X-Timestamp': _secret0?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(async res => await res.json())
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
        const _uri = '/master/withdraw_method/list'
        const _secret = await generateSignature(_uri)

        await fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
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
          .then(async res => await res.json())
          .then(async res => {
            // console.log('res?.data?.withdraw_methods: ', res?.data?.withdraw_methods)
            const ___data = []

            res?.data?.withdraw_methods?.map((item, index) => {
              const ____data = { code: item?.payment_method_code, label: item?.bank_name, ...item }
              ___data.push(____data)
            })

            // console.log('___data:', ___data)

            // await setPaymentMethods(_data)
            setWithdrawMethods(___data)

            // return __data
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const getUserPrivileges = async () => {
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
        const _uri = '/master/user/privilege_list'
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
            setUserPrivileges(res?.data)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (triggerUpdateStatus > 0) {
      handleSubmit()
    }
  }, [triggerUpdateStatus])

  const handleClickButtonPenggajian = async () => {
    const _data = []
    rowSelectionModel?.map((item0, index0) => {
      filter(data, ['id_user', item0])?.map((item, index) => {
        // console.log('item', item)
        // console.log('bank', filter(withdrawMethods, { bank_short_name: item?.bank_short_name })[0])
        _data[index0] = {
          ...item,
          dataBank: filter(withdrawMethods, { bank_short_name: item?.bank_short_name })[0] ?? null
        }
      })
    })

    setDataTrf(_data)
    setOpenModalPenggajian(true)
  }

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
      handleChangeEl('salary', '0', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('bank_name', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('bank_short_name', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('bank_account', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('bank_account_name', '', valueModal, setValueModal, schemaData, setErrorsField)
      setDataBank(withdrawMethods[0])
    } else {
      setIsAdd(false)
      setTitleModal('Ubah User')
      handleChangeEl('username', _params?.row?.username, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('email', _params?.row?.email, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('password', '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('telp', _params?.row?.telp, valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('salary', _params?.row?.salary ?? '0', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl('bank_name', _params?.row?.bank_name ?? '', valueModal, setValueModal, schemaData, setErrorsField)
      handleChangeEl(
        'bank_account_name',
        _params?.row?.bank_account_name ?? '',
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'bank_short_name',
        _params?.row?.bank_short_name ?? '',
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'bank_account',
        _params?.row?.bank_account ?? '',
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'bank_account_name',
        _params?.row?.bank_account_name ?? '',
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl(
        'user_privilege',
        _params?.row?.user_privilege ?? '',
        valueModal,
        setValueModal,
        schemaData,
        setErrorsField
      )
      handleChangeEl('id_user', _params?.row?.id_user, valueModal, setValueModal, schemaData, setErrorsField)
      setDataBank(filter(withdrawMethods, ['bank_short_name', _params?.row?.bank_short_name])[0])
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
        const _uri =
          isAdd === true && isDelete === false
            ? '/master/user/create'
            : isDelete === true
            ? '/master/user/delete'
            : '/master/user/update'
        const _secret = await generateSignature(_uri)

        const _valueModal = valueModal
        if (!_valueModal?.password) {
          delete _valueModal?.password
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
          body: JSON.stringify(_valueModal)
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
              setData(filter(res?.data, { is_active: '1', is_verified: '1' }))
              setDataTrf([])
              setIsAdd(true)
              setTitleModal('Tambah User')
              handleChangeEl('username', '', valueModal, setValueModal, schemaData, setErrorsField)
              handleChangeEl('id_user', null, valueModal, setValueModal, schemaData, setErrorsField)

              setOpenModal(false)
              setOpenModalPenggajian(false)
            }
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleBeforeSubmitPenggajian = async () => {
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
        const _uri = '/transactions/journal/getOTP'

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
          body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            setLoading(false)
            setOpenModal(false)
            setOpenModalOTP(true)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleSubmitPenggajian = async (isDelete = false) => {
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
        const _uri = '/master/user/penggajian'
        const _secret = await generateSignature(_uri)

        const _valueModal = valueModal
        if (!_valueModal?.password) {
          delete _valueModal?.password
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
          body: JSON.stringify(dataTrf)
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
              setData(filter(res?.data, { is_active: '1', is_verified: '1' }))
              setDataTrf([])
              setIsAdd(true)
              setTitleModal('Tambah User')
              handleChangeEl('username', '', valueModal, setValueModal, schemaData, setErrorsField)
              handleChangeEl('id_user', null, valueModal, setValueModal, schemaData, setErrorsField)

              setOpenModal(false)
              setOpenModalPenggajian(false)
            }
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const _handleResendOTP = async _type => {
    setCountDown(60)
    setLoading(true)
    let _values = {}
    if (_type == 'otp_email') {
      _values = {
        type: 'otp_email',
        email: JSON.parse(localStorage.getItem('data-module'))?.email
      }
    } else if (_type == 'otp_wa') {
      _values = {
        type: 'otp_wa',

        // merchant_wa: data?.merchant_wa,
        email: JSON.parse(localStorage.getItem('data-module'))?.email
      }
    }
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
        const _uri = '/transactions/journal/resend_otp'

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
          body: JSON.stringify(_values)
        })
          .then(res => res.json())
          .then(res => {
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message
            })

            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const _handleCheckValidOTP = async _type => {
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
          localStorage.removeItem('data-module')
          localStorage.removeItem('module')
          router.push('/auth')

          return false
        } else {
          return res
        }
      })
      .then(async res => {
        const _uri = '/transactions/journal/check_valid_otp_gaji'

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
          body: JSON.stringify({ otp: oTPWA, data: dataTrf })
        })
          .then(res => res.json())
          .then(res => {
            setOTPWA('')
            setLoading(false)
            setAlertMessage({
              open: true,
              type: res?.code === 0 ? 'primary' : 'error',
              message: res?.message ?? 'Invalid OTP'
            })

            if (res?.code === 0) {
              // console.log(res?.data)
              // setData(filter(res?.data, { is_active: '1', is_verified: '1' }))
              setDataTrf([])
              setIsAdd(true)
              setTitleModal('Tambah User')
              handleChangeEl('username', '', valueModal, setValueModal, schemaData, setErrorsField)
              handleChangeEl('id_user', null, valueModal, setValueModal, schemaData, setErrorsField)

              setOpenModal(false)
              setOpenModalPenggajian(false)
              setOpenModalOTP(false)
            }
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }
  }, [])

  useLayoutEffect(() => {
    // console.log('dataBank: ', dataBank)
    handleChangeEl('bank_short_name', dataBank?.bank_short_name, valueModal, setValueModal, schemaData, setErrorsField)
    handleChangeEl('bank_name', dataBank?.bank_name, valueModal, setValueModal, schemaData, setErrorsField)
  }, [dataBank])

  // useEffect(() => {
  //   console.log('rowSelectionModel: ', rowSelectionModel)
  // }, [rowSelectionModel])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Penggajian</Link>
        </Typography>
        <Typography variant='body2'>Semua User aktif yang tersedia</Typography>
        <Divider />
        <Typography variant='body2'>
          <Button
            variant='contained'
            size='small'
            sx={{ marginRight: 3.5 }}
            onClick={handleClickButtonPenggajian}
            disabled={rowSelectionModel?.length === 0}
          >
            Submit Penggajian
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
              checkboxSelection
              onRowSelectionModelChange={newRowSelectionModel => {
                setRowSelectionModel(newRowSelectionModel)
              }}
              rowSelectionModel={rowSelectionModel}
            />
          </Box>
        </Card>
      </Grid>

      <ModalDialog
        titleModal={'Penggajian'}
        openModal={openModalPenggajian}
        setOpenModal={setOpenModalPenggajian}
        handleSubmitFunction={handleBeforeSubmitPenggajian}
      >
        {dataTrf?.map((item, index) => (
          <Box key={index}>
            <Divider sx={{ mt: 2 }}>
              <strong>{item?.username}</strong>
            </Divider>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                id='standard-basic'
                label={'Telephone/Whatsapp'}
                variant='outlined'
                size='small'
                autoComplete={false}
                value={item?.telp}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>+62</InputAdornment>
                }}
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <NumericFormat
                customInput={TextField}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
                }}
                label='Nominal Gaji'
                placeholder='Min. 10.000'
                variant='outlined'
                size='small'
                fullWidth
                thousandSeparator={'.'}
                decimalSeparator={','}
                value={item?.salary}
                onValueChange={e => {
                  // handleChangeEl('salary', e, valueModal, setValueModal, schemaData, setErrorsField)
                  const _dataTrf = dataTrf
                  _dataTrf[index].salary = e?.floatValue

                  // console.log('_dataTrf: ', _dataTrf)
                  setDataTrf([..._dataTrf])
                }}
                onFocus={e => e.target.select()}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Autocomplete
                disabled
                value={item?.dataBank}
                // onChange={(event, newvalueModal) => setDataBank(newvalueModal)}
                size='small'
                options={withdrawMethods}
                renderInput={params => <TextField {...params} label='Metode Penggajian' />}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                inputProps={{ inputMode: 'numeric' }}
                size='small'
                label='Nomor Rekening/E-Wallet'
                value={item?.bank_account}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField fullWidth size='small' label='Nama Rekening/E-Wallet' value={item?.bank_account_name} />
            </Box>
          </Box>
        ))}
      </ModalDialog>

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
          <NumericFormat
            customInput={TextField}
            InputProps={{
              startAdornment: <InputAdornment position='start'>IDR</InputAdornment>
            }}
            label='Nominal Gaji'
            placeholder='Min. 10.000'
            variant='outlined'
            size='small'
            fullWidth
            thousandSeparator={'.'}
            decimalSeparator={','}
            value={valueModal?.salary}
            onValueChange={e => {
              handleChangeEl('salary', e, valueModal, setValueModal, schemaData, setErrorsField)
            }}
            onFocus={e => e.target.select()}
            error={errorsField?.salary}
            helperText={errorsField?.salary}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Autocomplete
            value={dataBank}
            onChange={(event, newvalueModal) => setDataBank(newvalueModal)}
            size='small'
            options={withdrawMethods}
            renderInput={params => <TextField {...params} label='Metode Penggajian' />}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            inputProps={{ inputMode: 'numeric' }}
            size='small'
            label='Nomor Rekening/E-Wallet'
            value={valueModal?.bank_account}
            onChange={e => handleChangeEl('bank_account', e, valueModal, setValueModal, schemaData, setErrorsField)}
            error={errorsField?.bank_account}
            helperText={errorsField?.bank_account}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size='small'
            label='Nama Rekening/E-Wallet'
            value={valueModal?.bank_account_name}
            onChange={e =>
              handleChangeEl('bank_account_name', e, valueModal, setValueModal, schemaData, setErrorsField)
            }
            error={errorsField?.bank_account_name}
            helperText={errorsField?.bank_account_name}
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
            {userPrivileges?.map(item => (
              <MenuItem key={item?.id_user_privilege} value={item?.id_user_privilege}>
                {item?.user_privilege_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi OTP Penggajian'
        openModal={openModalOTP}
        setOpenModal={setOpenModalOTP}
        handleSubmitFunction={_handleCheckValidOTP}
      >
        <Typography>
          Kode OTP Login anda sudah dikirim
          <br />
          ke Email & WhatsApp anda {data?.merchant_wa}.
        </Typography>
        <Typography>Silakan masukkan kode OTP.</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp autoComplete length={6} value={oTPWA} onChange={e => setOTPWA(e)} />
        </Box>

        <Box>
          <Typography variant='body2'>
            {countDown == 0 ? (
              <>
                <LinkStyled onClick={e => _handleResendOTP('otp_wa')}>Kirim Ulang Kode OTP Melalui WhatsApp</LinkStyled>
                <br />
                <br />
                <LinkStyled onClick={e => _handleResendOTP('otp_email')}>Kirim Ulang Kode OTP Melalui Email</LinkStyled>
              </>
            ) : (
              <LinkStyled disabled={true} sx={{ color: 'gray' }}>
                Kirim Ulang Kode OTP dalam ({countDown})
              </LinkStyled>
            )}
          </Typography>
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
