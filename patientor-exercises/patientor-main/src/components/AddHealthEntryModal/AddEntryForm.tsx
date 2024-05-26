import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, Typography, Alert, Input } from '@mui/material';
import { FormValues, OccupationalFormValues } from "../../types";
import { toHealthCheckRating } from "../../utils";
import HealthCheckRatingFormItems from "./HealthCheckRatingFormItems";
import OccupationalFormItems from "./OccupationalFormItems";
import HospitalFormItems from "./HospitalFormItems";
import DiagnosisCodesSelection from "./DiagnosisCodesSelection";
import React from "react";

interface Props {
  onCancel: () => void;
  onSubmit: (values: FormValues) => void;
  type: string;
}

const AddEntryForm = ({ onCancel, onSubmit, type }: Props) => {
  const [description, setDescription] = useState('');
  const [rating, setHealthCheckRating] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [error, setError] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseValues = {
      description: description, 
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes
    };
    switch (type) {
      case ("HealthCheck"):
        try {
          const healthCheckRating = toHealthCheckRating(rating);
          onSubmit({
            ...baseValues,
            type,
            healthCheckRating
          });
        } catch (error: unknown) {
          setError("Invalid health check rating. Pick a number from 0 to 3");
        }
        break;
      case ("OccupationalHealthcare"):
        let sickLeave;
        if (sickLeaveStart !== "" && sickLeaveEnd !== "") {
          sickLeave = {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          };
        }
        const newEntryValues: OccupationalFormValues = {
          ...baseValues,
            employerName: employerName,
            type
        };
        if (sickLeave) {
          newEntryValues.sickLeave = sickLeave;
        }
        try {  
          onSubmit(newEntryValues);
        } catch (error: unknown) {
          setError("error");
        }
        break;
      case ("Hospital"):
        try {  
          onSubmit({
            ...baseValues,
            discharge: {
              date: dischargeDate, 
              criteria: dischargeCriteria
            },
            type
          });
        } catch (error: unknown) {
          setError("error");
        }
        break;
      default:
        setError("unknown type");
    }
  };

  const typeSpecificModule = () => {
    switch (type) {
      case ("HealthCheck"):
        return (
          <HealthCheckRatingFormItems rating={rating} setHealthCheckRating={setHealthCheckRating}/>
        );
      case ("OccupationalHealthcare"):
        return <OccupationalFormItems 
          employerName={employerName} 
          setEmployerName={setEmployerName} 
          sickLeaveStart={sickLeaveStart}
          setSickLeaveStart={setSickLeaveStart}
          sickLeaveEnd={sickLeaveEnd}
          setSickLeaveEnd={setSickLeaveEnd}
          />;
      case ("Hospital"):
        return <HospitalFormItems setDischargeCriteria={setDischargeCriteria} setDischargeDate={setDischargeDate} dischargeCriteria={dischargeCriteria} dischargeDate={dischargeDate}/>;
    }
  };
  
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        
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
        {typeSpecificModule()}
        <DiagnosisCodesSelection setDiagnosisCodes={setDiagnosisCodes} />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;