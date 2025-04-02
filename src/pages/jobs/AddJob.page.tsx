import { useState, useEffect } from "react"
import "./jobs.scss";
import { ICompany, ICreateCompanyDto, ICreateJobDto } from "../../types/global.typing"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.modules";

const levelsArray: string[] = [ "Intern", "Junior", "MidLevel", "Senior", "TeamLead", "Cto", "Architect" ];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({title: "", level: "", companyId: ""});
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === ""){
        alert("fill all Fields");
        return;
    }
    httpModule.post("/Job/Create", job)
    .then((response) => redirect("/jobs"))
    .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(()=> {
    httpModule
    .get<ICompany[]>("/Company/Get")
    .then((response) => {
      setCompanies(response.data);
    })
    .catch((error) =>{
      alert("Error");
      console.log("error");
    })
  }, []);

  return (
    <div className="content">
        <div className="add-jobs">
            <h2>Add New Job</h2>
            <TextField 
                autoComplete="off"
                label="Job title"
                variant="outlined"
                value={job.title}
                onChange={(e) => setJob({...job, title: e.target.value})}
            />

            <FormControl fullWidth>
                <InputLabel> Job level</InputLabel>
                <Select
                    value={job.level}
                    label="Job level"
                    onChange={(e) => setJob({...job, level: e.target.value})}
                >
                    {levelsArray.map( level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel> Company</InputLabel>
                <Select
                    value={job.companyId}
                    label="company"
                    onChange={(e) => setJob({...job, companyId: e.target.value})}
                >
                    {companies.map( company => <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>)}
                </Select>
            </FormControl>
            <div className="btns">
                <Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
                    Save
                </Button> 
                <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                    Back
                </Button>
            </div>
        </div>
    </div>
  );
};

export default AddJob
