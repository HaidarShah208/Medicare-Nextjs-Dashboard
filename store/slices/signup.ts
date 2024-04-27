import instance from '@/utils/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface   signup {
  loading: boolean;
  error: any;  
}

const initialState:signup = {
loading: false,
error: null,
};

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (formData) => {
    try {
      const response = await instance.post("signup", formData);

      if (response.status !== 200) {
        throw new Error('Sign up failed');
      }

      return response.data;
    } catch (error) {
      throw new Error('Error in signup request');
    }
  }
);
const apiSlice = createSlice({
  name: 'signup',
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
