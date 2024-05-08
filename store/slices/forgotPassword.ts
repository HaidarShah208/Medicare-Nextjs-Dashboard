import instance from '@/utils/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
}

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
};

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, newPassword }: { email: string, newPassword: string }) => {
    try {
      const response = await instance.put("forgotPassword", { email,newPassword });

      if (response.status !== 200) {
        toast.error("error:"+response.status)
        throw new Error('Forgot password request failed');
      }
      toast.success("Password changed successfully.");
      return response.data;
    } catch (error:any) {
      toast.error("Error in forgot password request:  "+error.message);
      throw new Error('Error in forgot password request');
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default forgotPasswordSlice.reducer;
