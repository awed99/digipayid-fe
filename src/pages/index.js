// ** React Imports
import { useEffect, useLayoutEffect, useState } from 'react'

// ** MUI Imports
import { Backdrop, CircularProgress } from '@mui/material'
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
import { filter } from 'lodash'
import { useRouter } from 'next/router'
import store from 'store'
import { format_rupiah, generateSignature } from '/helpers/general'

const Dashboard = () => {
  const router = useRouter()
  var CryptoJS = require('crypto-js')

  // ** States
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const getData = async () => {
    setLoading(true)
    const _uri0 = '/auth/check_auth'
    const _secret0 = await generateSignature(_uri0)

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri0}`, {
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
        const _uri = '/dashboard/data'
        const _secret = await generateSignature(_uri)

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}${_uri}`, {
          method: 'POST',
          headers: {
            'x-signature': _secret?.signature,
            'x-timestamp': _secret?.timestamp,
            Authorization: await CryptoJS.AES.decrypt(res?.auth?.token ?? '', process.env.NEXT_PUBLIC_BE_API_KEY)
              .toString(CryptoJS.enc.Utf8)
              .replace(/\"/g, '')
          }

          // body: JSON.stringify({ start_date: startDate, end_date: endDate })
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

  useEffect(() => {
    // console.log(store.get('module'))

    if (store.get('module') === 'admin') {
      router.push('/admin')
    } else if (store.get('module') === 'affiliator') {
      router.push('/affiliator')
    } else if (store.get('module') === 'user') {
      getData()
    } else if (store.get('module') === null || localStorage.get('module') === undefined) {
      router.push('/auth')
    } else {
      router.push('/auth')
    }
  }, [])

  useLayoutEffect(() => {
    // componentWillMount events
    if (!localStorage.getItem('data-module')) {
      router.push('/auth')
    }
  }, [])

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

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999999 }} open={loading}>
        <CircularProgress size={100} variant='indeterminate' />
      </Backdrop>
    </ApexChartWrapper>
  )
}

export default Dashboard
