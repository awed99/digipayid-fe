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
    { id: 'template_name', label: 'Template Name', minWidth: 120 },
    { id: 'template_file', label: 'Template File', minWidth: 120 }
  ]

  const createData = (no, template_name, template_file) => {
    // const density = population / size

    return { no, template_name, template_file }
  }

  const rows = [
    createData(
      1,
      'Sample Template 1',
      'Sample File Excel 1.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 1'
    ),
    createData(
      2,
      'Sample Template 2',
      'Sample File Excel 2.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 2'
    ),
    createData(
      3,
      'Sample Template 3',
      'Sample File Excel 3.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 3'
    ),
    createData(
      4,
      'Sample Template 4',
      'Sample File Excel 4.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 4'
    ),
    createData(
      5,
      'Sample Template 5',
      'Sample File Excel 5.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 5'
    ),
    createData(
      6,
      'Sample Template 6',
      'Sample File Excel 6.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 6'
    ),
    createData(
      7,
      'Sample Template 7',
      'Sample File Excel 7.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 7'
    ),
    createData(
      8,
      'Sample Template 8',
      'Sample File Excel 8.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 8'
    ),
    createData(
      9,
      'Sample Template 9',
      'Sample File Excel 9.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 9'
    ),
    createData(
      10,
      'Sample Template 10',
      'Sample File Excel 10.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 10'
    ),
    createData(
      11,
      'Sample Template 11',
      'Sample File Excel 11.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 11'
    ),
    createData(
      12,
      'Sample Template 12',
      'Sample File Excel 12.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 12'
    ),
    createData(
      13,
      'Sample Template 13',
      'Sample File Excel 13.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 13'
    ),
    createData(
      14,
      'Sample Template 14',
      'Sample File Excel 14.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 14'
    ),
    createData(
      15,
      'Sample Template 15',
      'Sample File Excel 15.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 15'
    ),
    createData(
      16,
      'Sample Template 16',
      'Sample File Excel 16.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 16'
    ),
    createData(
      17,
      'Sample Template 17',
      'Sample File Excel 17.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 17'
    ),
    createData(
      18,
      'Sample Template 18',
      'Sample File Excel 18.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 18'
    ),
    createData(
      19,
      'Sample Template 19',
      'Sample File Excel 19.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 19'
    ),
    createData(
      20,
      'Sample Template 20',
      'Sample File Excel 20.xlsx',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 20'
    ),
    createData(
      21,
      'Sample Template 21',
      'Sample File Excel 21.xlsx',
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
          <Link>Template Dokumen</Link>
        </Typography>
        <Typography variant='body2'>
          <Button variant='contained' size='small' sx={{ marginRight: 3.5 }} onClick={() => setOpenModal(true)}>
            Tambah
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Template Dokumen' titleTypographyProps={{ variant: 'h6' }} />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='Template Dokumen'>
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
