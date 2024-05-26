import { useState, SyntheticEvent } from "react";
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
  setError: (errorMessage: string) => void;
}

const AddEntryForm = ({ onCancel, onSubmit, type, setError }: Props) => {
  const [description, setDescription] = useState('');
  const [rating, setHealthCheckRating] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    setError("");
    const baseValues = {
      description: description, 
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes
    };
    try {
      switch (type) {
        case ("HealthCheck"):
          onSubmit(getHealthCheckEntry(baseValues, rating));
          break;
        case ("OccupationalHealthcare"):
          onSubmit(getOccupationalEntry(baseValues, sickLeaveStart, sickLeaveEnd, employerName));
          break;
        case ("Hospital"):
          onSubmit(getHospitalEntry(baseValues, dischargeDate, dischargeCriteria));
          break;
        default:
          setError("unknown type");
      }
    } catch (error: unknown) {
      setError(`Something went wrong: ${error}`);
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