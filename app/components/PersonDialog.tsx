//'use client'

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Person } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

// Helper function to format date for input
// const formatDateForInput = (date: string | Date | null): string => {
//   if (!date) return '';
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = (`0${d.getMonth() + 1}`).slice(-2); // Ensure month is two digits
//   const day = (`0${d.getDate()}`).slice(-2); // Ensure day is two digits
//   return `${year}-${month}-${day}`;
// }

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{currentPerson ? 'Edit Person' : 'Add Person'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="First Name"
        fullWidth
        value={currentPerson?.firstname || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, firstname: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Last Name"
        fullWidth
        value={currentPerson?.lastname || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, lastname: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Phone"
        fullWidth
        value={currentPerson?.phone || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, phone: e.target.value }))}
      />
      {/* <TextField
        margin="dense"
        label="Date of Birth"
        fullWidth
        value={currentPerson?.dob || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, dob: e.target.value }))}
      /> */}
      <TextField
        margin="dense"
        label="Date of Birth"
        type="date" // Set input type to "date"
        fullWidth
        // value={formatDateForInput(currentPerson?.dob || '')} // Format date for input
        value={(currentPerson?.dob || '')} // Format date for input
        onChange={e => setCurrentPerson(prev => ({ ...prev!, dob: e.target.value }))}
        InputLabelProps={{
          shrink: true, // Ensure the label stays when a date is selected
        }}
      />

    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {currentPerson ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default PersonDialog;
