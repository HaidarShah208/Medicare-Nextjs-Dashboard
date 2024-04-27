import instance from '@/utils/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface  addPatients {
    loading: boolean;
    error: any;  
    userInfo: any;  
  }

const initialState:addPatients = {
  loading: false,
  error: null,
  userInfo: null,
};

export const addPatient = createAsyncThunk(
  'signup/addPatient',
  async (requestData) => {
    const response = await instance.post("patients",requestData)
    

    if (response.status !== 200) {
      throw new Error('Failed to submit data');
    }

    const userInfo = await response.data;
    return userInfo;
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default signupSlice.reducer;
