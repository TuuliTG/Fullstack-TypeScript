import { HospitalEntry } from "../../types";
import { Card, CardContent, Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Diagnoseslisting from "./diagnosesListing";


const HospitalEntryListing: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    
    return (
        <Card sx={{ minWidth: 800 }}>
            <CardContent>
                <Typography variant="h6">{entry.date} <LocalHospitalIcon></LocalHospitalIcon></Typography>
                <Typography>{entry.description}</Typography>
                <Typography>
                    Discharged on {entry.discharge.date}
                    <br></br>
                    Discharge criteria: {entry.discharge.criteria}
                </Typography>
                <Diagnoseslisting entry={entry}></Diagnoseslisting>
                <Typography>Diagnose by {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

export default HospitalEntryListing;