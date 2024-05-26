import { useEffect, useState } from "react";
import { FormValues, Patient } from "../../types";
import { Typography } from '@mui/material';

import {
  useParams
} from 'react-router-dom';
import patientService from "../../services/patients";
import AddEntryModal from "../AddHealthEntryModal";
import axios from "axios";
import AlertDialog from "../AddHealthEntryModal/alertDialog";
import PatientInfo from "./PatientInfo";
import EntriesList from "../Entries/EntriesList";
import AddNewEntrySelection from "./AddNewEntrySelection";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [addEntryFormType, setAddEntryFormType] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  
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

  const openModal = (): void => {
    if (addEntryFormType !== "") {
      setModalOpen(true);
    } else {
      setAlertDialogOpen(true);
    }
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setAddEntryFormType("");
  };

  const handleCloseAlertWindow = () => {
    setAlertDialogOpen(false);
  };

  const submitNewEntry = async (values: FormValues) => {
    setError("");
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
        <AlertDialog open={alertDialogOpen} handleClose={handleCloseAlertWindow}/>
        <PatientInfo patient={patient}/>
        <EntriesList entries={patient.entries} />
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          type={addEntryFormType}
          setError={setError}
        />
        <AddNewEntrySelection
          addEntryFormType={addEntryFormType}
          setAddEntryFormType={setAddEntryFormType}
          openModal={openModal}
        />
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