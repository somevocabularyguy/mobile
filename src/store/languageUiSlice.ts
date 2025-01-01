import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageUiState {
  isLanguageVisible: boolean;
  isAppLanguageSelectVisible: boolean;
  isWordsLanguageSelectVisible: boolean;
  isOtherLanguagesSelectVisible: boolean;
}

const initialState: LanguageUiState = {
  isLanguageVisible: false,
  isAppLanguageSelectVisible: true,
  isWordsLanguageSelectVisible: false,
  isOtherLanguagesSelectVisible: false
}

const languageUiSlice = createSlice({
  name: 'languageUi',
  initialState,
  reducers: {
    updateIsLanguageVisible: (state, action: PayloadAction<boolean>) => {
      state.isLanguageVisible = action.payload;
    },
    updateIsAppLanguageSelectVisible: (state, action: PayloadAction<boolean>) => {
      state.isAppLanguageSelectVisible = action.payload;
    },
    updateIsWordsLanguageSelectVisible: (state, action: PayloadAction<boolean>) => {
      state.isWordsLanguageSelectVisible = action.payload;
    },
    updateIsOtherLanguagesSelectVisible: (state, action: PayloadAction<boolean>) => {
      state.isOtherLanguagesSelectVisible = action.payload;
    }
  }
})

export const { 
  updateIsLanguageVisible,
  updateIsAppLanguageSelectVisible, 
  updateIsWordsLanguageSelectVisible, 
  updateIsOtherLanguagesSelectVisible, 
} = languageUiSlice.actions; 

export default languageUiSlice.reducer;