import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import { Typography, List, ListItem  } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import {
  useParams
} from 'react-router-dom';
import patientService from "../../services/patients";
import EntryDetails from "../Entries/EntryDetails";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  
  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient =  await patientService.getOne(id);
      if (patient) {
        setPatient(patient);
      }
    };
    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

  const addGenderIcon = (p: Patient) => {
    if (p.gender === Gender.Female) {
      return (
        <FemaleIcon/>
      );
    } else if (p.gender == Gender.Male) {
      return (
        <MaleIcon/>
      );
    } else {
      return (<></>);
    }
  };
  
  if (patient) {
    return (
      <div className="App">
        <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
          <b>{patient.name}</b> {addGenderIcon(patient)}
        </Typography>
        <Typography>
          ssh: {patient.ssn}
          <br></br>
          occupation: {patient.occupation}
          <br></br>
          date of birth: {patient.dateOfBirth}
        </Typography>
        { patient.entries.length === 0 ? 
          <Typography style={{ marginBottom: "0.5em", marginTop: "1em" }}>No entries</Typography>
          :
          <Typography variant="h6" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
            Entries:
          </Typography>          
        }
        
        <List>
          {patient.entries.map (e => (
            <ListItem key={e.id}>
              <EntryDetails entry={e}></EntryDetails>
            </ListItem>
          ))}
        </List>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
          Patient not found
        </Typography>
      </div>
    );
  }
};

export default PatientPage;