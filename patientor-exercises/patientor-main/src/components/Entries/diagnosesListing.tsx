import { useEffect, useState } from "react";
import {List, ListItemIcon, ListItemText, ListItem, Typography } from "@mui/material";
import { Entry, Diagnosis } from "../../types";
import CircleIcon from '@mui/icons-material/Circle';
import diagnoseService from '../../services/diagnoses';

const Diagnoseslisting: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await diagnoseService.getAll();
            setDiagnoses(diagnoses);
          };
          void fetchDiagnoses();
    }, []);

    if (entry.diagnosisCodes === undefined || entry.diagnosisCodes?.length === 0 ) {
        return <></>;
    }

    return (
        <div>
            <Typography variant="h6">Diagnoses:</Typography>
            <List>
                {entry.diagnosisCodes.map (code => (
                <ListItem key={code}>
                    <ListItemIcon><CircleIcon fontSize="small"/></ListItemIcon>
                    <ListItemText primary={`${code} ${diagnoses.find (d => d.code == code)?.name}`}/>
                </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Diagnoseslisting;