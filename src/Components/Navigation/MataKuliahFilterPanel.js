import React, {useEffect, useState} from "react";
import clsx from "clsx";
import axios from "axios";
import {SingleSelect} from "react-select-material-ui";
import FilterPanel from "../FilterPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";

const prodiListAPIURL = process.env.REACT_APP_API_URL + "/v1/references/program-studi";
const kurikulumListAPIURL = process.env.REACT_APP_API_URL + "/v1/references/kurikulum";

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
  const [kurikulumList, setKurikulumList] = useState({ data: [] });
  const [prodiList, setProdiList] = useState({ data: [] });
  const [selectedKurikulumId, setSelectedKurikulumId] = useState("semua");
  const [selectedProdiId, setSelectedProdiId] = useState("semua");

  useEffect(() => {
    axios.get(kurikulumListAPIURL).then(response => {
      let kurikulumList = response.data;
      kurikulumList.data.unshift({id: "semua", nama: "Semua Kurikulum"});
      setKurikulumList(kurikulumList);
    });
    axios.get(prodiListAPIURL).then(response => {
      let prodiList = response.data;
      prodiList.data.unshift({id: "semua", nama: "Semua Prodi"});
      setProdiList(prodiList);
    });
  }, []);

  const handleChangeKurikulum = kurikulum => {
    onSaveFilter({
      kurikulumId: kurikulumList.data.filter(v => v.nama === kurikulum).pop().id,
      prodiId: selectedProdiId,
    });
    setSelectedKurikulumId(kurikulumList.data.filter(v => v.nama === kurikulum).pop().id);
  };

  const handleChangeProdi = prodi => {
    onSaveFilter({
      kurikulumId: selectedKurikulumId,
      prodiId: prodiList.data.filter(v => v.nama === prodi).pop().id,
    });
    setSelectedProdiId(prodiList.data.filter(v => v.nama === prodi).pop().id);
  };

  return (
    <FilterPanel expanded={true} title="Filter Data Mata Kuliah">
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Kurikulum</Typography>
        </div>
        <div className={classes.column} style={{marginLeft: "-10px"}}>
          <SingleSelect
            label={"Pilih Kurikulum"}
            options={kurikulumList.data.map(kurikulum => kurikulum.nama)}
            onChange={handleChangeKurikulum}
          />
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            Pilih kurikulum untuk di filter
            <br/>
            <a href="#learn-more" className={classes.link}>
              Learn more
            </a>
          </Typography>
        </div>
      </ExpansionPanelDetails>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Prodi</Typography>
        </div>
        <div className={classes.column} style={{marginLeft: "-10px"}}>
          <SingleSelect
            label={"Pilih Prodi"}
            options={prodiList.data.map(prodi => prodi.nama)}
            onChange={handleChangeProdi}
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
    </FilterPanel>
  )
};

export default MataKuliahFilterPanel