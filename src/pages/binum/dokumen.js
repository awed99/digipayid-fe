// ** MUI Imports
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
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const columns = [
    { id: 'no', label: '#', minWidth: 10 },
    { id: 'judul', label: 'Judul', minWidth: 120 },
    {
      id: 'no_surat',
      label: 'No/Tanggal',
      minWidth: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      id: 'kategori',
      label: 'Kategory',
      minWidth: 150,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      id: 'tahun',
      label: 'Tahun',
      minWidth: 30,
      align: 'left'

      // format: value => value.toFixed(2)
    },
    {
      id: 'proses',
      label: 'Proses',
      minWidth: 30,
      align: 'left'

      // format: value => value.toFixed(2)
    },
    {
      id: 'publikasi',
      label: 'Publikasi',
      minWidth: 30,
      align: 'left'

      // format: value => value.toFixed(2)
    },
    {
      id: 'tentang',
      label: 'Tentang',
      minWidth: 120,
      align: 'left'

      // format: value => value.toFixed(2)
    }
  ]

  const createData = (no, judul, no_surat, kategori, tahun, proses, publikasi, tentang) => {
    // const density = population / size

    return { no, judul, no_surat, kategori, tahun, proses, publikasi, tentang }
  }

  const rows = [
    createData(
      1,
      'Sample Judul 1',
      'Sample No. Surat 1',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 1'
    ),
    createData(
      2,
      'Sample Judul 2',
      'Sample No. Surat 2',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 2'
    ),
    createData(
      3,
      'Sample Judul 3',
      'Sample No. Surat 3',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 3'
    ),
    createData(
      4,
      'Sample Judul 4',
      'Sample No. Surat 4',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 4'
    ),
    createData(
      5,
      'Sample Judul 5',
      'Sample No. Surat 5',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 5'
    ),
    createData(
      6,
      'Sample Judul 6',
      'Sample No. Surat 6',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 6'
    ),
    createData(
      7,
      'Sample Judul 7',
      'Sample No. Surat 7',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 7'
    ),
    createData(
      8,
      'Sample Judul 8',
      'Sample No. Surat 8',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 8'
    ),
    createData(
      9,
      'Sample Judul 9',
      'Sample No. Surat 9',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 9'
    ),
    createData(
      10,
      'Sample Judul 10',
      'Sample No. Surat 10',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 10'
    ),
    createData(
      11,
      'Sample Judul 11',
      'Sample No. Surat 11',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 11'
    ),
    createData(
      12,
      'Sample Judul 12',
      'Sample No. Surat 12',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 12'
    ),
    createData(
      13,
      'Sample Judul 13',
      'Sample No. Surat 13',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 13'
    ),
    createData(
      14,
      'Sample Judul 14',
      'Sample No. Surat 14',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 14'
    ),
    createData(
      15,
      'Sample Judul 15',
      'Sample No. Surat 15',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 15'
    ),
    createData(
      16,
      'Sample Judul 16',
      'Sample No. Surat 16',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 16'
    ),
    createData(
      17,
      'Sample Judul 17',
      'Sample No. Surat 17',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 17'
    ),
    createData(
      18,
      'Sample Judul 18',
      'Sample No. Surat 18',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 18'
    ),
    createData(
      19,
      'Sample Judul 19',
      'Sample No. Surat 19',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 19'
    ),
    createData(
      20,
      'Sample Judul 20',
      'Sample No. Surat 20',
      'Sample Kategory',
      '2023',
      '2/20',
      'Sudah Terpublikasi',
      'Sample Keterangan 20'
    ),
    createData(
      21,
      'Sample Judul 21',
      'Sample No. Surat 21',
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
        <Typography variant='body2'>Semua Dokumen</Typography>
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
    </Grid>
  )
}

export default MUITable
