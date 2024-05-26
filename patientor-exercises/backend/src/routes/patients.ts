import express from 'express';
import patientsService from '../services/patientsService';
import {toNewPatientEntry, toNewEntry} from '../utils';
import { NewEntryWithoutId } from '../types';
// /api/patients/:id/entries
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientEntries());
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry: NewEntryWithoutId = toNewEntry(req.body);
    const addedEntry = patientsService.addNewHealthEntry(newEntry, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

export default router;