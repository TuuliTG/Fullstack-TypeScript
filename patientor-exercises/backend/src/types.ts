
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type SickLeave = {
  startDate: string,
  endDate: string
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Discharge = {
  date: string,
  criteria: string
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnosis  {
  code: string,
  name: string,
  latin?: string
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property

export type NewEntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other"
}