import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LevelKey } from '@/types';

interface UIState {
  isLevelsVisible: boolean;
  isSidebarVisible: boolean;
  visibleLevelSectionKey: LevelKey;
  isShadingVisible: boolean;
}

const initialState: UIState = {
  isLevelsVisible: false,
  isSidebarVisible: false,
  visibleLevelSectionKey: 'easy',
  isShadingVisible: false
} 

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateVisibleLevelSectionKey: (state, action: PayloadAction<LevelKey>) => {
      state.visibleLevelSectionKey = action.payload
    },
    updateIsLevelsVisible: (state, action: PayloadAction<boolean>) =>  {
      state.isLevelsVisible = action.payload;
    },
    updateIsSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSidebarVisible = action.payload;
    },
    updateIsShadingVisible: (state, action: PayloadAction<boolean>) => {
      state.isShadingVisible = action.payload;
    }
  }
})

export const { updateIsLevelsVisible, updateIsSidebarVisible, updateVisibleLevelSectionKey, updateIsShadingVisible } = uiSlice.actions;
export default uiSlice.reducer;