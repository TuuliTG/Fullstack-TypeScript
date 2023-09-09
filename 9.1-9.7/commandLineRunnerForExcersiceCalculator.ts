import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./utils/helpers";

export interface Arguments {
  target: number;
  hoursPerDay: number[];
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 50) throw new Error('Too many arguments');

  const input = args.slice(2, args.length);
  input.forEach(i => {
    if (isNotNumber(i)) {
      throw new Error('Provided values were not numbers!');  
    }
  });
  const hoursPerDay: Array<number> = process.argv
  .slice(3, process.argv.length)
  .map((item) => Number(item));

  return {
    target: Number(args[2]),
    hoursPerDay
  };
};

try {
  const {target, hoursPerDay} = parseArguments(process.argv);
  calculateExercises(hoursPerDay, target);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}