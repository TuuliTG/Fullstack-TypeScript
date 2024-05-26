import { Input, TextField, Typography } from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: (value: string) => void;
  sickLeaveStart: string;
  setSickLeaveStart: (value: string) => void;
  sickLeaveEnd: string;
  setSickLeaveEnd: (value: string) => void;
}
const OccupationalFormItems = ({setEmployerName, employerName, sickLeaveStart, setSickLeaveStart, sickLeaveEnd, setSickLeaveEnd}: Props) => {
  return (
    <div>
    <TextField
      label="Employer name"
      fullWidth 
      value={employerName}
      onChange={({ target }) => setEmployerName(target.value)}
    />
    <Typography>Sick leave beginning from</Typography>
    <Input
      value={sickLeaveStart}
      type="date"
      onChange={(event) => setSickLeaveStart(event.target.value)} 
    />
    <Typography>Sick leave end</Typography>
    <Input
      value={sickLeaveEnd}
      type="date"
      onChange={(event) => setSickLeaveEnd(event.target.value)} 
    />
    </div>
  );
};

export default OccupationalFormItems;