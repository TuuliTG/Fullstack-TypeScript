import { List, ListItem, Typography } from "@mui/material";
import { Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  entries: Entry[]
}
const EntriesList = ({entries}: Props) => {
  
  return (
    <div>
      { entries.length === 0 ? 
        <Typography style={{ marginBottom: "0.5em", marginTop: "1em" }}>No entries</Typography>
        :
        <Typography variant="h6" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
          Entries:
        </Typography>          
      }
      <List>
        {entries.map (e => (
          <ListItem key={e.id}>
            <EntryDetails entry={e}></EntryDetails>
          </ListItem>
        ))}
      </List>
  </div>
  );
};

export default EntriesList;