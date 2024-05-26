import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { FormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  error?: string;
  type: string;
  setError: (errorMessage: string) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, type, setError }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={type} setError={setError}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
