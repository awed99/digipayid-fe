import * as React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// import { PieChart } from '@mui/x-charts'
// import { BarChart } from '@mui/x-charts'
// import { ResponsiveRadar } from '@nivo/radar'

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

  const dataRadar = [
    {
      taste: 'fruity',
      chardonay: 95,
      carmenere: 114,
      syrah: 30
    },
    {
      taste: 'bitter',
      chardonay: 89,
      carmenere: 61,
      syrah: 85
    },
    {
      taste: 'heavy',
      chardonay: 111,
      carmenere: 80,
      syrah: 71
    },
    {
      taste: 'strong',
      chardonay: 28,
      carmenere: 119,
      syrah: 74
    },
    {
      taste: 'sunny',
      chardonay: 33,
      carmenere: 92,
      syrah: 49
    }
  ]

  const chartSetting = {
    yAxis: [
      {
        label: 'Stocks (pcs)'
      }
    ],

    // width: 500,
    height: 350

    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: 'translate(-20px, 0)'
    //   }
    // }
  }

  const dataset = [
    {
      persediaan: 59,
      pengadaan: 57,
      pemakaian: 86,
      month: 'Jan'
    },
    {
      persediaan: 50,
      pengadaan: 52,
      pemakaian: 78,
      month: 'Fev'
    },
    {
      persediaan: 47,
      pengadaan: 53,
      pemakaian: 106,
      month: 'Mar'
    },
    {
      persediaan: 54,
      pengadaan: 56,
      pemakaian: 92,
      month: 'Apr'
    },
    {
      persediaan: 57,
      pengadaan: 69,
      pemakaian: 92,
      month: 'May'
    },
    {
      persediaan: 60,
      pengadaan: 63,
      pemakaian: 103,
      month: 'June'
    },
    {
      persediaan: 59,
      pengadaan: 60,
      pemakaian: 105,
      month: 'July'
    },
    {
      persediaan: 65,
      pengadaan: 60,
      pemakaian: 106,
      month: 'Aug'
    },
    {
      persediaan: 51,
      pengadaan: 51,
      pemakaian: 95,
      month: 'Sept'
    },
    {
      persediaan: 60,
      pengadaan: 65,
      pemakaian: 97,
      month: 'Oct'
    },
    {
      persediaan: 67,
      pengadaan: 64,
      pemakaian: 76,
      month: 'Nov'
    },
    {
      persediaan: 61,
      pengadaan: 70,
      pemakaian: 103,
      month: 'Dec'
    }
  ]

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

  const valueFormatter = value => `${value} pcs`

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Angkatan Darat</Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                782
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg
                alt='trophy'
                src='/images/misc/ad_tni_ad.jpg'
                sx={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  border: theme => `0.25rem solid ${theme.palette.common.white}`
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Mabes TNI</Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                2
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg
                alt='trophy'
                src='/images/misc/mabes.jpg'
                sx={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  border: theme => `0.25rem solid ${theme.palette.common.white}`
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Kemhan</Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                0
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg
                alt='trophy'
                src='/images/misc/kemhan.png'
                sx={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  border: theme => `0.25rem solid ${theme.palette.common.white}`
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Lain - Lain</Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                0
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg
                alt='trophy'
                src='/images/misc/groups.png'
                sx={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  border: theme => `0.25rem solid ${theme.palette.common.white}`
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>TOPDSPP PieChart</Typography>
              {/* <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10 },
                      { id: 1, value: 15 },
                      { id: 2, value: 20 }
                    ]
                  }
                ]}
                width={400}
                height={200}
              /> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>TOPDSPP RadarChart</Typography>
              {/* <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'Paldam I' },
                      { id: 1, value: 15, label: 'Paldam II' },
                      { id: 2, value: 20, label: 'Paldam III' }
                    ]
                  }
                ]}
                width={400}
                height={200}
              /> */}
              {/* <ResponsiveRadar
                data={dataRadar}
                keys={['chardonay', 'carmenere', 'syrah']}
                indexBy='taste'
                valueFormat='>-.2f'
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                borderColor={{ from: 'color' }}
                gridLabelOffset={36}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                blendMode='multiply'
                motionConfig='wobbly'
                legends={[
                  {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              /> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>TOPDSPP BarChart</Typography>
              {/* <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                  { dataKey: 'persediaan', label: 'Persediaan', valueFormatter },
                  { dataKey: 'pengadaan', label: 'Pengadaan', valueFormatter },
                  { dataKey: 'pemakaian', label: 'Pemakaian', valueFormatter }
                ]}
                {...chartSetting}
              /> */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
