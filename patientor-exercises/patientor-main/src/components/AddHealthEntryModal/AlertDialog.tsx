import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AlertDialog = ({open, handleClose}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Please add the entry type first!"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

