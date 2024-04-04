// ** Icon imports
import AccountKeyOutline from 'mdi-material-ui/AccountKeyOutline'
import AccountMultipleOutline from 'mdi-material-ui/AccountMultipleOutline'
import BankCircleOutline from 'mdi-material-ui/BankCircleOutline'
import BankTransferOut from 'mdi-material-ui/BankTransferOut'
import BookOpenVariant from 'mdi-material-ui/BookOpenVariant'
import CashRefund from 'mdi-material-ui/CashRefund'
import CashRegister from 'mdi-material-ui/CashRegister'
import Cog from 'mdi-material-ui/Cog'
import InvoiceTextCheckOutline from 'mdi-material-ui/InvoiceTextCheckOutline'
import PackageVariant from 'mdi-material-ui/PackageVariant'
import PackageVariantClosedPlus from 'mdi-material-ui/PackageVariantClosedPlus'
import StoreSettingsOutline from 'mdi-material-ui/StoreSettingsOutline'
import ViewDashboard from 'mdi-material-ui/ViewDashboard'

const navigation = () => {
  return [
    {
      sectionTitle: 'Home'
    },
    {
      title: 'Dashboard',
      icon: ViewDashboard,
      path: '/'
    },
    {
      sectionTitle: 'Operator'
    },
    {
      title: 'Pembayaran',
      icon: CashRegister,
      path: '/pembayaran'
    },
    {
      title: 'List Transaksi',
      icon: InvoiceTextCheckOutline,
      path: '/list-transaksi'
    },
    {
      sectionTitle: 'Admin'
    },
    {
      title: 'Proses Kliring',
      icon: BankTransferOut,
      path: '/proses-kliring'
    },
    {
      title: 'Penarikan Dana',
      icon: CashRefund,
      path: '/penarikan-dana'
    },
    {
      title: 'Jurnal Keuangan',
      icon: BookOpenVariant,
      path: '/jurnal-keuangan'
    },
    {
      title: 'Pengaturan',
      icon: Cog,
      children: [
        {
          title: 'Merchant',
          icon: StoreSettingsOutline,
          path: '/pengaturan/merchant'
        }
      ]
    },
    {
      sectionTitle: 'Master'
    },
    {
      title: 'Metode Pembayaran',
      icon: BankCircleOutline,
      path: '/master/metode-pembayaran'
    },
    {
      title: 'Kategori Produk',
      icon: PackageVariant,
      path: '/master/kategori-produk'
    },
    {
      title: 'Produk',
      icon: PackageVariantClosedPlus,
      path: '/master/produk'
    },
    {
      title: 'Hak Akses',
      icon: AccountKeyOutline,
      path: '/master/hak-akses'
    },
    {
      title: 'User',
      icon: AccountMultipleOutline,
      path: '/master/user'
    }
  ]
}

export default navigation
