import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientById = (id: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientById
};