// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Demo Components Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CustomNoRowsOverlay from '/src/components/no-rows-table'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const columns = [
    { field: 'no', headerName: '#', width: 50 },
    { field: 'username', headerName: 'User', width: 350 },
    {
      field: 'status',
      headerName: 'Status',
      width: 'auto',
      renderCell: params => <Chip label={'Aktif'} color='primary' />
    }

    // {
    //   field: 'proses',
    //   headerName: 'Proses',
    //   minWidth: 30,
    //   width: 100,
    //   align: 'left',
    //   renderCell: params => <Chip label={params?.value} color='primary' />

    //   // format: value => value.toFixed(2)
    // },
  ]

  const createData = (id, no, product_category) => {
    return { id, no, product_category }
  }

  const rows0 = [createData(1, 1, 'Utama'), createData(2, 2, 'Tambahan')]
  const rows = []

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>User</Link>
        </Typography>
        <Typography variant='body2'>Semua User yang tersedia</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true
                }
              }}
              sx={{ pt: 2, minHeight: '350px', '--DataGrid-overlayHeight': '300px' }}
              disableRowSelectionOnClick
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
