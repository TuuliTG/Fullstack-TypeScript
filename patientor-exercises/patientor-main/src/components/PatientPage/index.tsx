import { useEffect, useState } from "react";
import { FormValues, Gender, Patient } from "../../types";
import { Typography, List, ListItem, Button, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import {
  useParams
} from 'react-router-dom';
import patientService from "../../services/patients";
import EntryDetails from "../Entries/EntryDetails";
import AddEntryModal from "../AddHealthEntryModal";
import axios from "axios";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [addEntryFormType, setAddEntryFormType] = useState("");
  
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
  }, [id, patient]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setAddEntryFormType("");
  };

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

  const submitNewEntry = async (values: FormValues) => {
    try {
      if (id && patient) {
        const newEntry = await patientService.createNewHealthEntry(values, id);
        patient.entries.concat(newEntry);
      }
      setModalOpen(false);
      setAddEntryFormType("");
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          type={addEntryFormType}
        />
        <FormControl fullWidth>
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