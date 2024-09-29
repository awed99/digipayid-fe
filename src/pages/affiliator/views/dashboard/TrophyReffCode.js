// ** MUI Imports
import { Alert, Snackbar } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  const [copied, setCopied] = useState(0)

  const [alertMessage, setAlertMessage] = useState({
    open: false,
    type: 'primary',
    message: ''
  })

  useEffect(() => {
    if (copied > 0) {
      setAlertMessage({
        open: true,
        type: 'success',
        message: 'Kode referal berhasil disalin'
      })
    }
  }, [copied])

  return (
    <Card sx={{ position: 'relative', overflow: 'hidden' }}>
      <CardContent>
        <Typography variant='h6'>Kode Referal</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          https://app.digipayid.com/auth/register?reff_code={reffCode}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {reffCode}
        </Typography>
        <CopyToClipboard
          text={'https://app.digipayid.com/auth/register?reff_code=' + reffCode}
          onCopy={() => setCopied(copied + 1)}
        >
          <Button size='small' variant='contained'>
            Salin Link Referal
          </Button>
        </CopyToClipboard>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/logo.png' />
      </CardContent>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={alertMessage?.open}
        autoHideDuration={3000}
        onClose={() =>
          setAlertMessage({
            open: false,
            type: alertMessage?.type,
            message: ''
          })
        }
      >
        <Alert variant='filled' severity={alertMessage?.type} sx={{ width: '100%' }}>
          {alertMessage?.message}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default Trophy
