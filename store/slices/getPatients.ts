import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '@/utils/instance';
import toast from 'react-hot-toast';
import axios from 'axios';

const initialState = {
  patients: [],
  loading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (pageNumber: number) => {
    const response = await instance.get(`patients?page=${pageNumber}`);  
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch patients');
    }

    const patients = await response.data;
    return patients;
  }
);

export const deletePatients = createAsyncThunk(
  "patients/deletePatients",
  async (id: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/patients", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return id;
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  }
);


export const updatePatients = createAsyncThunk(
  "patients/updatePatients",
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/patients`, {
        id,
        ...data,
      });

      console.log("Updated patients with id:", id);

      return response.data;
    } catch (error) {
      console.error("Error updating patients:", error);
      throw error;
    }
  }
);
const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePatients.fulfilled, (state, action) => {  
        state.loading = false;
        state.patients = state.patients.filter(patient => patient.id !== action.payload);
      })
      .addCase(updatePatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        console.log("patients updated successfully:", action.payload);
      });      
  },
});

export default patientsSlice.reducer;
