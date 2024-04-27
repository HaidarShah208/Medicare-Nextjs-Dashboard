import instance from '@/utils/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  async (email: string) => {
    try {
      const response = await instance.post("forgotPassword", { email });

      if (response.status !== 200) {
        throw new Error('Forgot password request failed');
      }

      return response.data;
    } catch (error) {
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
        state.error = action.error.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
