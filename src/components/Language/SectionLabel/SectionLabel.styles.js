import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionLabelContainer: {
    position: 'relative',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderColor: '#282828',
    backgroundColor: '#888888',
    flexDirection: 'row'
  },
  sectionLabelText: {
    color: 'white',
    fontSize: 20,
    flex: 1,
    bottom: 2,
    textAlign: 'center',
  },
  sectionToggleIcon: {
    marginRight: 5,
    transform: [{ rotate: '180deg' }],
  },
  sectionToggleIconActive: {
    transform: [{ rotate: '90deg' }],
  },
})

export default styles;