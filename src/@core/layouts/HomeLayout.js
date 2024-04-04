// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Components
import AppBar from './components/vertical/appBar'

// ** Component Import
// import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from '../../layouts/components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// Styled component for Blank Layout component
const HomeLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',

    minHeight: '93vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',

    minHeight: '93vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const HomeLayout = ({ children }) => {
  // ** Hooks
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const { settings, saveSettings } = useSettings()

  // ** Vars
  // const contentWidth = 'boxed'
  const props = {}

  // ** States
  const [navVisible, setNavVisible] = useState(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  return (
    <HomeLayoutWrapper className='layout-wrapper'>
      <AppBar
        toggleNavVisibility={toggleNavVisibility}
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalAppBarContent={(
          props // AppBar Content
        ) => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      />
      <Box className='app-content content-center' sx={{ minHeight: '93vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </HomeLayoutWrapper>
  )
}

export default HomeLayout
