// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { format_rupiah } from '/helpers/general'

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

const Trophy = ({ saldo = '0' }) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Saldo Saat Ini</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Uang yang tersedia setelah porses kliring
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          IDR {format_rupiah(saldo)}
        </Typography>
        <Button size='small' variant='contained'>
          Dompet Digital
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/logo.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
