import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsUiState {
  isHiddenSettingsVisible: boolean;
  isCustomSettingsVisible: boolean;
  isAccountSettingsVisible: boolean;
}

const initialState: SettingsUiState = {
  isHiddenSettingsVisible: false,
  isCustomSettingsVisible: false,
  isAccountSettingsVisible: false
}

const settingsUiSlice = createSlice({
  name: 'settingsUi',
  initialState,
  reducers: {
    updateIsHiddenSettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.isHiddenSettingsVisible = action.payload;
    },
    updateIsCustomSettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.isCustomSettingsVisible = action.payload;
    },
    updateIsAccountSettingsVisible: (state, action: PayloadAction<boolean>) => {
      state.isAccountSettingsVisible = action.payload;
    }
  }
})

export const { updateIsHiddenSettingsVisible, updateIsCustomSettingsVisible, updateIsAccountSettingsVisible } = settingsUiSlice.actions; 
export default settingsUiSlice.reducer;