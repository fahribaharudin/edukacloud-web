import React, {useState} from "react"
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DataTable from "../DataTable";
import Paper from "@material-ui/core/Paper";
import DosenFilterPanel from "../Navigation/DosenFilterPanel";

const dosenListAPIURL = process.env.REACT_APP_API_URL + "/v1/dosen";
const styles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Dosen = () => {
  const classes = styles();
  const [filterQuery, setFilterQuery] = useState({take: 5, page: 1});
  const tableFields = [
    {label: "Nama", name: "nama", align: "left", render: string => string},
    {label: "NIDN", name: "nidn", align: "center", render: string => string},
    {label: "Jenis Kelamin", name: "jenis_kelamin", align: "center", render: string => string === "L" ? "Laki Laki" : "Perempuan"},
    {label: "Tempat Lahir", name: "tempat_lahir", align: "center", render: string => string.toUpperCase()},
    {label: "Tanggal Lahir", name: "tanggal_lahir", align: "center", render: string => string},
    {label: "Status", name: "status", align: "center", render: string => string.toUpperCase()},
    {label: "Ikatan Kerja", name: "ikatan_kerja", align: "left", render: string => string},
  ];

  const handleChangeFilter = filterQuery => {
    setFilterQuery({...filterQuery, ...filterQuery})
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <div className={classes.root}>
          <Box mb={3}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb">
              <Link color="inherit" href="/" onClick={e => {
              }}>
                Dashboard
              </Link>
              <Typography color="textPrimary">Dosen</Typography>
            </Breadcrumbs>
          </Box>
          <DosenFilterPanel onSaveFilter={handleChangeFilter}/>
          <Paper className={classes.paper}>
            <DataTable
              title="Daftar Dosen"
              listAPIURL={dosenListAPIURL}
              fields={tableFields}
              filterQuery={filterQuery}
            />
          </Paper>
        </div>
      </Grid>
    </Grid>
  )
};

export default Dosen;