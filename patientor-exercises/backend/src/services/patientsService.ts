import patientsData from '../../data/patients';
import { Entry, NewEntryWithoutId, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';


const getEntries = (): PatientEntry[] => {
  return patientsData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addNewHealthEntry = ( entry: NewEntryWithoutId, patientId: string ): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patientsData.forEach((patient) => { 
    if (patient.id === patientId) {
      patient.entries.push(newEntry);
    }
  });
  return newEntry;
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patientsData.find(patient => patient.id === id);
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientById,
  addNewHealthEntry
};