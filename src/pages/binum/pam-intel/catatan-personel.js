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
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import Summarize from '@mui/icons-material/Summarize'
import Close from 'mdi-material-ui/Close'

import ModalDialog from '/src/components/dialog'

// ** Demo Components Imports
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const columns = [
    { field: 'no', headerName: 'No', width: 50 },
    { field: 'nama', headerName: 'Nama', width: 200 },
    {
      field: 'nrp',
      headerName: 'NRP/NIP',
      width: 150,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'pkt',
      headerName: 'Pangkat',
      width: 150,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'jabatan',
      headerName: 'Jabatan',
      width: 150,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'kesatuan',
      headerName: 'Kesatuan',
      width: 150,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'jumlahpelanggaran',
      headerName: 'Jumlah Kasus',
      width: 150,
      align: 'left',
      renderCell: params => <Chip label={params?.value} color={params?.value > 0 ? 'error' : 'success'} />

      // format: value => value.toFixed(2)
    },
    ,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (1 == 0) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'success'
              }}

              // onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              color='error'

              // onClick={handleCancelClick(id)}
            />
          ]
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<Summarize />}
            label='Edit'
            className='textPrimary'
            color='primary'
            onClick={() => setOpenModal(id)}
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label='Delete'
            color='error'
            onClick={() => setOpenModalDelete(id)}

            // onClick={handleDeleteClick(id)}
          />
        ]
      }
    }
  ]

  const rows = [
    {
      no: 1,
      id: 63,
      uuid: '5aa4775a-2a52-4a6c-8122-ace5dd47c13e',
      nama: 'IR. Nasution',
      pkt: 'Letda',
      nrp: '123457',
      jabatan: 'kasi',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 1,
      picture_url: 'http://104.237.11.170:3210/upload/user/2023/06/14/user_f8b222d0-ff6a-4970-93fa-deaf2dff7e2a.jpeg',
      created_date: '2023-06-14T06:35:08.000Z',
      Riwayat: [
        {
          id: 1,
          uuid: '99a51ca7-07a2-4b5e-a9d6-369660545640',
          id_personel: 63,
          jenis_gar: {
            uuid: '46cf77e3-ac77-4201-93f2-efc2d19cec8e',
            nama: 'Perkelahian AD x Penduduk'
          },
          macam_kum: {
            uuid: 'dc7f037a-e33d-43ef-866e-315f20e9a39c',
            nama: 'Sanksi Perdata'
          },
          status_kum: {
            uuid: '2615205d-f1ca-46af-9524-30a54036f1c3',
            nama: 'Dalam Proses OTMIL'
          },
          bentuk_sur: {
            uuid: '6d02ee9b-79cd-4f5a-8110-0390e0c80c79',
            nama: 'SKEP KUMPIL'
          },
          tgl_kejadian: '2023-06-16',
          sumber: 'sss',
          isi: 'tes'
        }
      ]
    },
    {
      no: 2,
      id: 59,
      uuid: 'eb42543d-38c2-4066-ab1d-5f9fa68e037a',
      nama: 'alfi ',
      pkt: 'Letda',
      nrp: '123456',
      jabatan: 'kasi',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2023/02/08/user_00a2260d-97e8-40c3-b56f-a156f2ee4bcc.jpeg',
      created_date: '2023-02-08T01:51:11.000Z',
      Riwayat: []
    },
    {
      no: 3,
      id: 54,
      uuid: '087176d1-0d5f-436e-8cdf-c6b92a0f5b29',
      nama: 'Davi',
      pkt: 'Serda',
      nrp: '101011',
      jabatan: 'kopral',
      kesatuan: 'PUSDIKKU',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2022/12/07/user_46788671-add5-4038-856f-3a3223e92461.jpeg',
      created_date: '2022-12-07T04:43:17.000Z',
      Riwayat: []
    },
    {
      no: 4,
      id: 53,
      uuid: 'a83b37a7-6e45-4f09-a2cb-cb5e268b6f19',
      nama: 'Amir',
      pkt: 'Mayor',
      nrp: '1920018560876',
      jabatan: 'Kabag',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2022/11/14/user_69fca395-dde2-466b-80eb-12d182bc57c0.jpeg',
      created_date: '2022-11-14T07:53:39.000Z',
      Riwayat: []
    },
    {
      no: 5,
      id: 52,
      uuid: 'e8c472d9-9669-475d-b9f8-034d947b95da',
      nama: 'Alfi Junaedi',
      pkt: 'Kolonel',
      nrp: '01230123',
      jabatan: 'Kabagren',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2022/11/08/user_73a7c1f4-0742-4680-9247-ee14bac27738.jpeg',
      created_date: '2022-11-08T01:25:27.000Z',
      Riwayat: []
    },
    {
      no: 6,
      id: 51,
      uuid: '85857366-9dba-4586-a448-85455bdcfbbb',
      nama: 'Rizki Fajriawan',
      pkt: 'Kopral',
      nrp: '01230120',
      jabatan: 'Kabag Pesuruh',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2022/11/07/user_3c66cb52-f142-46d1-b8de-f8e81bfa02fc.jpeg',
      created_date: '2022-11-07T07:00:32.000Z',
      Riwayat: []
    },
    {
      no: 7,
      id: 48,
      uuid: '516c16ef-0f21-4af3-9d41-2ae668a7e63f',
      nama: 'Farhan',
      pkt: 'Letkol',
      nrp: '09092',
      jabatan: 'Kadis',
      kesatuan: 'KUPUS I',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2022/11/06/user_f54e0a62-3893-4d30-9236-112abdd32c09.jpeg',
      created_date: '2022-10-28T07:20:08.000Z',
      Riwayat: []
    },
    {
      no: 8,
      id: 47,
      uuid: '73586576-bfda-48ad-984d-4a86231d7b91',
      nama: 'Zaki',
      pkt: 'Mayor',
      nrp: '54545',
      jabatan: 'Kadis',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 0,
      picture_url: 'http://104.237.11.170:3210/upload/user/2022/11/03/user_86b10eb9-8e19-4913-bde5-f794b312f793.jpeg',
      created_date: '2022-10-28T07:17:39.000Z',
      Riwayat: []
    },
    {
      no: 9,
      id: 39,
      uuid: '446d5990-559d-4911-a108-f30e88b6d1ab',
      nama: 'Sudirman',
      pkt: 'Jendral',
      nrp: '0987621',
      jabatan: 'serda',
      kesatuan: 'DITKUAD',
      jumlahpelanggaran: 0,
      picture_url: '',
      created_date: '2022-10-26T04:01:33.000Z',
      Riwayat: []
    }
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
  }))

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(4)
    }
  }))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>List Catatan Personel</Link>
        </Typography>
        <Typography variant='body2'>List Catatan Personel</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Kumpulan Dokumen Peraturan Kemenkeu' titleTypographyProps={{ variant: 'h6' }} /> */}

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/* <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='Kumpulan Dokumen Peraturan'>
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
            /> */}

            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true
                }
              }}
              sx={{ pt: 2 }}
            />
          </Paper>
        </Card>
      </Grid>

      <ModalDialog
        titleModal='Delete Confirmation'
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        handleSubmitFunction={() => setOpenModalDelete(false)}
      >
        <Box style={{ width: 550 }}>Are you sure want to delete ?</Box>
      </ModalDialog>

      <ModalDialog
        titleModal='Detail Catatan Personel'
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => setOpenModal(false)}
      >
        <Box
          style={{
            width: 'fit-content'
          }}
        >
          <CardContent>
            <form>
              <Grid container spacing={7}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                    <Box>
                      <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                        Upload New Photo
                        <input
                          hidden
                          type='file'
                          onChange={onChange}
                          accept='image/png, image/jpeg'
                          id='account-settings-upload-image'
                        />
                      </ButtonStyled>
                      <ResetButtonStyled
                        color='error'
                        variant='outlined'
                        onClick={() => setImgSrc('/images/avatars/1.png')}
                      >
                        Reset
                      </ResetButtonStyled>
                      <Typography variant='body2' sx={{ marginTop: 5 }}>
                        Allowed PNG or JPEG. Max size of 800K.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Username' placeholder='johnDoe' defaultValue='johnDoe' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Name' placeholder='John Doe' defaultValue='John Doe' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johnDoe@example.com'
                    defaultValue='johnDoe@example.com'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select label='Role' defaultValue='admin'>
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='author'>Author</MenuItem>
                      <MenuItem value='editor'>Editor</MenuItem>
                      <MenuItem value='maintainer'>Maintainer</MenuItem>
                      <MenuItem value='subscriber'>Subscriber</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label='Status' defaultValue='active'>
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
                </Grid>

                {openAlert ? (
                  <Grid item xs={12} sx={{ mb: 3 }}>
                    <Alert
                      severity='warning'
                      sx={{ '& a': { fontWeight: 400 } }}
                      action={
                        <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                          <Close fontSize='inherit' />
                        </IconButton>
                      }
                    >
                      <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                      <Link href='/' onClick={e => e.preventDefault()}>
                        Resend Confirmation
                      </Link>
                    </Alert>
                  </Grid>
                ) : null}

                {/* <Grid item xs={12}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }}>
                    Save Changes
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary'>
                    Reset
                  </Button>
                </Grid> */}
              </Grid>
            </form>

            <Divider />

            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true
                }
              }}
              sx={{ pt: 2 }}
            />
          </CardContent>
        </Box>
      </ModalDialog>
    </Grid>
  )
}

export default MUITable
