import { HealthCheckRating } from "./types";

export const parseDiagnosisCodes = (codes: string): string[] => {
  const stringArray = codes.split(" ");
  return stringArray;
};

export const toHealthCheckRating = (text: string): HealthCheckRating => {
  const number = Number(text);
  if (number) {
    if (number >= 0 && number <= 3) {
      return number;
    }
    throw new Error('Incorrect healthCheckRating: ' + text);
  }
  throw new Error('Incorrect healthCheckRating: ' + text);
};

