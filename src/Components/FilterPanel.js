import React, {useState} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  column: {
    flexBasis: '33.33%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
}));

const FilterPanel = (props) => {
  const classes = styles();
  const [expanded, setExpanded] = useState(props.expanded);

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1c-content"
          id="panel1c-header"
          onClick={e => setExpanded(!expanded)}
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{props.title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Pilih Filter Pencarian</Typography>
          </div>
        </ExpansionPanelSummary>
        {props.children}
      </ExpansionPanel>
    </div>
  );
};

FilterPanel.defaultProps = {
  expanded: false,
};

export default FilterPanel;