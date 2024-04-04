// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FileSign from 'mdi-material-ui/FileSign'
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import FileDocumentMultipleOutline from 'mdi-material-ui/FileDocumentMultipleOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import { AdminPanelSettings, DoubleArrow, Policy } from '@mui/icons-material'

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
      title: 'TL. Current Audit',
      icon: DoubleArrow,
      path: '/' + store.get('module') + '/tl-current-audit'
    },
    {
      title: 'TL. Post Audit',
      icon: DoubleArrow,
      path: '/' + store.get('module') + '/tl-post-audit'
    },
    {
      title: 'T. Internal',
      icon: Policy,
      path: '/' + store.get('module') + '/t-internal'
    },
    {
      title: 'T. BPK-RI',
      icon: Policy,
      path: '/' + store.get('module') + '/t-bpk-ri'
    },
    {
      title: 'T. ItJen Kemhan',
      icon: Policy,
      path: '/' + store.get('module') + '/t-itjen-kemhan'
    },
    {
      title: 'T. ItJen TNI AD',
      icon: Policy,
      path: '/' + store.get('module') + '/t-itjen-tni-ad'
    },
    {
      sectionTitle: 'Master'
    },
    {
      title: 'Template',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/template'
    },
    {
      title: 'Pengawasan Pimpinan',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/pengawasan'
    },
    {
      title: 'Hak Akses',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/hak-akses'
    },
    {
      title: 'User',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/user'
    }
  ]
}

export default navigation
