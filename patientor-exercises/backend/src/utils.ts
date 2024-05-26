import { Diagnosis, Gender, HealthCheckRating, NewEntryWithoutId, NewPatientEntry, Discharge, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseStringField = (value: unknown, fieldName: string, minLength: number, maxLength: number): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  if (value.length >= minLength && value.length <= maxLength) {
    return value;
  }
  throw new Error(`Value in ${fieldName} was either too short or too long.`);
};

const isDate = (date: string): boolean => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(date)) {
    return false;
  }
  return true;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.length !== 11) {
    throw new Error('Incorrext ssn: ' + ssn);
  }
  return ssn;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || typeof rating !== 'number') {
    throw new Error('Incorrext healthCheckRating: ' + rating);
  }
  if (rating <= 3 && rating >= 0) {
    return rating;
  }
  throw new Error('Incorrext value in healthCheckRating: ' + rating);
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, "name", 3, 30),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, "occupation", 4, 30),
      entries: []
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseDischarge = (object: unknown): Discharge => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ("date" in object && "criteria" in object) {
    const dischargeObject = {
      date: parseDate(object.date),
      criteria: parseStringField(object.criteria, "criteria", 5, 100)
    };
    return dischargeObject;
  }
  throw new Error('Incorrect or missing data');
};

const parseSickLeave = (object: unknown): SickLeave | undefined  => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if (!("sickLeave" in object && object.sickLeave !== null)) {
    return  undefined;
  }
  if (typeof object.sickLeave === 'object' && "startDate" in object.sickLeave && "endDate" in object.sickLeave ) {
    const sickLeave = {
      startDate: parseDate(object.sickLeave.startDate),
      endDate: parseDate(object.sickLeave.endDate)
    };
    return sickLeave;
  }
  throw new Error('Incorrect or missing sick leave data');
};

export const toNewEntry = (object: unknown): NewEntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if (
    'type' in object 
    && 'description' in object 
    && 'date' in object
    && 'specialist' in object
  ) {
    const skeleton = {
      description: parseStringField(object.description, "description", 5, 300),
      date: parseDate(object.date),
      specialist: parseStringField(object.specialist, "specialist", 4, 30),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const healthcheckEntry = {
            ...skeleton,
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return healthcheckEntry;
        }
        throw new Error('Incorrect data: healthCheckRating is missing');
      case "Hospital":
        if ("discharge" in object) {
          const hospitalEntry = {
            ...skeleton,
            type: object.type,
            discharge: parseDischarge(object.discharge)
          };
          return hospitalEntry;
        }
        throw new Error('Incorrect data: discharge is missing');
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const occupationalEntry = {
            ...skeleton,
            type: object.type,
            employerName: parseStringField(object.employerName, "employerName", 2, 30),
            sickLeave: parseSickLeave(object)
          };
          return occupationalEntry;
        }
        throw new Error('Incorrect data: employerName is missing');
      default:
        throw new Error('Incorrect entry type');
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};