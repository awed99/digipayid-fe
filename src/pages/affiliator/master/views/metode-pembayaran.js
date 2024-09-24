// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { format_rupiah } from '/helpers/general'

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  top: 70,
  position: 'absolute'
})

const Trophy = ({ data, updateData }) => {
  const onItemChange = (_field, _value) => {
    const _item = data
    _item[_field] = _value
    updateData(_item)
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <span style={{ float: 'right' }}>
          <Switch
            checked={data?.status === '1'}
            onChange={e => onItemChange('status', e?.target?.checked ? 1 : 0)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </span>
        <Typography variant='h6'>{data?.payment_method_name}</Typography>
        {/* <Typography variant='h6'>
          Fee: {parseInt(data?.fee_original) + parseInt(data?.fee_app)} +{' '}
          {parseFloat(data?.fee_original_percent) + parseFloat(data?.fee_app_percent)}%
        </Typography> */}
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          <Typography variant='p' sx={{ my: 4, color: 'primary.main' }}>
            H+{data?.settlement_day}
            <br />({format_rupiah(parseInt(data?.fee_original))} + {parseFloat(data?.fee_original_percent)}%)
          </Typography>
          {data?.settlement_on_weekend === '0' ? (
            <Typography color='error'>Libur Tidak Kliring</Typography>
          ) : (
            <Typography color='primary'>Libur Tetap Kliring</Typography>
          )}
        </Typography>
        {/* <TriangleImg alt={data?.payment_method_code} src={data?.payment_method_image_url} width={100} height={30} /> */}
        <TrophyImg alt={data?.payment_method_code} src={data?.payment_method_image_url} width={70} height={'auto'} />
        <Typography variant='p'>
          {format_rupiah(data?.min_transaction)} - {format_rupiah(data?.max_transaction)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Trophy
