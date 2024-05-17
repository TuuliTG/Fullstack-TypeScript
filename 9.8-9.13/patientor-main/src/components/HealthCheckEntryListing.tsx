import { CardContent, Typography } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { HealthCheckEntry } from "../types";
import Card from '@mui/material/Card';
import Diagnoseslisting from "./diagnosesListing";

const HealthCheckEntryListing: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
    return (
        <div>
            <Card sx={{ minWidth: 800 }}>
                <CardContent>
                    <Typography variant="h6">{entry.date} <MedicalInformationIcon></MedicalInformationIcon></Typography>
                    <Typography>{entry.description}</Typography>
                    <Typography>Health rating: {entry.healthCheckRating}</Typography>
                    <Diagnoseslisting entry={entry}></Diagnoseslisting>
                    <Typography>Diagnose by {entry.specialist}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default HealthCheckEntryListing;