import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import axios from "axios";
import Auth from "../../Auth";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import LabelIcon from '@material-ui/icons/Label';
import IconButton from "@material-ui/core/IconButton";
import MataKuliahFilterPanel from "../Navigation/MataKuliahFilterPanel";

const mataKuliahListAPIURL = process.env.REACT_APP_API_URL + "/v1/mata-kuliah";
const kelasKuliahListByMataKuliahIDListAPIURl = process.env.REACT_APP_API_URL + "/v1/mata-kuliah/{mkId}/kelas-kuliah";
const styles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    // minHeight: "300px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  sider: {
    borderRight: '1px solid #e0e0e0',
    minHeight: "250px",
  },
  mkName: {
    textTransform: "capitalize",
  },
  mkIcon: {
    minWidth: "36px",
  }
}));

const KelasKuliah = () => {
  const classes = styles();
  const [filterQuery, setFilterQUery] = useState({});
  const [mataKuliahList, setMataKuliahList] = useState({data: []});
  const [selectedMataKuliahId, setSelectedMataKuliahId] = useState("none");
  const [kelasKuliahList, setKelasKuliahList] = useState({data: []});

  useEffect(() => {
    loadData(mataKuliahListAPIURL, filterQuery, resposne => setMataKuliahList(resposne.data));
    setKelasKuliahList({data: []});
    setSelectedMataKuliahId("none");
  }, [filterQuery]);

  useEffect(() => {
    if (selectedMataKuliahId !== "none") {
      loadData(kelasKuliahListByMataKuliahIDListAPIURl.replace("{mkId}", selectedMataKuliahId), {}, response => setKelasKuliahList(response.data));
    }
  }, [selectedMataKuliahId]);

  const loadData = (url, query, cb) => {
    let queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
    axios.get(url + "?" + queryString, {
      headers: {Authorization: "Bearer " + Auth.getAccessToken().access_token}
    }).then(response => {
      cb(response);
    }).catch(err => {
      console.log(err);
    })
  };

  const handleChangeFilter = filterQuery => {
    setFilterQUery(filterQuery);
  };

  const handleMataKuliahClick = (event, mkId) => {
    setSelectedMataKuliahId(mkId);
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
              <Typography color="textPrimary">Kelas Kuliah</Typography>
            </Breadcrumbs>
          </Box>
          <MataKuliahFilterPanel onSaveFilter={handleChangeFilter}/>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={3} className={classes.sider}>
                <List component="nav" subheader={<ListSubheader>Mata Kuliah</ListSubheader>}>
                  {mataKuliahList.data.map((mk, i) => (
                    <ListItem button key={i} onClick={e => handleMataKuliahClick(e, mk.id)}
                              selected={selectedMataKuliahId === mk.id}>
                      <ListItemIcon className={classes.mkIcon}>
                        <ArrowRightIcon/>
                      </ListItemIcon>
                      <ListItemText primary={mk.nama.toLowerCase()} className={classes.mkName}/>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={9}>
                <Box p={2}>
                  <Typography variant={"body2"} color={"textSecondary"}>
                    <Box component={"span"} fontWeight={"fontWeightMedium"}>
                      Kelas Kuliah
                    </Box>
                  </Typography>
                </Box>
                <Paper elevation={0} className={classes.paper}>
                  {
                    kelasKuliahList.data.length !== 0
                      ? (
                        <Table className={classes.table} aria-label="simple table" size={"small"}>
                          <TableHead>
                            <TableRow>
                              <React.Fragment>
                                <TableCell>Nama</TableCell>
                                <TableCell>Mata Kuliah</TableCell>
                                <TableCell>Prodi</TableCell>
                                <TableCell align={"center"}>Semester</TableCell>
                                <TableCell align={"center"}>SKS</TableCell>
                                <TableCell>{""}</TableCell>
                              </React.Fragment>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              kelasKuliahList.data.map((row, i) => (
                                <TableRow key={i}>
                                  <TableCell>Kelas {row.nama}</TableCell>
                                  <TableCell>{row.mata_kuliah}</TableCell>
                                  <TableCell>{row.prodi}</TableCell>
                                  <TableCell align={"center"}>{row.semester}</TableCell>
                                  <TableCell align={"center"}>{row.jumlah_sks}</TableCell>
                                  <TableCell align={"right"}><IconButton component="span"><LabelIcon/></IconButton></TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      )
                      : <Box ml={1}>
                          <Typography variant={"caption"} color={"primary"}>
                            Select Mata Kuliah to display data.
                          </Typography>
                        </Box>
                  }
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Grid>
    </Grid>
  )
};

export default KelasKuliah;