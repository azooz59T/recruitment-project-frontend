import {useEffect, useState} from "react";
import './candidates.scss'
import httpModule from '../../helpers/http.modules'
import { ICandidate } from "../../types/global.typing";
import {useNavigate} from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import { Add } from "@mui/icons-material";
import CandidateGrid from "../../components/candidates/CandidateGrid.component";


const candidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(()=> {
    setLoading(true);
    httpModule
    .get<ICandidate[]>("/Candidate/Get")
    .then((response) => {
      setCandidates(response.data);
      setLoading(false);
    })
    .catch((error) =>{
      alert("Error");
      console.log("error");
      setLoading(false);
    })
  }, []);

  console.log(candidates);
  return (
    <div className="content candidates">
      <div className="heading">
        <h2>candidates</h2>
        <Button variant="outlined" onClick={() => redirect("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {
        loading ? (
          <CircularProgress size ={100} />)
          : candidates.length === 0 ? (
            <h1> No candidate</h1>
          ) : (
            <CandidateGrid data = {candidates} />
          )
      }
    </div>
  )
}

export default candidates