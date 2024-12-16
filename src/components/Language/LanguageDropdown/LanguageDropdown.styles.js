import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    height: 40,
  },

  dropdownButton: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b1aaa3',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: 'black',
    fontFamily: 'Roboto',
  },
  dropdownButtonActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownButtonText: {
    fontSize: 18,
  },
  dropdownArrowIcon: {
    width: 20,
    height: 20,
    fill: 'black',
    transform: [{rotate: '90deg'}], 
  },
  dropdownArrowIconActive: {
    transform: [{rotate: '0deg'}], 
  },
  optionsContainer: {
    backgroundColor: '#b1aaa3',
    position: 'absolute',
    width: '100%',
    top: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },

  option: {
    width: '100%',
    height: 40,
    borderTopWidth: 4,
    borderTopColor: '#85807b',
  },
  optionText: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: 'left',
    color: 'black',
  },
});

export default styles;