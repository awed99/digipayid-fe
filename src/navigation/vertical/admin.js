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
      path: '/admin'
    },
    {
      sectionTitle: 'Affiliators'
    },
    {
      title: 'List Affiliator',
      icon: Storefront,
      path: '/admin/master/list-affiliator'
    },
    {
      title: 'Withdraw Affiliator Request',
      icon: Cash100,
      path: '/affiliator/withdraw-request'
    },
    {
      sectionTitle: 'Merchants'
    },
    {
      title: 'List Merchant',
      icon: Storefront,
      path: '/admin/master/list-merchant'
    },
    {
      title: 'Merchant Users',
      icon: AccountMultipleOutline,
      path: '/admin/master/users'
    },
    {
      sectionTitle: 'Laporan Admin'
    },
    {
      title: 'Jurnal Admin',
      icon: BookOpenVariant,
      path: '/admin/jurnal-keuangan-admin'
    },
    {
      title: 'Pengaturan',
      icon: Cog,
      children: [
        {
          title: 'App',
          icon: StoreSettingsOutline,
          path: '/admin/pengaturan/merchant'
        }
      ]
    },
    {
      sectionTitle: 'Transaksi Admin'
    },
    {
      title: 'Withdraw Admin',
      icon: AccountMultipleOutline,
      path: '/admin/withdraw-admin'
    },
    {
      sectionTitle: 'Transaksi Merchants'
    },
    {
      title: 'Withdraw Request',
      icon: Cash100,
      path: '/admin/withdraw-request'
    },
    {
      title: 'List Transaksi',
      icon: InvoiceTextCheckOutline,
      path: '/admin/list-transaksi'
    },
    {
      title: 'Topup Merchants',
      icon: WalletPlus,
      path: '/admin/topup-merchants'
    },
    {
      sectionTitle: 'Laporan Merchants'
    },
    {
      title: 'Proses Kliring',
      icon: BankTransferOut,
      path: '/admin/proses-kliring'
    },
    {
      title: 'Dompet Digital',
      icon: Wallet,
      path: '/admin/dompet-digital'
    },
    {
      title: 'Jurnal Keuangan',
      icon: BookOpenVariant,
      path: '/admin/jurnal-keuangan'
    },
    {
      sectionTitle: 'Master Admin'
    },
    {
      title: 'Metode Pembayaran',
      icon: BankCircleOutline,
      path: '/admin/master/metode-pembayaran'
    },
    {
      title: 'Hak Akses',
      icon: AccountKeyOutline,
      path: '/admin/master/hak-akses'
    },
    {
      title: 'User',
      icon: AccountMultipleOutline,
      path: '/admin/master/user'
    }
  ]
}

export default navigation
