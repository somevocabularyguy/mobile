import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  mainSection: {
    borderWidth: 4,
    borderColor: '#282828',
    borderTopWidth: 0,
    backgroundColor: '#888888',
    height: 0,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mainSectionVisible: {
    height: 430,
  },
  topContainer: {
    flexDirection: 'row'
  },
  leftContainer: {
    flexDirection: 'column',
    height: '100%',
    padding: 8,
    gap: 8,
  },
  iconsContainer: {
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'row'
  },
  infoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#ffbf00',
    borderRadius: 12,
  },
  infoIcon: {

  },
  resetIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderWidth: 4, 
    borderColor: '#444444',
    borderRadius: 12,
    opacity: 0
  },
  resetIcon: {
    transform: [{ scaleX: -1 }]
  },
  resetIconVisible: {
    opacity: 1
  },
  currentLanguage: {
    fontSize: 20,
    textAlign: 'center',
    color: '#e9e9ed',
    fontWeight: 'bold',
    width: '100%',
    height: 40,
    borderWidth: 5, 
    borderColor: '#ff9c22',
  },
  currentArrayContainer: {
    borderWidth: 4, 
    borderColor: '#444444',
    height: 300,
    width: 136,
  },
  selectedLanguage: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    width: '100%',
    height: 48,
    borderWidth: 4, 
    borderColor: '#222222',
    backgroundColor: '#555555',
  },
  optionsContainer: {
    marginTop: 12,
    maxHeight: 300,
  },
  optionsContainerContent: {
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 15,
    color: '#e9e9ed',
  },
  languageOption: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    width: 120,
    height: 42,
    borderWidth: 4,  
    borderColor: '#444444',
    borderRadius: 12,
  },
  languageOptionSelected: {
    borderColor: '#222222',
    backgroundColor: '#555555',
  },
  selectedLanguageText: {
    fontSize: 16,
    color: '#e9e9ed',
  },
  wordsLanguage: {
    borderColor: '#ff9c22',
  },
  applyButton: {
    width: 200,
    height: 44,
    backgroundColor: '#d0d0d0',
    borderRadius: 12, 
    marginTop: 8,
    bottom: 8,
  },
  applyButtonText: {
    fontFamily: 'poppins',
    fontSize: 20,
    height: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    bottom: 1
  }
});

export default styles;