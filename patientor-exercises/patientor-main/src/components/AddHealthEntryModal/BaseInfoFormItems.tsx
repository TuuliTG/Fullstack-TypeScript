import { Input, TextField, Typography } from "@mui/material";
import DiagnosisCodesSelection from "./DiagnosisCodesSelection";

interface Props {
  date: string;
  setDate: (value: string) => void;
  setDescription: (value: string) => void;
  description: string;
  specialist: string;
  setSpecialist: (value: string) => void;
  setDiagnosisCodes: (value: string[]) => void;
}

const BaseInfoFormItems = ({date, setDate, description, setDescription, specialist, setSpecialist, setDiagnosisCodes}: Props) => {
  return (
    <div>
      <Typography>Date of the appointment</Typography>
        <Input
          value={date}
          type="date"
          onChange={(event) => setDate(event.target.value)} 
        />
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <DiagnosisCodesSelection setDiagnosisCodes={setDiagnosisCodes} />
    </div>
  );
};

export default BaseInfoFormItems;