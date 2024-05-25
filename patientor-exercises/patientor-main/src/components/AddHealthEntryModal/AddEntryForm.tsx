import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Typography, Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { HealthCheckFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [rating, setHealthCheckRating] = useState("")
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("")
  const [error, setError] = useState("")
  const [diagnosisCodes, setDiagnosisCodes] = useState("")
  
  const type = "HealthCheck"
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(`trying to add new entry: ${date}, ${description}, ${specialist}`)
    try {
      const healthCheckRating = toHealthCheckRating(rating)
      onSubmit({
        description,
        type,
        healthCheckRating,
        date,
        specialist,
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
      });
    } catch (error: unknown) {
      setError("Invalid health check rating. Pick a number from 0 to 3")
    }
  };

  const isDate = (date: string): boolean => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormat.test(date)) {
      return false;
    }
    return true;
  };

  const parseDiagnosisCodes = (codes: string): string[] => {
    const stringArray = codes.split(" ")
    return stringArray
  }

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const toHealthCheckRating = (text: string): HealthCheckRating => {
    const number = Number(text)
    if (number) {
      if (number >= 0 && number <= 3) {
        return number
      }
      throw new Error('Incorrect healthCheckRating: ' + rating);
    }
    throw new Error('Incorrect healthCheckRating: ' + rating);
  }

  
  const parseDate = (event: any) => {
    console.log(event)
    const dateString = `${event.$y}-${event.$m}-${event.$D}`
    console.log(dateString)
    const parsed = event.$d.toISOString();
    console.log(parsed)
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    setDate(date);
  };

  function BasicDatePicker() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
        <DemoContainer components={['DatePicker']}>
          <DatePicker 
            label="Date of the health check" 
            format="YYYY-MM-DD"
            value={date} 
            onChange={parseDate}/>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
  
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <Typography>Date of the appointment</Typography>
        <input
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
        <TextField
          label="Health check rating"
          fullWidth 
          value={rating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
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
  )
};

export default AddEntryForm;