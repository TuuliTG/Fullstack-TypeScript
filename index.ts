import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils/helpers';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

// {
//  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
//  "target": 2.5
// }


app.post('/exercises', (req, res) => {  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined) {
    const errorMessage = {
      error: "Parameters missing"
    };
    res.status(400).send(JSON.stringify(errorMessage));
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    if (result) {
      res.send({ result });
    }
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});