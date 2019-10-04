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

import Auth from "../Auth";
// import Link from "@material-ui/core/Link";

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

const SideMenu = () => (
  <List>
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
    <Divider/>
    <ListSubheader inset>Operations</ListSubheader>
    <AuthButton/>
  </List>
);

export default SideMenu