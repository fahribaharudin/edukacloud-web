import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FilterPanel from "../Navigation/MahasiswaFilterPanel";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import AccountBox from '@material-ui/icons/AccountBox';
import axios from "axios";
import Auth from "../../Auth";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";

const mahasiswaListAPIURL = process.env.REACT_APP_API_URL + "/v1/mahasiswa";
const styles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    minWidth: 1024,
  },
  title: {
    flex: '0 0 auto',
  },
  spacer: {
    flex: '1 1 100%',
  },
  input: {
    textAlign: "right",
  },
  loading: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const Mahasiswa = () => {
  const classes = styles();
  const [mahasiswaList, setMahasiswaList] = useState({data: [], total: 0});
  const [query, setQuery] = useState({take: 5, page: 1});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const fields = [
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

  useEffect(() => {
    loadData(mahasiswaListAPIURL, query);
  }, [query]);

  const loadData = (url, query) => {
    let queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
    setLoading(true);

    axios.get(url + "?" + queryString, {
      headers: {Authorization: "Bearer " + Auth.getAccessToken().access_token}
    }).then(response => {
      setMahasiswaList({data: response.data.data, total: response.data.meta.pagination.total});
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleChangePage = (event, newPage) => {
    setQuery({
      ...query, ...{
        take: query.take,
        page: newPage +1,
      }
    });
  };

  const handleChangeRowsPerPage = event => {
    setQuery({
      ...query, ...{
        take: event.target.value,
        page: 1,
      }
    });
  };

  const handleChangeFilter = filterQuery => {
    setQuery({...query, ...filterQuery})
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <div className={classes.root}>
          <FilterPanel onSaveFilter={handleChangeFilter}/>
          <Paper className={classes.paper}>
            <Toolbar style={{display: "flex"}}>
              <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                  Daftar Mahasiswa
                </Typography>
              </div>
              <div className={classes.spacer}/>
              <Input
                placeholder="Search nama"
                type="search"
                value={search}
                endAdornment={
                  search === "" ? (
                    <InputAdornment position="start">
                      <SearchIcon color="disabled"/>
                    </InputAdornment>
                  ) : ""
                }
                onChange={e => {
                  setSearch(e.target.value);
                  if (e.target.value === "") {
                    delete query.searchBy;
                    delete query.search;
                    loadData(mahasiswaListAPIURL, query);
                    setQuery(query);
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 13 && search !== "") {
                    setQuery({ ...query, ...{
                      searchBy: "nama",
                      search: search
                    }});
                  }
                }}
              />
            </Toolbar>
            <Table size={"small"} className={classes.table}>
              <TableHead>
                <TableRow>
                  {fields.map((field, key) => <TableCell key={key} align={field.align}>{field.label}</TableCell>)}
                  <TableCell align={"right"}>{""}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  (mahasiswaList.data.length !== 0) ? mahasiswaList.data.map(row => (
                    <TableRow key={row.id}>
                      {
                        fields.map((field, key) => {
                          let fieldNames = field.name.split(".");
                          return <TableCell key={key} align={field.align}>
                            {field.render(fieldNames.length === 1 ? row[field.name] : row[fieldNames[0]][fieldNames[1]])}
                          </TableCell>
                        })
                      }
                      <TableCell align={"right"}>
                        <Tooltip title={"Detail"}>
                          <IconButton component="span">
                            <AccountBox/>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={fields.length} align="center" size="medium">
                        <Typography color="inherit" variant="body2">No Data</Typography>
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
            {loading ? <LinearProgress/> : ""}
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={mahasiswaList.total}
              rowsPerPage={query.take}
              page={query.page - 1}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};

export default Mahasiswa;