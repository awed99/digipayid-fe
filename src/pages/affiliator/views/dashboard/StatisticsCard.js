// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import TrendingUp from 'mdi-material-ui/TrendingUp'

import { format_rupiah } from '/helpers/general'

const StatisticsCard = ({ products = 0, items = 0, buyers = 0, profits = 0 }) => {
  const renderStats = () => {
    const salesData = [
      {
        stats: format_rupiah(products),
        title: 'Produk Terjual',
        color: 'primary',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: format_rupiah(items),
        color: 'warning',
        title: 'Item Terjual',
        icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: format_rupiah(buyers),
        title: 'Jumlah Pembelian',
        color: 'secondary',
        icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: format_rupiah(profits),
        color: 'success',
        title: 'Total Pendapatan',
        icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
      }
    ]

    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title={'Statistik Transaksi Tahun Ini'}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={<Typography variant='body2'>Statistik transaksi tahun {new Date().getFullYear()}</Typography>}
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
