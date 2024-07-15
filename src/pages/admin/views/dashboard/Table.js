// ** MUI Imports
import { Box, Link } from '@mui/material'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import moment from 'moment'

const DashboardTable = ({ users = [] }) => {
  const statusObj = {
    1: { color: 'info' },
    9: { color: 'error' },
    1: { color: 'primary' },
    0: { color: 'warning' }
  }

  return (
    <Card>
      <Typography variant='h5' sx={{ pl: 5, pt: 5 }}>
        Data User
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>No Whatsapp</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tanggal Daftar</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.username}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.user_privilege_name}</TableCell>
                <TableCell>
                  <Link href={`https://wa.me/${row.merchant_wa.replace(/^0/, '62')}`} target='_blank'>
                    {row.merchant_wa}
                  </Link>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{moment(row.created_at).format('ddd, DD MMMM YYYY hh:mm')}</TableCell>
                <TableCell>
                  <Chip
                    label={row.is_active ? 'Active' : 'Inactive'}
                    color={statusObj[row.is_active].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
