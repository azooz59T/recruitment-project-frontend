import {useEffect, useState} from "react";
import './companies.scss'
import httpModule from '../../helpers/http.modules'
import { ICompany } from "../../types/global.typing";
import {useNavigate} from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import { Add } from "@mui/icons-material";
import CompanyGrid from "../../components/companies/CompanyGrid.component";


const companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(()=> {
    setLoading(true);
    httpModule
    .get<ICompany[]>("/Company/Get")
    .then((response) => {
      setCompanies(response.data);
      setLoading(false);
    })
    .catch((error) =>{
      alert("Error");
      console.log("error");
      setLoading(false);
    })
  }, []);

  console.log(companies);
  return (
    <div className="content companies">
      <div className="heading">
        <h2>Companies</h2>
        <Button variant="outlined" onClick={() => redirect("/companies/add")}>
          <Add />
        </Button>
      </div>
      {
        loading ? (
          <CircularProgress size ={100} />)
          : companies.length === 0 ? (
            <h1> No Company</h1>
          ) : (
            <CompanyGrid data = {companies} />
          )
      }
    </div>
  )
}

export default companies