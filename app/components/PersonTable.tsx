//'use client'

import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Person } from '../lib/person';

interface PersonTableProps {
  people: Person[];
  handleOpen: (person: Person | null) => void;
  handleDelete: (id: number) => void;
}
 // Helper function to format the data
 const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date'; // Handle invalid date formats
  return d.toLocaleDateString('en-AU');
 }
const PersonTable: React.FC<PersonTableProps> = ({ people, handleOpen, handleDelete }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Date of Birth</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {people.map(person => (
          <TableRow key={person.id}>
            <TableCell>{person.firstname}</TableCell>
            <TableCell>{person.lastname}</TableCell>
            <TableCell>{person.phone}</TableCell>
            <TableCell>{formatDate(person.dob)}</TableCell>
            <TableCell>
              <Button onClick={() => handleOpen(person)}>Edit</Button>
              <Button onClick={() => handleDelete(person.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default PersonTable;
