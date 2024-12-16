import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettingsState {
  isSignedIn: boolean;
}

const initialState: UserSettingsState = {
  isSignedIn: true,
} 

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    updateIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    }
  }
})

export const { updateIsSignedIn } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;


