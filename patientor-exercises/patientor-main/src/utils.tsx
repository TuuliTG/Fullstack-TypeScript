import { HealthCheckRating } from "./types";

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

