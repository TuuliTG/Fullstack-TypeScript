import { Input, TextField, Typography } from "@mui/material";

interface Props {
  dischargeCriteria: string;
  setDischargeCriteria: (value: string) => void;
  dischargeDate: string;
  setDischargeDate: (value: string) => void;
}

const HospitalFormItems = ({setDischargeCriteria, dischargeCriteria, setDischargeDate, dischargeDate}: Props) => {
  return (
    <div>
    <Typography>Date when discharged</Typography>
    <Input
      value={dischargeDate}
      type="date"
      onChange={(event) => setDischargeDate(event.target.value)} 
    />
    <TextField
          label="Discharge Criteria"
          fullWidth 
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
    </div>
  );
};

export default HospitalFormItems;