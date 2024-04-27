// slices/changePassword.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const changePassword = createAsyncThunk<void, { email: string, oldPassword: string, newPassword: string }>(
  'changePassword',
  async (payload) => {
    const response = await fetch("/api/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to change password.");
    }
  }
);

interface ChangePasswordState {
  loading: boolean;
  error: string | null;
}

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to change password.';
    });
  },
});

export default changePasswordSlice.reducer;
