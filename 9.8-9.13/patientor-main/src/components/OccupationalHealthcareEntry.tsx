import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';
import { Card, CardContent, Typography } from "@mui/material";
import Diagnoseslisting from "./diagnosesListing";

const OccupationalHealthcareEntryListing: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry})  => {
    return (
        <Card sx={{ minWidth: 800 }}>
            <CardContent>
                <Typography variant="h6">{entry.date} <WorkIcon></WorkIcon></Typography>
                <Typography>{entry.description}</Typography>
                {entry.sickLeave === undefined ? <></> :
                    <Typography>Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</Typography>
                }
                <Diagnoseslisting entry={entry}></Diagnoseslisting>
                <Typography>Diagnose by {entry.specialist}</Typography>
                <Typography>Employer: {entry.employerName}</Typography>
            </CardContent>
        </Card>
    )
}

export default OccupationalHealthcareEntryListing;