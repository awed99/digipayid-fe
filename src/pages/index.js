// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Alert, Backdrop, Box, Button, CircularProgress, Snackbar, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import Poll from 'mdi-material-ui/Poll'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Table from 'src/views/dashboard/Table'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import Trophy from 'src/views/dashboard/Trophy'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

// import CryptoJS from 'crypto-js/aes'
import { filter, size } from 'lodash'
import { MuiOtp } from 'mui-otp-input-field'
import { useRouter } from 'next/router'
import store from 'store'
import * as yup from 'yup'
import { format_rupiah, generateSignature, handleChangeEl } from '/helpers/general'

import ModalDialog from 'src/components/dialog'

const Dashboard = () => {
  const router = useRouter()
  var CryptoJS = require('crypto-js')

  // ** States
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [openModalPin, setOpenModalPin] = useState(false)
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [errorsField, setErrorsField] = useState({})

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  const [data, setData] = useState({
    pin: ''
  })

  let schemaData = yup?.object()?.shape({
    pin: yup.number().required().min(100000).max(999999)
  })

  const getData = async () => {
    setLoading(true)
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API}/${_uri0}`, {
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
        const _uri = '/dashboard/data'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API}${_uri}`, {
          method: 'POST',
          headers: {
            'X-Signature': _secret?.signature,
            'X-Timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          }
        })
          .then(res => res.json())
          .then(res => {
            if (!res?.data?.isSetPin) {
              setOpenModalPin(true)
            }

            // console.log(res?.data)

            setData(res?.data)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      })
      .catch(() => setLoading(false))
  }

  const handleSubmitPin = async () => {
    if (size(pin) < 6) {
      setAlertMessage({
        open: true,
        type: 'error',
        message: 'Pin wajib 6 digit!'
      })

      return false
    }

    await schemaData?.isValid(data)?.then(async valid => {
      if (valid) {
        setLoading(true)
        const _uri0 = '/auth/check_auth'
        const _secret0 = await generateSignature(_uri0)

        fetch(`${process.env.NEXT_PUBLIC_API}/${_uri0}`, {
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
            const _uri = '/dashboard/create_pin'
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
              body: JSON.stringify({ pin: pin })
            })
              .then(res => res.json())
              .then(res => {
                setAlertMessage({
                  open: true,
                  type: res?.code > 0 ? 'error' : 'primary',
                  message: res?.message
                })

                setData(res?.data)
                setLoading(false)
                setOpenModalPin(false)
              })
              .catch(() => setLoading(false))
          })
          .catch(() => setLoading(false))
      } else {
        setAlertMessage({
          open: true,
          type: 'error',
          message: 'Pin wajib 6 digit angka!'
        })
      }
    })
  }

  useEffect(() => {
    // console.log(store.get('module'))
    if (!localStorage.getItem('data-module')) {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }

    if (store.get('module') === 'admin') {
      router.push('/admin')
    } else if (store.get('module') === 'affiliator') {
      router.push('/affiliator')
    } else if (store.get('module') === 'user') {
      getData()
    } else if (store.get('module') === null || localStorage.get('module') === undefined) {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    } else {
      localStorage.removeItem('data-module')
      localStorage.removeItem('module')
      router.push('/auth')
    }

    // console.log('window.location.host: ', window?.location?.host?.split(':')[0].toLocaleLowerCase())
  }, [])

  useEffect(() => {
    handleChangeEl('pin', parseInt(pin), data, setData, false, setErrorsField)
  }, [pin])

  return (
    <ApexChartWrapper suppressHydrationWarning>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy saldo={data?.saldo} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard
            products={data?.statistics?.products ?? 0}
            items={data?.statistics?.items ?? 0}
            buyers={data?.statistics?.pembelian ?? 0}
            profits={data?.statistics?.pendapatan ?? 0}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview
            data={dayNames?.map(item => parseInt(filter(data?.grafik_mingguan, ['weekDay', item])[0]?.totalCount ?? 0))}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning data={data?.top_products} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.pendapatan) ?? 0}
                icon={<Poll />}
                color='success'
                trendNumber='100%'
                title='Total Pendapatan'
                subtitle='Bulan Ini'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.pembelian) ?? 0}
                icon={<BriefcaseVariantOutline />}
                // trend='negative'
                trendNumber='100%'
                color='warning'
                title='Penjualan Produk'
                subtitle='Bulan Ini'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.deposit) ?? 0}
                icon={<CurrencyUsd />}
                color='primary'
                // trend='negative'
                trendNumber='100%'
                title='Total Deposit'
                subtitle='Bulan Ini'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.withdraw) ?? 0}
                icon={<CurrencyUsd />}
                // trend='negative'
                color='error'
                trendNumber='100%'
                title='Total Penarikan'
                subtitle='Bulan Ini'
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}
        <Grid item xs={12}>
          <Table users={data?.users} />
        </Grid>
      </Grid>

      <ModalDialog
        titleModal='Buat Pin Baru Anda'
        openModal={openModalPin}
        setOpenModal={setOpenModalPin}
        handleSubmitFunction={handleSubmitPin}
      >
        <Typography>Ketikkan PIN baru anda</Typography>
        <Box sx={{ p: 10 }}>
          <MuiOtp length={6} type={showPin ? 'number' : 'password'} autoFocus value={pin} onChange={e => setPin(e)} />
          <Button variant='contained' sx={{ mt: 3 }} onClick={() => setShowPin(!showPin)}>
            {showPin ? 'Sembunyikan Pin' : 'Tampilkan Pin'}
          </Button>
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
    </ApexChartWrapper>
  )
}

export default Dashboard
