import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: "center",
  },
  fixedHeight: {
    height: 540,
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
          <Typography variant={"h5"} align={"center"} color={"primary"}>
            Welcome to EdukaCloud, Admin!
          </Typography>
          <Typography variant={"body1"} align={"center"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Welcome;