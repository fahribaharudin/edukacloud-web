import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FilterPanel from "../Navigation/MataKuliahFilterPanel";
import DataTable from "../DataTable";

const mataKuliahListAPIURL = process.env.REACT_APP_API_URL + "/v1/mata-kuliah";
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

const MataKuliah = () => {
  const classes = styles();
  const [filterQuery, setFilterQuery] = useState({take: 5, page: 1});
  const tableFields = [
    {label: "Nama", name: "nama", align: "left", render: string => string},
    {label: "Kode MK", name: "kode", align: "center", render: string => string},
    {label: "Jenis MK", name: "jenis", align: "center", render: string => string},
    {label: "SKS", name: "sks", align: "center", render: string => string},
    {label: "Jenjang", name: "jenjang_pendidikan", align: "center", render: string => string},
    {label: "Prodi", name: "prodi.nama", align: "left", render: string => string},
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
              <Typography color="textPrimary">Mata Kuliah</Typography>
            </Breadcrumbs>
          </Box>
          <FilterPanel onSaveFilter={handleChangeFilter}/>
          <Paper className={classes.paper}>
            <DataTable
              title="Daftar Mata Kuliah"
              listAPIURL={mataKuliahListAPIURL}
              fields={tableFields}
              icon={<BookmarkIcon/>}
              filterQuery={filterQuery}
            />
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default MataKuliah;