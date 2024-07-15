// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import { styled } from '@mui/material/styles'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

const CardUser = () => {
  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      // borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/Logo-TNI-AD.JPG' />
      <Avatar
        alt='Robert Meyer'
        src='/images/avatars/1.png'
        sx={{
          width: 75,
          height: 75,
          left: '1.313rem',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Name Demo</Typography>
            <Typography variant='caption'>Jabatan Demo</Typography>
          </Box>
          {/* <Button variant='contained'>Send Request</Button> */}
        </Box>
        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={
              {
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
              }
            }
          >
            <StyledBox>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Nama</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Matra</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Pangkat</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>TMT Pangkat</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Korps / Kecabangan</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>NRP</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>NRP Bayangan</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Sumber Prajurit</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Dikma</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>TMT TNI/Prajurit</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Diktuk</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Dikum</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>TMT Perwira</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Dikmilti</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>Kategori Personel</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
              <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item sm={4} sx={{ ml: 30 }}>
                  <Typography variant='body2'>TMT Kategori</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant='body2'>-</Typography>
                </Grid>
              </Box>
            </StyledBox>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Kotama</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Satuan</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Jabatan</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>TMT Jabatan</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>NIK</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Tempat, Tanggal Lahir</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Jenis Kelamin</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Agama</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Suku Bangsa</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Golongan Darah</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Status Kawin</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Alamat Tinggal</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Handphone</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>JAS</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>PSI</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
            <Box sm={12} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Grid item sm={4}>
                <Typography variant='body2'>Stakes</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant='body2'>-</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardUser
