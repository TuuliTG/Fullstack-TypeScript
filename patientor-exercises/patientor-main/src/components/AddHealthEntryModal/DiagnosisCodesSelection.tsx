import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import diagnoseService from '../../services/diagnoses';
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  setDiagnosisCodes: (value: string[]) => void;
}

const DiagnosisCodesSelection = ({setDiagnosisCodes}: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [checkedCodes, setCheckedCodes] = React.useState<string[]>([]);

  useEffect(() => {
      const fetchDiagnoses = async () => {
          const diagnoses = await diagnoseService.getAll();
          setDiagnoses(diagnoses);
        };
        void fetchDiagnoses();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof checkedCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    setCheckedCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
    
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnoses-multiple-checkbox-label"
          id="diagnoses-multiple-checkbox"
          multiple
          value={checkedCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnoseCode) => (
            <MenuItem key={diagnoseCode.code} value={diagnoseCode.code}>
              <Checkbox checked={checkedCodes.indexOf(diagnoseCode.code) > -1} />
              <ListItemText primary={diagnoseCode.code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosisCodesSelection;