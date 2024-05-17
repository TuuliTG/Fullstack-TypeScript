import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntryListing";
import HospitalEntryListing from "./HospitalEntryListing";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryListing entry={entry}></HospitalEntryListing>;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry}></HealthCheckEntry>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry}></OccupationalHealthcareEntry>
        default:
            <div></div>
    }
}

export default EntryDetails;