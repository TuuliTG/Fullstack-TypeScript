import { calculateBmi } from "./bmiCalculator";

interface Arguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if(height < weight) {
      throw new Error('Give first height and then weight');
    }
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const {height, weight} = parseArguments(process.argv);
  calculateBmi(height, weight); 
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}