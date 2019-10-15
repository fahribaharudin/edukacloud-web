import React, {useEffect, useState} from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import axios from "axios";
import Auth from "../Auth";
import LinearProgress from "@material-ui/core/LinearProgress";
import TablePagination from "@material-ui/core/TablePagination";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Toolbar from "@material-ui/core/Toolbar";
import AccountBox from "@material-ui/icons/AccountBox";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core";

const styles = makeStyles(theme => ({
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

const DataTable = ({ title, listAPIURL, filterQuery, fields, withDetail, icon }) => {
  const classes = styles();
  const [listData, setListData] = useState({data: [], total: 0});
  const [query, setQuery] = useState({take: 5, page: 1});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(listAPIURL, {...filterQuery, ...query});
  }, [listAPIURL, filterQuery, query]);

  const loadData = (url, query) => {
    let queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');
    setLoading(true);

    axios.get(url + "?" + queryString, {
      headers: {Authorization: "Bearer " + Auth.getAccessToken().access_token}
    }).then(response => {
      setListData({data: response.data.data, total: response.data.meta.pagination.total});
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
        page: newPage + 1,
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

  return (
    <React.Fragment>
      <Toolbar style={{display: "flex"}}>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">{title}</Typography>
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
              loadData(listAPIURL, query);
              setQuery(query);
            }
          }}
          onKeyDown={e => {
            if (e.keyCode === 13 && search !== "") {
              setQuery({
                ...query, ...{
                  searchBy: "nama",
                  search: search
                }
              });
            }
          }}
        />
      </Toolbar>
      <Table size={"small"} className={classes.table}>
        <TableHead>
          <TableRow>
            {fields.map((field, key) => <TableCell key={key} align={field.align}>{field.label}</TableCell>)}
            {withDetail ? <TableCell align={"right"}>{""}</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (<TableRow><TableCell colSpan={fields.length + (withDetail ? 1 : 0)}><LinearProgress/></TableCell></TableRow>) : null}
          {
            (listData.data.length !== 0) ? listData.data.map(row => (
              <TableRow key={row.id}>
                {
                  fields.map((field, key) => {
                    let fieldNames = field.name.split(".");
                    return <TableCell key={key} align={field.align}>
                      {field.render(fieldNames.length === 1 ? row[field.name] : row[fieldNames[0]][fieldNames[1]])}
                    </TableCell>
                  })
                }
                {
                  withDetail ? (
                    <TableCell align={"right"}>
                      <Tooltip title={"Detail"}>
                        <IconButton component="span">
                          {icon}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  ) : null
                }
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={fields.length + (withDetail ? 1 : 0)} align="center" size="medium">
                  <Typography color="inherit" variant="body2">No Data</Typography>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={listData.total}
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
    </React.Fragment>
  );
};

DataTable.defaultProps = {
  withDetail: true,
  icon: <AccountBox/>,
};

export default DataTable;