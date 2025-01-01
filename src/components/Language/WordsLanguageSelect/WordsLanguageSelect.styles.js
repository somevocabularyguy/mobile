import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainSection: {
    borderWidth: 4,
    borderColor: '#282828',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#888888',
    height: 0,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  mainSectionVisible: {
    height: 'auto',
    maxHeight: 430,
  },
  currentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    width: '100%',
  },
  currentLanguage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 132,
    height: 48,
    borderWidth: 4,
    borderColor: '#444444',
    borderRadius: 12,
  },
  currentLanguageText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    bottom: 1,
    color: '#e9e9ed'
  },
  infoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#ffbf00',
    borderRadius: 12,
    position: 'absolute',
    left: 10,
  },
  infoIcon: {
    width: 32,
  },
  resetIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderWidth: 4,
    borderColor: '#444444',
    borderRadius: 12,
    position: 'absolute',
    right: 12,
    opacity: 0
  },
  resetIcon: {
    width: 32,
    transform: [{ scaleX: -1 }]
  },
  resetIconVisible: {
    opacity: 1
  },
  optionsContainer: {
    marginTop: 12,
  },
  optionsContainerContent: {
    gap: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageOption: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    width: 120,
    height: 40,
    borderWidth: 4,
    borderColor: '#444444',
    borderRadius: 12,
    color: 'white'
  },
  languageOptionSelected: {
    borderColor: '#222222',
    backgroundColor: '#555555',
  },
  applyButton: {
    width: 200,
    height: 44,
    backgroundColor: '#d0d0d0',
    borderRadius: 12, 
    marginTop: 12,
    marginBottom: 12,
  },
  applyButtonText: {
    fontFamily: 'poppins',
    fontSize: 20,
    height: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    bottom: 1,
  }
})

export default styles;