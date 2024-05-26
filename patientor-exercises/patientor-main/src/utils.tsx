import { BaseEntryFormValues, HealthCheckRating, OccupationalFormValues } from "./types";

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

export const getOccupationalEntry = (baseValues: BaseEntryFormValues, sickLeaveStart: string, sickLeaveEnd: string, employerName: string) => {
  const type = "OccupationalHealthcare";
  let sickLeave;
  if (sickLeaveStart !== "" && sickLeaveEnd !== "") {
    sickLeave = {
      startDate: sickLeaveStart,
      endDate: sickLeaveEnd
    };
  }
  const newEntryValues: OccupationalFormValues = {
    ...baseValues,
      employerName: employerName,
      type
  };
  if (sickLeave) {
    newEntryValues.sickLeave = sickLeave;
  }
  return newEntryValues;
};