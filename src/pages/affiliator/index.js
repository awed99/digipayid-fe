// ** React Imports
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'

// ** MUI Imports
import { Backdrop, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import Poll from 'mdi-material-ui/Poll'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
// import StatisticsCard from 'src/pages/affiliator/views/dashboard/StatisticsCard'
import Table from 'src/pages/affiliator/views/dashboard/Table'
import TableMerchants from 'src/pages/affiliator/views/dashboard/TableMerchants'
import TotalEarning from 'src/pages/affiliator/views/dashboard/TotalEarning'
import Trophy from 'src/pages/affiliator/views/dashboard/Trophy'
import TrophyReffCode from 'src/pages/affiliator/views/dashboard/TrophyReffCode'
import WeeklyOverview from 'src/pages/affiliator/views/dashboard/WeeklyOverview'
import WeeklyOverviewWithdraw from 'src/pages/affiliator/views/dashboard/WeeklyOverviewWithdraw'

// import CryptoJS from 'crypto-js/aes'
import { filter } from 'lodash'
import { format_rupiah, generateSignature } from '/helpers/general'

const Dashboard = () => {
  var CryptoJS = require('crypto-js')
  const router = useRouter()

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
        const _uri = '/affiliator/dashboard/data'
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
    getData()
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
        <Grid item xs={12} md={6}>
          <Trophy saldo={data?.saldo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrophyReffCode reffCode={data?.user?.reff_code} />
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <StatisticsCard
            products={data?.statistics?.products ?? 0}
            items={data?.statistics?.items ?? 0}
            buyers={data?.statistics?.pembelian ?? 0}
            profits={data?.statistics?.pendapatan ?? 0}
          />
        </Grid> */}
        <Grid item xs={12} md={6} lg={6}>
          <WeeklyOverview
            data={dayNames?.map(item => parseInt(filter(data?.grafik_mingguan, ['weekDay', item])[0]?.totalCount ?? 0))}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <WeeklyOverviewWithdraw
            data={dayNames?.map(item => parseInt(filter(data?.grafik_withdraw, ['weekDay', item])[0]?.totalCount ?? 0))}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TotalEarning data={data?.top_merchants} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.keuntungan) ?? 0}
                icon={<Poll />}
                color='success'
                trendNumber='100%'
                title='Total Keuntungan'
                subtitle='Keseluruhan'
              />
            </Grid>
            {/* <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.withdraw) ?? 0}
                icon={<BriefcaseVariantOutline />}
                // trend='negative'
                trendNumber='100%'
                color='warning'
                title='Total Penarikan Admin'
                subtitle='Keseluruhan'
              />
            </Grid> */}
            {/* <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.deposit_merchant) ?? 0}
                icon={<CurrencyUsd />}
                color='primary'
                // trend='negative'
                trendNumber='100%'
                title='Total Deposit Merchant'
                subtitle='Keseluruhan'
              />
            </Grid> */}
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={format_rupiah(data?.trends?.withdraw_affiliator) ?? 0}
                icon={<CurrencyUsd />}
                // trend='negative'
                color='error'
                trendNumber='100%'
                title='Total Penarikan'
                subtitle='Keseluruhan'
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
          <TableMerchants merchants={data?.merchants} />
        </Grid>
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
