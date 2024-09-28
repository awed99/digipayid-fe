// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { useRouter } from 'next/router'

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

const Trophy = ({ reffCode = '0' }) => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Kode Referal</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Kode referal milikmu
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {reffCode}
        </Typography>
        <Button size='small' variant='contained' onClick={() => router.push('/affiliator/master/user')}>
          Data User
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/logo.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
