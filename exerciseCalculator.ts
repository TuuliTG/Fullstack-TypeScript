import { isNotNumber } from "./utils/helpers";

type Rating = 1 | 2 | 3;

const calculateExercises = (trainingHours: number[], target: number) => {
  trainingHours.forEach(h => console.log(h))
  const avg = calculateAvg(trainingHours)
  const rating = getRating(avg, target)
  if (rating) {
    const result: Result = {
      numberOfDays: trainingHours.length,
      numberOfTrainingDays: trainingHours.filter(h => h !== 0).length,
      targetValue: target,
      avgTime: avg,
      targetReached: avg >= target,
      rating: rating,
      ratingDescription: getRatingDescription(rating)
    }
    printResult(result)
  }
}

const getRating = (avg: number, target: number): Rating | undefined => {
  const percentage: number = avg / target
  switch (true) {
    case percentage < 0.7:
      return 1;
    case percentage <= 1:
      return 2;
    case percentage > 1:
      return 3
    default:
      return
  }
}

const getRatingDescription = (rating: Rating): string => {
  switch(rating) {
    case 1:
      return "Try harder next time :)"
    case 2:
      return "Well done!"
    case 3:
      return "You exceeded you goals! Well done!"
  }
}

const calculateAvg = (trainingHours: number[]): number => {
  const sum = trainingHours.reduce((acc, current) => {
    return acc + current;
  }, 0);
  const avg = sum/trainingHours.length
  const fixed = (Math.round(avg * 100) / 100).toFixed(2)
  return parseFloat(fixed);
}

const printResult = (res: Result) => {
  console.log(`periodLength:${res.numberOfDays}`)
  console.log(`Number of training days:${res.numberOfTrainingDays}`)
  console.log(`Target:${res.targetValue}`)
  console.log(`Average training time: ${res.avgTime}`)
  console.log(`Target reached: ${res.targetReached}`)
  console.log(`Rating: ${res.rating}`)
  console.log(`Rating description: ${res.ratingDescription}`)
}

interface Result {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetValue: number,
  avgTime: number,
  targetReached: boolean,
  rating: number,
  ratingDescription: string
}

interface Arguments {
  target: number;
  hoursPerDay: number[];
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 50) throw new Error('Too many arguments');

  const input = args.slice(2, args.length)
  input.forEach(i => {
    if (isNotNumber(i)) {
      throw new Error('Provided values were not numbers!');  
    }
  })
  const hoursPerDay: Array<number> = process.argv
  .slice(3, process.argv.length)
  .map((item) => Number(item));

  return {
    target: Number(args[2]),
    hoursPerDay
  }
}
try {
  const {target, hoursPerDay} = parseArguments(process.argv);
  calculateExercises(hoursPerDay, target)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

