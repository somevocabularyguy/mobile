import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#5b5b5b',
    width: 300,
    height: '100%',
    position: 'absolute',
    right: 0,
    right: -300,
    padding: 8,
    zIndex: 20,
    justifyContent: 'center'
  },
  mainContainerVisible: {
    right: 0
  },
  languageToggle: {
    position: 'absolute',
    height: 64,
    width: 64,
    backgroundColor: 'green',
    bottom: 4,
    right: 72,
    zIndex: 30
  },
  languageToggleActive: {
    right: 4,
    width: 292,
    justifyContent: 'center',
    zIndex: 31
  },
  languageActiveIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    gap: 20
  },
})

export default styles;