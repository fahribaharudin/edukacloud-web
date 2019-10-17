import React from "react";
import {withRouter, NavLink} from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import Auth from "../../Auth";

const AuthButton = withRouter(({ history }) => (
  <ListItem button onClick={() => {
    Auth.signOut();
    history.push('/');
  }}>
    <ListItemIcon>
      <ExitToAppIcon/>
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItem>
));

const DashboardSideMenu = () => (
  <List>
    <ListSubheader inset>Akademik</ListSubheader>
    <ListItem component={NavLink} to={"/mahasiswa"}>
      <ListItemIcon>
        <PeopleAltIcon/>
      </ListItemIcon>
      <ListItemText primary="Mahasiswa" />
    </ListItem>
    <ListItem component={NavLink} to={"/dosen"}>
      <ListItemIcon>
        <PeopleAltIcon/>
      </ListItemIcon>
      <ListItemText primary="Dosen" />
    </ListItem>
    <ListItem component={NavLink} to={"/mata-kuliah"}>
      <ListItemIcon>
        <BookmarksIcon/>
      </ListItemIcon>
      <ListItemText primary="Mata Kuliah" />
    </ListItem>
    <Divider/>
    <ListSubheader inset>KRS</ListSubheader>
    <ListItem component={NavLink} to={"/kelas-kuliah"}>
      <ListItemIcon>
        <AppsIcon/>
      </ListItemIcon>
      <ListItemText primary="Kelas Kuliah" />
    </ListItem>
    <ListItem component={NavLink} to={"/semester"}>
      <ListItemIcon>
        <AppsIcon/>
      </ListItemIcon>
      <ListItemText primary="Peserta Kuliah" />
    </ListItem>
    <Divider/>
    <ListSubheader inset>Operations</ListSubheader>
    <ListItem component={NavLink} to={"/settings"}>
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <AuthButton/>
  </List>
);

export default DashboardSideMenu