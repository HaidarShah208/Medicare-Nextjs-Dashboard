import instance from '@/utils/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async () => {
    try {
      const response = await instance.get('appointments');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'getAppointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentsSlice.reducer;