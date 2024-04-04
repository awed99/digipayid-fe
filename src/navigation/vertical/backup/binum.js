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
import {
  AdminPanelSettings,
  Description,
  Checklist,
  AllInbox,
  CurrencyExchange,
  PriceChange,
  RequestQuote
} from '@mui/icons-material'

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
      title: 'PAM/Intel',
      icon: AdminPanelSettings,
      children: [
        {
          title: 'Catatan Personel',
          icon: Description,
          path: '/' + store.get('module') + '/pam-intel/catatan-personel'
        },
        {
          title: 'Rekap Catatan Personel',
          icon: Checklist,
          path: '/' + store.get('module') + '/pam-intel/rekap-catatan-personel'
        }
      ]

      // path: '/' + store.get('module') + '/pam-intel'
    },
    {
      title: 'Logistik',
      icon: AllInbox,
      path: '/' + store.get('module') + '/logistik'
    },
    {
      title: 'Progar',
      icon: CurrencyExchange,
      children: [
        {
          title: 'Renbut Gaji',
          icon: PriceChange,
          path: '/' + store.get('module') + '/renbut-gaji'
        },
        {
          title: 'Tunkin',
          icon: RequestQuote,
          path: '/' + store.get('module') + '/tunkin'
        }
      ]

      // path: '/' + store.get('module') + '/progar'
    },
    {
      sectionTitle: 'Master'
    },
    {
      title: 'KUKOTAMA/SATKER',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/kukotama'
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
