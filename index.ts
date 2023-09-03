import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils/helpers';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (height === undefined || weight === undefined || isNotNumber(height) || isNotNumber(weight)) {
    const errorMessage = {
      error: "malformatted parameters"
    };
    res.send(JSON.stringify(errorMessage));
  }
  let response = {};
  try {
    const result = calculateBmi(Number(height), Number(weight));
    response = {
      height: height,
      weight: weight,
      bmi: result
    };
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.send("Something went wrong");
  }
  res.send(JSON.stringify(response));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});