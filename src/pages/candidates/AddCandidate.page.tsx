import { useEffect, useState } from "react"
import "./candidates.scss";
import { ICreateCandidateDto, IJob } from "../../types/global.typing"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.modules";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const AddCandidate = () => {
    const [candidate, setCandidate] = useState<ICreateCandidateDto>(
        {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            coverLetter: "",
            jobId: ""
        });
    const redirect = useNavigate();

    const [file, setFile] = useState<File | null>(null);

    const formData = new FormData();
    
    const [jobs, setJobs] = useState<IJob[]>([]);

    useEffect(()=> {
        httpModule
        .get<IJob[]>("/Job/Get")
        .then((response) => {
        setJobs(response.data);
        })
        .catch((error) =>{
        alert("Error");
        console.log("error");
        })
    }, []);

    const handleClickSaveBtn = () => {
        if (candidate.firstName === "" ||
            candidate.lastName === "" ||
            candidate.lastName === "" || 
            candidate.email === "" || 
            candidate.phone === "" || 
            candidate.coverLetter === "" || 
            candidate.jobId === "" ||
            !file) {
            alert("fill all Fields");
            return;
        }

        formData.append("firstName", candidate.firstName);
        formData.append("lastName", candidate.lastName);
        formData.append("email", candidate.email);
        formData.append("phone", candidate.phone);
        formData.append("coverLetter", candidate.coverLetter);
        formData.append("jobId", candidate.jobId);

        if (file) {
            formData.append("pdfFile", file);
        }
        
        httpModule.post("/Candidate/Create", formData)
            .then((response) => redirect("/candidates"))
            .catch((error) => console.log(error));
    };
    const handleClickBackBtn = () => {
        redirect("/candidates");
    };

    return (
        <div className="content">
            <div className="add-candidate">
                <h2>Add New Candidate</h2>
                <TextField
                    autoComplete="off"
                    label="Candidate firstName"
                    variant="outlined"
                    value={candidate.firstName}
                    onChange={(e) => setCandidate({ ...candidate, firstName: e.target.value })}
                />
                <TextField
                    autoComplete="off"
                    label="Candidate lastName"
                    variant="outlined"
                    value={candidate.lastName}
                    onChange={(e) => setCandidate({ ...candidate, lastName: e.target.value })}
                />
                <TextField
                    autoComplete="off"
                    label="Candidate email"
                    variant="outlined"
                    value={candidate.email}
                    onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                />
                <TextField
                    autoComplete="off"
                    label="Candidate phone"
                    variant="outlined"
                    value={candidate.phone}
                    onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                />

                <TextField
                    autoComplete="off"
                    label="C V"
                    variant="outlined"
                    value={candidate.coverLetter}
                    onChange={(e) => setCandidate({ ...candidate, coverLetter: e.target.value })}
                    multiline
                    />

                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setFile(event.target.files ? event.target.files[0] : null)}
                        multiple
                    />
                </Button>


                <FormControl fullWidth>
                    <InputLabel> Job Title</InputLabel>
                    <Select
                        value={candidate.jobId}
                        label="jobId"
                        onChange={(e) => setCandidate({ ...candidate, jobId: e.target.value })}
                    >
                        {jobs.map(job => <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem> )}
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

export default AddCandidate
