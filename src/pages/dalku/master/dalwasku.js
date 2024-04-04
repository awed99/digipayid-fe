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
    { id: 'kukotama', label: 'Kukotama', minWidth: 120 },
    { id: 'rayon', label: 'Rayon', minWidth: 120 }
  ]

  const createData = (no, kukotama, rayon) => {
    // const density = population / size

    return { no, kukotama, rayon }
  }

  const rows = [
    createData(
      1,
      'Sample Kukotama 1',
      'Rayon 1',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 1'
    ),
    createData(
      2,
      'Sample Kukotama 2',
      'Rayon 2',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 2'
    ),
    createData(
      3,
      'Sample Kukotama 3',
      'Rayon 3',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 3'
    ),
    createData(
      4,
      'Sample Kukotama 4',
      'Rayon 4',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 4'
    ),
    createData(
      5,
      'Sample Kukotama 5',
      'Rayon 5',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 5'
    ),
    createData(
      6,
      'Sample Kukotama 6',
      'Rayon 6',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 6'
    ),
    createData(
      7,
      'Sample Kukotama 7',
      'Rayon 7',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 7'
    ),
    createData(
      8,
      'Sample Kukotama 8',
      'Rayon 8',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 8'
    ),
    createData(
      9,
      'Sample Kukotama 9',
      'Rayon 9',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 9'
    ),
    createData(
      10,
      'Sample Kukotama 10',
      'Rayon 10',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 10'
    ),
    createData(
      11,
      'Sample Kukotama 11',
      'Rayon 11',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 11'
    ),
    createData(
      12,
      'Sample Kukotama 12',
      'Rayon 12',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 12'
    ),
    createData(
      13,
      'Sample Kukotama 13',
      'Rayon 13',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 13'
    ),
    createData(
      14,
      'Sample Kukotama 14',
      'Rayon 14',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 14'
    ),
    createData(
      15,
      'Sample Kukotama 15',
      'Rayon 15',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 15'
    ),
    createData(
      16,
      'Sample Kukotama 16',
      'Rayon 16',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 16'
    ),
    createData(
      17,
      'Sample Kukotama 17',
      'Rayon 17',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 17'
    ),
    createData(
      18,
      'Sample Kukotama 18',
      'Rayon 18',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 18'
    ),
    createData(
      19,
      'Sample Kukotama 19',
      'Rayon 19',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 19'
    ),
    createData(
      20,
      'Sample Kukotama 20',
      'Rayon 20',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 20'
    ),
    createData(
      21,
      'Sample Kukotama 21',
      'Rayon 21',
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
