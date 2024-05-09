import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '@/utils/instance';
import axios from 'axios';

interface patietnsData{
id:string;
}

const initialState = {
  patients: [] as patietnsData[],
  loading: false,
  error: null as null | string,
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
  async (id: string,{ dispatch }) => {
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
      dispatch(fetchPatients(1));
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
        state.error = action.error.message ?? 'Unknown error';
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
