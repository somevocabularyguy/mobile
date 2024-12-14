import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  levelsContainer: {
    paddingTop: 14,
    alignItems: 'center',
    width: 300,
    height: '100%',
    position: 'absolute',
    right: -301,
    backgroundColor: '#5b5b5b',
    zIndex: 20
  },
  levelsContainerVisible: {
    right: 0
  },
 
  checkedLevelAmountText: {
    color: 'white',
    fontSize: 18,
    position: 'relative',
    top: 2
  },
  levelsToggle: {
    position: 'absolute',
    height: 64,
    width: 64,
    backgroundColor: 'green',
    bottom: 4,
    right: 4,
    zIndex: 30
  },
  levelsToggleActive: {
    width: 292,
    justifyContent: 'center'
  },
  levelsActiveIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  levelsSingleIcon: {
    right: 8,
    bottom: 10
  }
});

export default styles;