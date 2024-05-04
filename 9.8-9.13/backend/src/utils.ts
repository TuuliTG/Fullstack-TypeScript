import { Gender, NewPatientEntry } from "./types"

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

const parseStringField = (value: unknown, fieldName: string): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  return value;
};

const isDate = (date: string): boolean => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormat.test(date)) {
    return false
  }
  return true
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.length !== 11) {
    throw new Error('Incorrext ssn: ' + ssn);
  }
  return ssn;
}

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object)
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, "occupation"),
      entries: []
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatientEntry;