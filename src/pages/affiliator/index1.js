// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import Poll from 'mdi-material-ui/Poll'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import DepositWithdraw from 'src/pages/admin/views/dashboard1/DepositWithdraw'
import SalesByCountries from 'src/pages/admin/views/dashboard1/SalesByCountries'
import StatisticsCard from 'src/pages/admin/views/dashboard1/StatisticsCard'
import Table from 'src/pages/admin/views/dashboard1/Table'
import TableMerchants from 'src/pages/admin/views/dashboard1/TableMerchants'
import TotalEarning from 'src/pages/admin/views/dashboard1/TotalEarning'
import Trophy from 'src/pages/admin/views/dashboard1/Trophy'
import WeeklyOverview from 'src/pages/admin/views/dashboard1/WeeklyOverview'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='100%'
                title='Total Pendapatan'
                subtitle='Bulan Ini'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='78'
                icon={<CurrencyUsd />}
                // trend='negative'
                color='primary'
                trendNumber='100%'
                title='Total Penarikan'
                subtitle='Bulan Ini'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
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
                stats='15'
                icon={<HelpCircleOutline />}
                color='secondary'
                // trend='negative'
                trendNumber='100%'
                title='Penjualan Item'
                subtitle='Bulan Ini'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <TableMerchants />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
