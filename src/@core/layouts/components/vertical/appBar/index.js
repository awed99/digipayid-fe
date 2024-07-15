// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { styled, useTheme } from '@mui/material/styles'

import { generateSignature } from '/helpers/general'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}))

const LayoutAppBar = props => {
  // ** Hooks
  const router = useRouter()

  const checkSession = async () => {
    const _uri = '/api/check-auth'
    const _secret = await generateSignature(_uri)

    fetch(`${_uri}`, {
      method: 'POST',
      headers: {
        'x-signature': _secret?.signature,
        'x-timestamp': _secret?.timestamp
      },
      body: JSON.stringify({ email: JSON.parse(localStorage.getItem('data-module'))?.email })
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res)

        if (!res?.auth?.user || !res?.auth?.token) {
          router.push('/auth')
        }
      })
      .catch(() => false)

    // setTimeout(() => checkSession(), 1000)
  }

  useEffect(() => {
    const pathAuth = router?.pathname.split('/')[1]
    if (pathAuth !== 'auth') {
      // checkSession()
    }
  }, [router?.pathname])

  // ** Props
  const { settings, verticalAppBarContent: userVerticalAppBarContent } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <AppBar elevation={0} color='default' className='layout-navbar' position='static'>
      <Toolbar
        className='navbar-content-container'
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
          })
        }}
      >
        {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar
