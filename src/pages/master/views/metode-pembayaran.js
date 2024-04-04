// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

import { useState } from 'react'

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

const Trophy = ({
  data,
  payment_method_code,
  payment_method_name,
  payment_method_type,
  payment_method_image_url,
  fee_original,
  fee_original_percent,
  fee_merchant,
  settlement_day,
  settlement_on_weekend,
  min_transaction,
  max_transaction,
  fee_on_merchant,
  is_active,
  created_at
}) => {
  const [checked, setChecked] = useState(true)

  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h4'>{data?.payment_method_code}</Typography>
        <Typography variant='h6'>{data?.payment_method_name}</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Worst personels of this month
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          20 Personels
        </Typography>
        <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
        <TriangleImg alt='triangle background' src={payment_method_image_url} />
        <TrophyImg alt='trophy' src={payment_method_image_url} />
      </CardContent>
    </Card>
  )
}

export default Trophy
