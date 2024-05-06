import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Diagnosis[] = diagnosesService.getEntries();
  res.send(diagnoses);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;