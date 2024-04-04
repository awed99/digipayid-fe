// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import FileDocumentArrowRightOutline from 'mdi-material-ui/FileDocumentArrowRightOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { styled, useTheme } from '@mui/material/styles'

const Dashboard = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  // Styled component for the triangle shaped background image
  const TriangleImg = styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
  })

  // Styled component for the trophy image
  const TrophyImg = styled('img')({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute'
  })

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Total Dokumen</Typography>
              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                Total Dokumen Tersimpan
              </Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                310
              </Typography>
              <Button size='small' variant='contained'>
                View Data
              </Button>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg alt='trophy' src='/images/misc/chart.png' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Terpublikasi</Typography>
              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                Dokumen Terpublikasi
              </Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                132
              </Typography>
              <Button size='small' variant='contained'>
                View Data
              </Button>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg alt='trophy' src='/images/misc/chart.png' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Belum Terpublikasi</Typography>
              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                Dokumen Belum Terpublikasi
              </Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                65
              </Typography>
              <Button size='small' variant='contained'>
                View Data
              </Button>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg alt='trophy' src='/images/misc/chart.png' />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <CardStatisticsVerticalComponent
            subtitle='Dokumen'
            title='Kementrian Keuangan'
            stats='42'
            trendNumber='+3'
            icon={<FileDocumentArrowRightOutline />}
            color='success'
            pointer={true}
          />
        </Grid>
        <Grid item xs={3}>
          <CardStatisticsVerticalComponent
            subtitle='Dokumen'
            title='Kementrian Pertahanan'
            stats='78'
            trendNumber='+15'
            color='secondary'
            icon={<FileDocumentArrowRightOutline />}
            pointer={true}
          />
        </Grid>
        <Grid item xs={3}>
          <CardStatisticsVerticalComponent
            subtitle='Dokumen'
            title='Mabes AD'
            stats='62'
            trendNumber='+3'
            icon={<FileDocumentArrowRightOutline />}
            pointer={true}
          />
        </Grid>
        <Grid item xs={3}>
          <CardStatisticsVerticalComponent
            subtitle='Dokumen'
            title='DITKUAD'
            stats='15'
            color='warning'
            trendNumber='+6'
            icon={<FileDocumentArrowRightOutline />}
            pointer={true}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <SalesByCountries title='Komentar Terbaru' />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <SalesByCountries title='Aktifitas Terbaru' />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
