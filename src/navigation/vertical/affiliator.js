// ** Icon imports
import AccountKeyOutline from 'mdi-material-ui/AccountKeyOutline'
import AccountMultipleOutline from 'mdi-material-ui/AccountMultipleOutline'
import BankCircleOutline from 'mdi-material-ui/BankCircleOutline'
import BankTransferOut from 'mdi-material-ui/BankTransferOut'
import BookOpenVariant from 'mdi-material-ui/BookOpenVariant'
import Cash100 from 'mdi-material-ui/Cash100'
import Cog from 'mdi-material-ui/Cog'
import InvoiceTextCheckOutline from 'mdi-material-ui/InvoiceTextCheckOutline'
import Storefront from 'mdi-material-ui/Storefront'
import StoreSettingsOutline from 'mdi-material-ui/StoreSettingsOutline'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'
import Wallet from 'mdi-material-ui/Wallet'
import WalletPlus from 'mdi-material-ui/WalletPlus'

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
      title: 'Merchant Users',
      icon: AccountMultipleOutline,
      path: '/affiliator/master/users'
    },
    {
      sectionTitle: 'Laporan Affiliator'
    },
    {
      title: 'Jurnal Affiliator',
      icon: BookOpenVariant,
      path: '/affiliator/jurnal-keuangan-affiliator'
    },
    {
      title: 'Pengaturan',
      icon: Cog,
      children: [
        {
          title: 'App',
          icon: StoreSettingsOutline,
          path: '/affiliator/pengaturan/merchant'
        }
      ]
    },
    {
      sectionTitle: 'Transaksi Affiliator'
    },
    {
      title: 'Withdraw Affiliator',
      icon: AccountMultipleOutline,
      path: '/affiliator/withdraw-affiliator'
    },
    {
      sectionTitle: 'Transaksi Merchants'
    },
    {
      title: 'Withdraw Request',
      icon: Cash100,
      path: '/affiliator/withdraw-request'
    },
    {
      title: 'List Transaksi',
      icon: InvoiceTextCheckOutline,
      path: '/affiliator/list-transaksi'
    },
    {
      title: 'Topup Merchants',
      icon: WalletPlus,
      path: '/affiliator/topup-merchants'
    },
    {
      sectionTitle: 'Laporan Merchants'
    },
    {
      title: 'Proses Kliring',
      icon: BankTransferOut,
      path: '/affiliator/proses-kliring'
    },
    {
      title: 'Dompet Digital',
      icon: Wallet,
      path: '/affiliator/dompet-digital'
    },
    {
      title: 'Jurnal Keuangan',
      icon: BookOpenVariant,
      path: '/affiliator/jurnal-keuangan'
    },
    {
      sectionTitle: 'Master Affiliator'
    },
    {
      title: 'Metode Pembayaran',
      icon: BankCircleOutline,
      path: '/affiliator/master/metode-pembayaran'
    },
    {
      title: 'Hak Akses',
      icon: AccountKeyOutline,
      path: '/affiliator/master/hak-akses'
    },
    {
      title: 'User',
      icon: AccountMultipleOutline,
      path: '/affiliator/master/user'
    }
  ]
}

export default navigation
