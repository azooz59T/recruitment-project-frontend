import "./jobs-grid.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../../types/global.typing";

const column: GridColDef [] = [
  {field: "id", headerName: "ID", width: 100},
  {field: "title", headerName: "Title", width:200},
  {field: "level", headerName: "Level", width: 150},
  {field: "companyName", headerName: "Company Name", width: 150},
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).fromNow(),
  },
];

interface IJobGridProps {
  data: IJob[];
}

const jobGrid = ({ data }: IJobGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className='jobs-grid'>
      <DataGrid
        rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50}/>
    </Box>
  )
}

export default jobGrid
