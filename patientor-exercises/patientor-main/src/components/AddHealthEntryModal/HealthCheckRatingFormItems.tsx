import { TextField } from "@mui/material";

interface Props {
  rating: string;
  setHealthCheckRating: (value: string) => void;
}
const HealthCheckRatingFormItems = ({setHealthCheckRating, rating}: Props) => {
  return (
    <div>
    <TextField
          label="Health check rating"
          fullWidth 
          value={rating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
    </div>
  );
};

export default HealthCheckRatingFormItems;