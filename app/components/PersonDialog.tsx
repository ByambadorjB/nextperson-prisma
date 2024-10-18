//'use client'

import React, {useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Typography } from '@mui/material';
// import {LocalizationProvider} from '@mui'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Person } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => {
  const [isFormValid, setIsFormValid] = useState(false); // Declare state here
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Check if all fields are filled
  useEffect(() => {
    if (currentPerson?.firstname && currentPerson?.lastname && currentPerson?.phone && currentPerson?.dob) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [currentPerson]);

  const handleFormSubmit = () => {
    // Check if the form is valid before proceeding
    if (!isFormValid) {
      setSnackbarOpen(true); //// Open Snackbar if form is invalid
      // You can add any alert or message here if needed
      console.warn('Form is not valid, please fill in all fields.');
      return; // Stop the submission process
    }
    
    // Call the original handleSubmit function if form is valid
    handleSubmit();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  // Get today's date
  const today = dayjs();

  return(

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
          type="date" // Set input type to "date"
          fullWidth
          // value={formatDateForInput(currentPerson?.dob || '')} // Format date for input
          value={(currentPerson?.dob || '')} // Format date for input
          onChange={e => setCurrentPerson(prev => ({ ...prev!, dob: e.target.value }))}
          InputLabelProps={{
            shrink: true, // Ensure the label stays when a date is selected
          }}
        /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="Date of Birth"
            value={currentPerson?.dob ? dayjs(currentPerson.dob) : null}
            onChange={(newValue) => setCurrentPerson(prev => ({ ...prev!, dob:newValue?.toISOString() || '' }))}
            maxDate={today} // Prevent selecting future dates
            slotProps={{
              textField: { fullWidth: true, margin: 'dense'},
            }}
          />
        </LocalizationProvider>
        {/* Reminder message for form validation */}
        {!isFormValid && (
          <Typography color="error" variant="body2">
            Please fill in all fields before submitting.
          </Typography>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} 
          color="primary"
          // disabled={!isFormValid}
        >
          {currentPerson ? 'Update' : 'Add'}
        </Button>
      </DialogActions>

      {/* Snackbar for additional user feedback */}
      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Please fill in all fields before submitting."
      />
    </Dialog>
  );
};
  
export default PersonDialog;
