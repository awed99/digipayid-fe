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
import { Dvr } from '@mui/icons-material'

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
      title: 'Cari Dokumen',
      icon: FileDocumentMultipleOutline,
      path: '/' + store.get('module') + '/dokumen'
    },
    {
      title: 'Dokumen Peraturan',
      icon: FileDocumentEditOutline,
      children: [
        {
          title: 'Kemenkeu',
          icon: Dvr,
          path: '/' + store.get('module') + '/dokumen-peraturan/kemenkeu'
        },
        {
          title: 'Kemhan',
          icon: Dvr,
          path: '/' + store.get('module') + '/dokumen-peraturan/kemhan'
        },
        {
          title: 'Mabesad',
          icon: Dvr,
          path: '/' + store.get('module') + '/dokumen-peraturan/mabesad'
        },
        {
          title: 'Ditkuad',
          icon: Dvr,
          path: '/' + store.get('module') + '/dokumen-peraturan/ditkuad'
        }
      ]
    },
    {
      sectionTitle: 'Master'
    },
    {
      title: 'Kategori Dokumen',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/kategori-dokumen'
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
    },
    {
      title: 'DALWASKU KUKOTAMA BALAKUS',
      icon: FileSign,
      path: '/' + store.get('module') + '/master/dalwasku'
    }
  ]
}

export default navigation
