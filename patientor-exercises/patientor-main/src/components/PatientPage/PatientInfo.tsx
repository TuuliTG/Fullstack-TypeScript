import { Typography } from "@mui/material";
import { Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


interface Props {
  patient: Patient
}
const PatientInfo = (props: Props) => {
  const addGenderIcon = (p: Patient) => {
    if (p.gender === Gender.Female) {
      return (
        <FemaleIcon/>
      );
    } else if (p.gender == Gender.Male) {
      return (
        <MaleIcon/>
      );
    } else {
      return (<></>);
    }
  };
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
        <b>{props.patient.name}</b> {addGenderIcon(props.patient)}
      </Typography>
      <Typography>
        ssh: {props.patient.ssn}
        <br></br>
        occupation: {props.patient.occupation}
        <br></br>
        date of birth: {props.patient.dateOfBirth}
      </Typography>
    </div>
  );
};

export default PatientInfo;