import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ICandidate } from "../../types/global.typing";

const column: GridColDef [] = [
  {field: "firstName", headerName: "FirstName", width: 100},
  {field: "lastName", headerName: "LastName", width:200},
  {field: "email", headerName: "Email", width: 150},
  {field: "phone", headerName: "Phone", width: 150},
  {field: "coverLetter", headerName: "Coverletter", width: 350},
  {field: "jobId", headerName: "JobId", width: 150},
];

interface ICandidateGridProps {
  data: ICandidate[];
}

const CandidateGrid = ({ data }: ICandidateGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className='candidates-grid'>
      <DataGrid
        rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50}/>
    </Box>
  )
}

export default CandidateGrid
