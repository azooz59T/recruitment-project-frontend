import {useEffect, useState} from "react";
import './jobs.scss'
import httpModule from '../../helpers/http.modules'
import { IJob } from "../../types/global.typing";
import {useNavigate} from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import { Add } from "@mui/icons-material";
import JobGrid from "../../components/jobs/JobGrid.component";


const jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(()=> {
    setLoading(true);
    httpModule
    .get<IJob[]>("/Job/Get")
    .then((response) => {
      setJobs(response.data);
      setLoading(false);
    })
    .catch((error) =>{
      alert("Error");
      console.log("error");
      setLoading(false);
    })
  }, []);

  console.log(jobs);
  return (
    <div className="content jobs">
      <div className="heading">
        <h2>jobs</h2>
        <Button variant="outlined" onClick={() => redirect("/jobs/add")}>
          <Add />
        </Button>
      </div>
      {
        loading ? (
          <CircularProgress size ={100} />)
          : jobs.length === 0 ? (
            <h1> No jobs</h1>
          ) : (
            <JobGrid data = {jobs} />
          )
      }
    </div>
  )
}

export default jobs
