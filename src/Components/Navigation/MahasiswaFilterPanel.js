import React, {useEffect, useState} from "react";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {MultipleSelect} from "react-select-material-ui";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const prodiListAPIURL = process.env.REACT_APP_API_URL + "/v1/references/program-studi";
const statusMahasiswaListAPIURL = process.env.REACT_APP_API_URL + "/v1/references/status-mahasiswa";

const useStylesFilterPanel = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
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

const MahasiswaFilterPanel = ({onSaveFilter}) => {
  const classes = useStylesFilterPanel();
  const [prodiList, setProdilist] = useState({ data: [] });
  const [selectedProdi, setSelectedProdi] = useState([]);
  const [statusMahasiswa, setStatusMahasiswa] = useState({ data: [] });
  const [selectedStatusMahasiswa, setSelectedStatusMahasiswa] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    axios.get(prodiListAPIURL).then(response => setProdilist(response.data));
    axios.get(statusMahasiswaListAPIURL).then(response => setStatusMahasiswa(response.data));
  }, []);

  const handleSelectProdi = selected => {
    setSelectedProdi(selected);
  };

  const handleSelectStatusMahasiswa = selected => {
    setSelectedStatusMahasiswa(selected);
  };

  const handleChangeGender = gender => {
    setSelectedGender(gender);
  };

  const handleResetFilter = () => {
    setSelectedProdi([]);
    setSelectedStatusMahasiswa([]);
    setSelectedGender("");
    onSaveFilter({
      prodi: selectedProdi,
      statusMahasiswa: selectedStatusMahasiswa,
    });
  };

  const handleSaveFilter = () => {
    onSaveFilter({
      prodi: selectedProdi,
      statusMahasiswa: selectedStatusMahasiswa,
      gender: selectedGender,
    });
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Filter Data Mahasiswa</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Pilih Filter Pencarian</Typography>
          </div>
        </ExpansionPanelSummary>
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
        <ExpansionPanelDetails className={classes.root}>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Status Mahasiswa</Typography>
          </div>
          <div className={classes.column} style={{marginLeft: "-10px"}}>
            <MultipleSelect
              label="Pilih status"
              options={statusMahasiswa.data.map(status => status.status)}
              values={selectedStatusMahasiswa}
              onChange={handleSelectStatusMahasiswa}
              SelectProps={{
                msgNoOptionsAvailable: "Semua status sudah dipilih",
                msgNoOptionsMatchFilter: "Tidak ada status yang sesuai dengan pencarian"
              }}
            />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Pilih status mahasiswa untuk di filter
              <br/>
              <a href="#learn-more" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails className={classes.root}>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Jenis Kelamin</Typography>
          </div>
          <div className={classes.column} style={{marginLeft: "-10px"}}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={selectedGender === "laki_laki"} value="laki_laki" />}
                  label="Laki - Laki"
                  onChange={e => handleChangeGender(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedGender === "perempuan"} value="perempuan" />}
                  label="Perempuan"
                  onChange={e => handleChangeGender(e.target.value)}
                />
              </FormGroup>
              <FormHelperText>Pilih jenis kelamin untuk difilter</FormHelperText>
            </FormControl>
          </div>
        </ExpansionPanelDetails>
        <Divider/>
        <ExpansionPanelActions>
          <Button size="small" onClick={handleResetFilter}>Reset Filter</Button>
          <Button size="small" color="primary" onClick={handleSaveFilter}>
            Simpan Filter
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default MahasiswaFilterPanel;