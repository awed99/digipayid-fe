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
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import Summarize from '@mui/icons-material/Summarize'

import ModalDialog from '/src/components/dialog'

// ** Demo Components Imports
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

import { DataGrid, GridToolbar, GridActionsCellItem, GridColumnGroupingModel } from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator'

const MUITable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)

  const columns = [
    { field: 'no', headerName: 'No', width: 50 },
    { field: 'kukotama', headerName: 'Kukotama', width: 100 },
    {
      field: 'intl',
      headerName: 'INTL',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'ops',
      headerName: 'OPS',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'pers',
      headerName: 'PERS',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'log',
      headerName: 'LOG',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'ter',
      headerName: 'TER',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'progar',
      headerName: 'PROGAR',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'perben',
      headerName: 'PEBEN',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'tup',
      headerName: 'TUP',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'pantau',
      headerName: 'PAN TAU',
      width: 100,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
    {
      field: 'ket',
      headerName: 'Ket',
      width: 50,
      align: 'left'

      // format: value => value.toLocaleString('en-US')
    },
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

  const columnGroupingModel = [
    {
      groupId: 'Temuan',
      description: '',
      children: [
        { field: 'intl' },
        { field: 'ops' },
        { field: 'pers' },
        { field: 'log' },
        { field: 'ter' },
        { field: 'progar' },
        { field: 'perben' }
      ]
    },
    {
      groupId: 'Tindak Lanjut',
      children: [{ field: 'tup' }, { field: 'pantau' }]
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link>Tindak Lanjut Current Audit</Link>
        </Typography>
        <Typography variant='body2'>Data Tindak Lanjut Current Audit</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Kumpulan Dokumen Peraturan Kemenkeu' titleTypographyProps={{ variant: 'h6' }} /> */}

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              experimentalFeatures={{ columnGrouping: true }}
              columnGroupingModel={columnGroupingModel}
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
        titleModal='Detail Data Tindak Lanjut Current Audit'
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmitFunction={() => setOpenModal(false)}
      >
        <Box style={{ width: 550 }}>Detail Data Tindak Lanjut Current Audit</Box>
      </ModalDialog>
    </Grid>
  )
}

export default MUITable
