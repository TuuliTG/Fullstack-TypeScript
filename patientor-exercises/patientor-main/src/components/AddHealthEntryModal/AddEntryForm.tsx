import { useState, SyntheticEvent } from "react";
import { Alert } from '@mui/material';
import { FormValues } from "../../types";
import { getHealthCheckEntry, getHospitalEntry, getOccupationalEntry } from "../../utils";
import HealthCheckRatingFormItems from "./HealthCheckRatingFormItems";
import OccupationalFormItems from "./OccupationalFormItems";
import HospitalFormItems from "./HospitalFormItems";
import React from "react";
import BaseInfoFormItems from "./BaseInfoFormItems";
import FormButtons from "./FormButtons";

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
          onSubmit(getHealthCheckEntry(baseValues, rating));
        } catch (error: unknown) {
          setError("Invalid health check rating. Pick a number from 0 to 3");
        }
        break;
      case ("OccupationalHealthcare"):
        try {  
          onSubmit(getOccupationalEntry(baseValues, sickLeaveStart, sickLeaveEnd, employerName));
        } catch (error: unknown) {
          setError("Error in creating Occupational entry");
        }
        break;
      case ("Hospital"):
        try {  
          onSubmit(getHospitalEntry(baseValues, dischargeDate, dischargeCriteria));
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
        <BaseInfoFormItems 
          date={date}
          setDate = {setDate}
          setDescription = {setDescription}
          description = {description}
          specialist = {specialist}
          setSpecialist = {setSpecialist}
          setDiagnosisCodes = {setDiagnosisCodes}
        />
        {typeSpecificModule()}
        <FormButtons onCancel={onCancel}/>
      </form>
    </div>
  );
};

export default AddEntryForm;