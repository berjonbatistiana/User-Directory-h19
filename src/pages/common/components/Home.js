import React, {useEffect, useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {generateData} from "../../../utils/DataGenerate"


const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 697,
    display: "flext",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    textAlign: "center",
  },
});

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 180
  },
  {
    field: "title",
    headerName: "Title",
    width: 250
  },
  {
    field: "job",
    headerName: "Job Type",
    width: 150,
  },
  {
    field: "state",
    headerName: "State",
    width: 100
  }
];

export const Home = () => {
    const classes = useStyles();
    const [defaultData, setDefaultData] = useState([]);
    const [rows, setRows] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedJob, setSelectedJob] = useState(0);
    const [selectedState, setSelectedState] = useState(0);

    const handleColumnHeaderClick = params => {
      const validField = ['state', 'job']
      let newRows = [];
      console.log(params.field)
      if (!validField.includes(params.field))
        return

      if (params.field === 'state') {
        newRows = defaultData.filter(el => {
          return el.state === states[selectedState];
        });

        if (selectedState >= states.length) {
          setRows(defaultData);
          setSelectedState(0)
          return;
        }

        setSelectedState(selectedState + 1)
      }

      if (params.field === 'job') {
        newRows = defaultData.filter(el => {
          return el.job === jobs[selectedJob];
        });

        if (selectedJob >= jobs.length) {
          setRows(defaultData);
          setSelectedJob(0)
          return;
        }
        setSelectedJob( selectedJob + 1);
      }

      setRows(newRows);
    }


    useEffect(() => {
      const {data, dataJobs, dataStates} = generateData(100);
      setDefaultData(data);
      setRows(data);
      setJobs(dataJobs)
      setStates(dataStates)
    }, []);

    return (
      <div className={classes.root}>
        <Box m={1}>
          <Typography variant="h4" component="h2">
            User Data
          </Typography>
        </Box>
        <Box m={1} style={{height: 593, backgroundColor: "rgba(3, 169, 244, 0.1)"}}>
          <DataGrid
            disableSelectionOnClick={true}
            rows={rows} columns={columns}
            onColumnHeaderClick={handleColumnHeaderClick}
            pageSize={10}/>
        </Box>
      </div>
    );
  }
;
