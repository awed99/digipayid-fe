// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardUser from 'src/views/cards/CardUser'

// ** Demo Components Imports
import TableCustomized from 'src/views/tables/TableCustomized'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardUser />
      </Grid>
      
    </Grid>
  )
}

export default MUITable
