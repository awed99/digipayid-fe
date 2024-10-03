// ** Icon imports
import AccountMultipleOutline from 'mdi-material-ui/AccountMultipleOutline'
import BookOpenVariant from 'mdi-material-ui/BookOpenVariant'
import Cash100 from 'mdi-material-ui/Cash100'
import InvoiceTextCheckOutline from 'mdi-material-ui/InvoiceTextCheckOutline'
import Storefront from 'mdi-material-ui/Storefront'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'

const navigation = () => {
  return [
    {
      sectionTitle: 'Home'
    },
    {
      title: 'Dashboard',
      icon: ViewDashboard,
      path: '/affiliator'
    },
    {
      sectionTitle: 'Merchants'
    },
    {
      title: 'List Merchant',
      icon: Storefront,
      path: '/affiliator/master/list-merchant'
    },
    {
      sectionTitle: 'Laporan Affiliator'
    },
    {
      title: 'Withdraw Affiliator',
      icon: Cash100,
      path: '/affiliator/withdraw-affiliator'
    },
    {
      title: 'Jurnal Affiliator',
      icon: BookOpenVariant,
      path: '/affiliator/jurnal-keuangan'
    },
    {
      sectionTitle: 'Transaksi Merchants'
    },
    {
      title: 'List Transaksi',
      icon: InvoiceTextCheckOutline,
      path: '/affiliator/list-transaksi'
    },
    {
      sectionTitle: 'Master Affiliator'
    },
    {
      title: 'User',
      icon: AccountMultipleOutline,
      path: '/affiliator/master/user'
    }
  ]
}

export default navigation
