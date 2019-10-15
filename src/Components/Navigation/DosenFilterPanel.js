import React, {useEffect, useState} from "react";
import clsx from "clsx";
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import {MultipleSelect} from "react-select-material-ui";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import FilterPanel from "../FilterPanel";

const statusKeaktifanPegawaiListURL = process.env.REACT_APP_API_URL + "/v1/references/status-keaktifan-pegawai";
const statusKepegawaianListURL = process.env.REACT_APP_API_URL + "/v1/references/status-ikatan-kerja";

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

const DosenFilterPanel = ({onSaveFilter}) => {
  const classes = styles();
  const [statusKeaktifan, setStatusKeaktifan] = useState({ data: [] });
  const [selectedStatusKeaktifan, setSelectedStatusKeaktifan] = useState([]);
  const [statusIkatanKerja, setStatusIkatankerja] = useState({ data: [] });
  const [selectedStatusIkatanKerja, setSelectedStatusIkatankerja] = useState([]);

  useEffect(() => {
    axios.get(statusKeaktifanPegawaiListURL).then(response => setStatusKeaktifan(response.data));
    axios.get(statusKepegawaianListURL).then(response => setStatusIkatankerja(response.data));
  }, []);

  const handleSelectKeaktifan = selected => {
    setSelectedStatusKeaktifan(selected);
  };

  const handleSelectIkatanKerja = selected => {
    setSelectedStatusIkatankerja(selected);
  };

  const handleResetFilter = () => {
    setSelectedStatusIkatankerja([]);
    onSaveFilter({
      statusKeaktifan: selectedStatusKeaktifan,
      statusIkatanKerja: selectedStatusIkatanKerja,
    });
  };

  const handleSaveFilter = () => {
    onSaveFilter({
      statusKeaktifan: selectedStatusKeaktifan,
      statusIkatanKerja: selectedStatusIkatanKerja,
    });
  };

  return (
    <FilterPanel title="Filter Data Dosen">
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Status Keaktifan Pegawai</Typography>
        </div>
        <div className={classes.column} style={{marginLeft: "-10px"}}>
          <MultipleSelect
            label="Pilih Status Keaktifan"
            options={statusKeaktifan.data.map(status => status.status)}
            values={selectedStatusKeaktifan}
            onChange={handleSelectKeaktifan}
            SelectProps={{
              msgNoOptionsAvailable: "Semua status keaktifan sudah dipilih",
              msgNoOptionsMatchFilter: "Tidak ada status keaktifan yang sesuai dengan pencarian"
            }}
          />
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Pilih status keaktifan untuk di filter
            <br/>
            <a href="#learn-more" className={classes.link}>
              Learn more
            </a>
          </Typography>
        </div>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Status Ikatan Kerja Pegawai</Typography>
        </div>
        <div className={classes.column} style={{marginLeft: "-10px"}}>
          <MultipleSelect
            label="Pilih Status Ikatan Kerja"
            options={statusIkatanKerja.data.map(status => status.status)}
            values={selectedStatusIkatanKerja}
            onChange={handleSelectIkatanKerja}
            SelectProps={{
              msgNoOptionsAvailable: "Semua status ikatan kerja sudah dipilih",
              msgNoOptionsMatchFilter: "Tidak ada status ikatan kerja yang sesuai dengan pencarian"
            }}
          />
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Pilih status ikatan kerja untuk di filter
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

export default DosenFilterPanel;