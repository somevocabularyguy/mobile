import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    bottom: 50,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  dropdownText: {
    fontSize: 12,
    paddingLeft: 1,
    color: 'white',
    width: '40%'
  },
  dropdownButton: {
    width: '60%',
    height: 30,
    backgroundColor: '#ddd4cc',
    alignItems: 'center',
    borderRadius: 5,
  },
  dropdownButtonActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  dropdownButtonInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dropdownButtonText: {
    paddingLeft: 10,
    textAlign: 'left',
    lineHeight: 28,
    width: '100%',
    fontSize: 13
  },
  dropdownArrowIcon: {
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    top: 3,
    right: 5,
  },
  dropdownArrowIconActive: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    top: 3,
    right: 5,
  },
  optionsContainer: {
    backgroundColor: '#ddd4cc',
    position: 'absolute',
    width: '60%',
    right: 0,
    top: 30,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  option: {
    width: '100%',
    height: 30,
    borderTopWidth: 1,
    borderTopColor: '#d0c8c0',
    alignItems: 'center',
  },
  optionText: {
    lineHeight: 26,
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    paddingLeft: 10
  },
})

export default styles;