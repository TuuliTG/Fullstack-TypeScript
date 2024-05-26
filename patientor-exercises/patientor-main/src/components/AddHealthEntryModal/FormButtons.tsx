import { Button, Grid } from "@mui/material";

interface Props {
  onCancel: () => void;
}

const FormButtons = ({onCancel}: Props) => {
  return (
    <div>
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormButtons;