import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  addEntryFormType: string,
  setAddEntryFormType: (value: string) => void;
  openModal: () => void;
}

const AddNewEntrySelection = ({addEntryFormType, setAddEntryFormType, openModal}: Props) => {
  return (
    <div>
      <FormControl>
          <InputLabel id="select-label">Add entry type</InputLabel>
          <Select
            labelId="select-label"
            id="select-label"
            value={addEntryFormType}
            label="Add new entry"
            onChange={({ target }) => setAddEntryFormType(target.value)}
          >
            <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>OccupationalHealthcare</MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
          </Select>
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </FormControl>
    </div>
  );
};

export default AddNewEntrySelection;