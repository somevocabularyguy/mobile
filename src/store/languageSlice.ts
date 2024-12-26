import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordResources } from '@/types';

interface LanguageState {
  wordResources: WordResources;
}

const initialState: LanguageState = {
  wordResources: {},
} 

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateWordResources: (state, action: PayloadAction<WordResources>) => {
      if (!action.payload) return state;
      state.wordResources = action.payload;
    },
  }
})

export const { updateWordResources } = languageSlice.actions;
export default languageSlice.reducer;