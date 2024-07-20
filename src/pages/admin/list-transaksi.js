// ** MUI Imports
import { Autocomplete, Backdrop, Button, Card, Chip, CircularProgress, Divider, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import { AccessTime, Close, Done } from '@mui/icons-material'
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

// import CryptoJS from 'crypto-js/aes'
import { filter } from 'lodash'
import moment from 'moment'
import DateRangePicker from 'src/components/date-range-picker'
import ModalDialog from 'src/components/dialog'
import { format_rupiah, generateSignature } from '/helpers/general'
import TablePagination from '/src/components/table-pagination'

import dayjs from 'dayjs'

const MUITable = () => {
  var CryptoJS = require('crypto-js')

  // ** States
  const [loading, setLoading] = useState(false)
  const [IdMerchantSelected, setIdMerchantSelected] = useState(0)
  const [merchants, setMerchants] = useState([])
  const [data, setData] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [paymentDetail, setPaymentDetail] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalConfirmationDelete, setOpenModalConfirmationDelete] = useState(false)
  const [openModalPayment, setOpenModalPayment] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  let _loopNumber = 1

  // ** Hooks
  const router = useRouter()

  const columns = [
    {
      field: 'invoice_number',
      headerName: 'No. Invoice',
      width: 200,
      renderCell: params => (
        <Button size='small' variant='contained' onClick={() => handleGetProducts(params?.row?.invoice_number)}>
          {params?.value}
        </Button>
      )
    },
    {
      field: 'status_transaction',
      headerName: 'Status',
      width: 200,
      renderCell: params =>
        parseInt(params?.value) === 0 ? (
          <Chip
            size='small'
            label='Menunggu Pembayaran'
            color='warning'
            deleteIcon={<AccessTime />}
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : parseInt(params?.value) === 1 ? (
          <Chip
            label='Proses Kliring'
            color='primary'
            deleteIcon={<Done />}
            size='small'
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : parseInt(params?.value) === 2 ? (
          <Chip
            label='Selesai'
            color='success'
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
            deleteIcon={<AccessTime />}
            size='small'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        ) : (
          <Chip
            size='small'
            label='Batal'
            color='error'
            deleteIcon={<Close />}
            onClick={() => handleGetProducts(params?.row?.invoice_number)}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
          />
        )
    },
    {
      field: 'payment_method_name',
      headerName: 'Metode Bayar',

      // type: 'number',
      width: 180

      // renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'total_product',
      headerName: 'Jml Produk',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'amount_to_pay',
      headerName: 'Dibayar',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'amount_to_back',
      headerName: 'Kembalian',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah('-' + (params?.value).toString())
    },
    {
      field: 'amount',
      headerName: 'Sub Total',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'fee',
      headerName: 'Fee',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah('-' + (params?.value).toString())
    },
    {
      field: 'amount_to_receive',
      headerName: 'DIterima',
      type: 'number',
      width: 110,
      renderCell: params => format_rupiah((params?.value).toString())
    },
    {
      field: 'time_transaction',
      headerName: 'Tanggal Transaksi',
      width: 250,
      renderCell: params => moment(params?.value).format('ddd, DD MMM YYYY - HH:mm')
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

  const columnsProducts = [
    { field: 'product_code', headerName: 'Kode', width: 125 },
    { field: 'product_name', headerName: 'Nama Produk', width: 200 },
    { field: 'product_qty', headerName: 'Jumlah', type: 'number', width: 80 },

    // { field: 'product_image_url', headerName: 'Image', width: 150 },
    {
      field: 'product_price',
      headerName: 'Harga',
      width: 120,
      type: 'number',
      renderCell: params => format_rupiah(params?.value)
    },
    {
      field: 'product_image_url',
      headerName: 'Image',
      width: 120,
      renderCell: params => <img src={`${process.env.NEXT_PUBLIC_API}` + params?.value} width={100} />
    }
  ]

  const getMerchants = async () => {
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
        const _uri = '/admin/master/user/lists'
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
            const _merchants = []
            filter(res?.data, { id_user_parent: '0' })?.forEach(item => {
              _merchants.push({ id: item?.id_user, label: item?.merchant_name })
            })

            // console.log('merchants: ', _merchants)
            setMerchants(_merchants)
          })
          .catch(() => false)
      })
      .catch(() => false)
  }

  const getData = async (
    startDate = dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate = dayjs().endOf('month').format('YYYY-MM-DD')
  ) => {
    setLoading(true)
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)

    setData([])
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
        const _uri = '/admin/transactions/orders/list'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ start_date: startDate, end_date: endDate, id_merchant: IdMerchantSelected })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleGetProducts = async _invoice_number => {
    setLoading(true)
    const _dataSelected = filter(data, ['invoice_number', _invoice_number])[0]
    setDataSelected(_dataSelected)

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
        const _uri = '/admin/transactions/orders/get_products'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ invoice_number: _dataSelected?.invoice_number, id_merchant: IdMerchantSelected })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setDataProduct(res?.data)
            setOpenModal(true)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleCancelTransaction = async () => {
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
        const _uri = '/admin/transactions/orders/cancel_transaction'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({ invoice_number: dataSelected?.invoice_number, id_merchant: IdMerchantSelected })
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res?.data)
            setData(res?.data)
            setOpenModal(false)
            setOpenModalConfirmationDelete(false)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    getMerchants()
  }, [])

  useEffect(() => {
    // console.log('IdMerchantSelected: ', IdMerchantSelected)
    if (IdMerchantSelected > 0) {
      getData()
    } else {
      setData([])
    }
  }, [IdMerchantSelected])

  const getDetailPayment = async (_dataSelected = dataSelected) => {
    const _uri0 = '/api/check-auth'
    const _secret0 = await generateSignature(_uri0)
    setLoading(true)

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
        const _uri = '/admin/transactions/journal/check_deposit_ewallet'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          },
          body: JSON.stringify({
            invoice_number: _dataSelected?.invoice_number,
            amount: _dataSelected?.amount_to_pay,
            payment_method: _dataSelected?.payment_method_code,
            id_merchant: IdMerchantSelected
          })
        })
          .then(res => res.json())
          .then(res => {
            setPaymentDetail(res?.payment)

            // setLoading(false)
            setOpenModalPayment(true)
            setLoading(false)
          })
      })
      .catch(() => setLoading(false))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>List Transaksi Merchant</Link>
        </Typography>
        <Typography variant='body2'>List Transaksi Merchant</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box>
              <DateRangePicker
                onChange={(_startDate, _endDate) => IdMerchantSelected > 0 && getData(_startDate, _endDate)}
              />{' '}
              &emsp;
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={merchants}
                sx={{ width: 300, display: 'inline-block', verticalAlign: 'middle' }}
                value={filter(merchants, ['id', IdMerchantSelected])[0]}
                onChange={(_event, newValue) => {
                  setIdMerchantSelected(newValue?.id ?? 0)
                }}
                renderInput={params => <TextField {...params} label='Pilih Merchant' />}
              />
            </Box>

            <DataGrid
              density={'compact'}
              autoHeight
              rows={data}
              columns={columns}
              getRowId={row => row.id_transaction}
              initialState={{
                ...data.initialState,
                pagination: { paginationModel: { pageSize: 25 } }
              }}
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
                        Jumlah Produk :
                        {format_rupiah(
                          data?.reduce((total, item) => parseInt(total) + parseInt(item?.total_product), 0)?.toString()
                        )}
                      </b>
                    </Typography>
                    <Typography>
                      <b>Transaksi Kliring :{format_rupiah(filter(data, ['status_transaction', '1'])?.length)}</b>
                    </Typography>
                    <Typography>
                      <b>Transaksi Sukses :{format_rupiah(filter(data, ['status_transaction', '2'])?.length)}</b>
                    </Typography>
                    <Typography>
                      <b>
                        Transaksi Belum terbayar :{format_rupiah(filter(data, ['status_transaction', '0'])?.length)}
                      </b>
                    </Typography>
                    <Typography>
                      <b>Transaksi Batal :{format_rupiah(filter(data, ['status_transaction', '9'])?.length)}</b>
                    </Typography>
                    <Typography>
                      <b>
                        Total Terbayar : IDR{' '}
                        {format_rupiah(
                          filter(
                            data,
                            item => item?.status_transaction === '2' || item?.status_transaction === '1'
                          )?.reduce((total1, item) => parseInt(total1) + parseInt(item?.amount), 0)
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
        titleModal={'List Produk Transaksi ' + dataSelected?.invoice_number}
        openModal={openModal}
        setOpenModal={setOpenModal}
        ButtonDialogs={
          <Box sx={{ display: 'block', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {dataSelected?.status_transaction === '0' && (
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  sx={{ m: 3, float: 'left' }}
                  style={{ float: 'left' }}
                  onClick={() => setOpenModalConfirmationDelete(true)}
                >
                  Batalkan
                </Button>
              )}

              {/* {dataSelected?.status_transaction === '0' && (
                <Button
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{ m: 3 }}
                  onClick={() => getDetailPayment(dataSelected)}
                >
                  Bayar
                </Button>
              )} */}

              <Button variant='contained' size='small' sx={{ m: 3 }} onClick={() => setOpenModal(false)}>
                Tutup
              </Button>
            </Box>
          </Box>
        }

        // handleSubmitFunction={() => handleSubmit()}
      >
        <Box sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Card>
              <Box sx={{ width: '100%', overflow: 'auto' }}>
                <DataGrid
                  density={'compact'}
                  autoHeight
                  rows={dataProduct}
                  columns={columnsProducts}
                  getRowId={row => row.id_product}
                  initialState={{
                    ...data.initialState,
                    pagination: { paginationModel: { pageSize: 25 } }
                  }}
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
                          <b>{dataProduct?.length} Produk</b>
                        </Typography>
                        <Typography>
                          <b>
                            Jumlah Item :{' '}
                            {format_rupiah(
                              dataProduct
                                ?.reduce((total, item) => parseInt(total) + parseInt(item?.product_qty), 0)
                                ?.toString()
                            )}
                          </b>
                        </Typography>
                        <Typography>
                          <b>
                            Total :{' '}
                            {format_rupiah(
                              dataProduct
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
                />
              </Box>
            </Card>
          </Grid>
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Konfirmasi Batalkan Transaksi'
        openModal={openModalConfirmationDelete}
        setOpenModal={setOpenModalConfirmationDelete}
        handleSubmitFunction={handleCancelTransaction}
      >
        <Box>
          Apakah anda yakin ingin membatalkan transaksi <b>{dataSelected?.invoice_number}</b> ?
        </Box>
      </ModalDialog>

      <ModalDialog
        titleModal={'Form Pembayaran ' + dataSelected?.invoice_number}
        openModal={openModalPayment}
        setOpenModal={setOpenModalPayment}
      >
        <Box
          alignItems='center'
          justify='center'
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        >
          <Box style={{ width: 550, textAlign: 'center' }}>
            {parseInt(dataSelected?.id_payment_method) >= 18 && parseInt(dataSelected?.id_payment_method) <= 19 && (
              <>
                <Box>
                  <Typography>
                    <h3>IDR {format_rupiah(paymentDetail?.res?.data?.total_bayar ?? '0')}</h3>
                  </Typography>
                </Box>
                <Box>
                  <Typography>Berlaku dalam 10 Menit</Typography>
                </Box>
                <Box>
                  <Typography>Metode Pembayaran : {dataSelected?.payment_method_name ?? 'QRIS'}</Typography>
                </Box>
                <Box>
                  {parseInt(dataSelected?.id_payment_method) == 18 ||
                  parseInt(dataSelected?.id_payment_method) == 19 ? (
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
