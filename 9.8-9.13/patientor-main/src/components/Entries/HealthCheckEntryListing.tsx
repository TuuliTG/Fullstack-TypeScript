import { CardContent, Typography } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import Card from '@mui/material/Card';
import Diagnoseslisting from "./diagnosesListing";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, orange, red, yellow } from "@mui/material/colors";

const HealthRatingSymbol: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
    switch (rating) {
        case 0:
            return (
                <FavoriteIcon sx={{ color: green[900] }}/>
            );
        case 1:
            return (
                <FavoriteIcon sx={{ color: yellow[400] }}/>
            );
        case 2:
            return (
                <FavoriteIcon sx={{ color: orange[400] }}/>
            );
        case 3:
            return (
                <FavoriteIcon sx={{ color: red[900] }}/>
            );
        default:
            console.log("wrong health check type");
            return (
                <div></div>
            );
    }
};

const HealthCheckEntryListing: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
    return (
        <div>
            <Card sx={{ minWidth: 800 }}>
                <CardContent>
                    <Typography variant="h6">{entry.date} <MedicalInformationIcon></MedicalInformationIcon></Typography>
                    <Typography>{entry.description}</Typography>
                    <Typography>Health rating: <HealthRatingSymbol rating={entry.healthCheckRating}/> </Typography>
                    <Diagnoseslisting entry={entry}></Diagnoseslisting>
                    <Typography>Diagnose by {entry.specialist}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default HealthCheckEntryListing;