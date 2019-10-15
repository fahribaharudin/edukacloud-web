import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import FilterPanel from "../Navigation/MahasiswaFilterPanel";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DataTable from "../DataTable";

const mahasiswaListAPIURL = process.env.REACT_APP_API_URL + "/v1/mahasiswa";
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

const Mahasiswa = () => {
  const classes = styles();
  const [filterQuery, setFilterQuery] = useState({take: 5, page: 1});
  const tableFields = [
    {label: "Nama", name: "nama", render: string => string, align: "left"},
    {label: "NIM", name: "nim", render: string => string, align: "center"},
    {label: "Status", name: "status", render: string => string, align: "center"},
    {
      label: "Jenis Kelamin",
      name: "jenis_kelamin",
      render: string => string === "L" ? "Laki Laki" : "Perempuan",
      align: "center"
    },
    {label: "Tanggal Lahir", name: "tanggal_lahir", render: string => string, align: "center"},
    {label: "Tempat Lahir", name: "tempat_lahir", render: string => string, align: "center"},
    {label: "Prodi", name: "prodi.nama", render: string => string, align: "left"},
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
              <Link color="inherit" href="/" onClick={e => {}}>
                Dashboard
              </Link>
              <Typography color="textPrimary">Mahasiswa</Typography>
            </Breadcrumbs>
          </Box>
          <FilterPanel onSaveFilter={handleChangeFilter}/>
          <Paper className={classes.paper}>
            <DataTable
              title="Daftar Mahasiswa"
              listAPIURL={mahasiswaListAPIURL}
              filterQuery={filterQuery}
              fields={tableFields}
            />
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default Mahasiswa;