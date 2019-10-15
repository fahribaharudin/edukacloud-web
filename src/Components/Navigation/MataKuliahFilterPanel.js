import React, {useEffect, useState} from "react";
import FilterPanel from "../FilterPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import {MultipleSelect} from "react-select-material-ui";
import clsx from "clsx";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const prodiListAPIURL = process.env.REACT_APP_API_URL + "/v1/references/program-studi";

const styles = makeStyles(theme => ({
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    paddingLeft: theme.spacing(3),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const MataKuliahFilterPanel = ({onSaveFilter}) => {
  const classes = styles();
  const [prodiList, setProdilist] = useState({ data: [] });
  const [selectedProdi, setSelectedProdi] = useState([]);

  useEffect(() => {
    axios.get(prodiListAPIURL).then(response => setProdilist(response.data));
  }, []);

  const handleSelectProdi = selected => {
    setSelectedProdi(selected);
  };

  const handleResetFilter = () => {
    setSelectedProdi([]);
    onSaveFilter({
      prodi: selectedProdi,
    });
  };

  const handleSaveFilter = () => {
    onSaveFilter({
      prodi: selectedProdi,
    });
  };

  return (
    <FilterPanel expanded={true} title="Filter Data Mata Kuliah">
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Prodi</Typography>
        </div>
        <div className={classes.column} style={{marginLeft: "-10px"}}>
          <MultipleSelect
            label="Pilih prodi"
            options={prodiList.data.map(prodi => prodi.nama)}
            values={selectedProdi}
            onChange={handleSelectProdi}
            SelectProps={{
              msgNoOptionsAvailable: "Semua prodi sudah dipilih",
              msgNoOptionsMatchFilter: "Tidak ada prodi yang sesuai dengan pencarian"
            }}
          />
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Pilih program studi untuk di filter
            <br/>
            <a href="#learn-more" className={classes.link}>
              Learn more
            </a>
          </Typography>
        </div>
      </ExpansionPanelDetails>
      <Divider/>
      <ExpansionPanelActions>
        <Button size="small" onClick={handleResetFilter}>Reset Filter</Button>
        <Button size="small" color="primary" onClick={handleSaveFilter}>
          Simpan Filter
        </Button>
      </ExpansionPanelActions>
    </FilterPanel>
  )
};

export default MataKuliahFilterPanel