// ** Icon imports
import AccountMultipleOutline from 'mdi-material-ui/AccountMultipleOutline'
import BankTransferOut from 'mdi-material-ui/BankTransferOut'
import BookOpenVariant from 'mdi-material-ui/BookOpenVariant'
import Cash100 from 'mdi-material-ui/Cash100'
import InvoiceTextCheckOutline from 'mdi-material-ui/InvoiceTextCheckOutline'
import Storefront from 'mdi-material-ui/Storefront'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import Wallet from 'mdi-material-ui/Wallet'

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
      title: 'Dompet Digital',
      icon: Wallet,
      path: '/affiliator/dompet-digital'
    },
    {
      title: 'Jurnal Affiliator',
      icon: BookOpenVariant,
      path: '/affiliator/jurnal-keuangan'
    },
    {
      title: 'Proses Kliring',
      icon: BankTransferOut,
      path: '/affiliator/proses-kliring'
    },
    {
      title: 'Withdraw Affiliator',
      icon: Cash100,
      path: '/affiliator/withdraw'
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
