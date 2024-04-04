// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'

import store from 'store'

const navigation = () => {
  return [
    {
      sectionTitle: 'Pimpinan'
    },
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Dashboard',
      icon: ViewDashboard,
      path: '/' + store.get('module')
    },
    {
      sectionTitle: 'Operator'
    },
    {
      title: 'RH Mandiri',
      icon: AccountOutline,
      path: '/bincab/rh-mandiri'
    },
    {
      title: 'TOP DSPP',
      icon: AccountGroupOutline

      // path: '/sample/account-settings'
    },

    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/sample/account-settings'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/sample/pages/login',
    //   openInNewTab: true
    // },

    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/sample/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/sample/pages/error',
    //   openInNewTab: true
    // },
    {
      sectionTitle: 'Master'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/sample/typography'
    },
    {
      title: 'Icons',
      path: '/sample/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/sample/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/sample/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/sample/form-layouts'
    }
  ]
}

export default navigation
