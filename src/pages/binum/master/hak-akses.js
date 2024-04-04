// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** Demo Components Imports
import ModalDialog from 'src/components/dialog'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'

const MUITable = () => {
  // ** States
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const columns = [
    { id: 'no', label: '#', minWidth: 10 },
    { id: 'kukotama', label: 'Hak Akses', minWidth: 120 },
    { id: 'rayon', label: 'Status', minWidth: 120 }
  ]

  const createData = (no, kukotama, rayon) => {
    // const density = population / size

    return { no, kukotama, rayon }
  }

  const rows = [
    createData(
      1,
      'Sample Hak Akses 1',
      'Status Aktif 1',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 1'
    ),
    createData(
      2,
      'Sample Hak Akses 2',
      'Status Aktif 2',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 2'
    ),
    createData(
      3,
      'Sample Hak Akses 3',
      'Status Aktif 3',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 3'
    ),
    createData(
      4,
      'Sample Hak Akses 4',
      'Status Aktif 4',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 4'
    ),
    createData(
      5,
      'Sample Hak Akses 5',
      'Status Aktif 5',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 5'
    ),
    createData(
      6,
      'Sample Hak Akses 6',
      'Status Aktif 6',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 6'
    ),
    createData(
      7,
      'Sample Hak Akses 7',
      'Status Aktif 7',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 7'
    ),
    createData(
      8,
      'Sample Hak Akses 8',
      'Status Aktif 8',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 8'
    ),
    createData(
      9,
      'Sample Hak Akses 9',
      'Status Aktif 9',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 9'
    ),
    createData(
      10,
      'Sample Hak Akses 10',
      'Status Aktif 10',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 10'
    ),
    createData(
      11,
      'Sample Hak Akses 11',
      'Status Aktif 11',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 11'
    ),
    createData(
      12,
      'Sample Hak Akses 12',
      'Status Aktif 12',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 12'
    ),
    createData(
      13,
      'Sample Hak Akses 13',
      'Status Aktif 13',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 13'
    ),
    createData(
      14,
      'Sample Hak Akses 14',
      'Status Aktif 14',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 14'
    ),
    createData(
      15,
      'Sample Hak Akses 15',
      'Status Aktif 15',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 15'
    ),
    createData(
      16,
      'Sample Hak Akses 16',
      'Status Aktif 16',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 16'
    ),
    createData(
      17,
      'Sample Hak Akses 17',
      'Status Aktif 17',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 17'
    ),
    createData(
      18,
      'Sample Hak Akses 18',
      'Status Aktif 18',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 18'
    ),
    createData(
      19,
      'Sample Hak Akses 19',
      'Status Aktif 19',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 19'
    ),
    createData(
      20,
      'Sample Hak Akses 20',
      'Status Aktif 20',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 20'
    ),
    createData(
      21,
      'Sample Hak Akses 21',
      'Status Aktif 21',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 21'
    )
  ]

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
          <Link>Dokumen</Link>
        </Typography>
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ marginRight: 3.5 }} onClick={() => setOpenModal(true)}>
            Tambah
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Kumpulan Dokumen' titleTypographyProps={{ variant: 'h6' }} />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='Kumpulan Dokumen'>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id]

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      </Grid>

      <ModalDialog titleModal='Master Data' openModal={openModal} setOpenModal={setOpenModal}>
        <Box>
          <FormLayoutsIcons />
        </Box>
      </ModalDialog>
    </Grid>
  )
}

export default MUITable
