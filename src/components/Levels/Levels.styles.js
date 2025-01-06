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
    zIndex: 30,
    justifyContent: 'center',
  },
  levelsToggleActive: {
    width: 292,
    justifyContent: 'center',
    zIndex: 31
  },
  levelsActiveIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  },
  randomToggleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  randomToggle: {
    height: 40, 
    width: 100,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#e8eaed',
    backgroundColor: '#e8eaed',
    justifyContent: 'center',
  },
  randomToggleActive: {
    borderWidth: 4,
    borderColor: 'greenyellow',
    backgroundColor: '#ff8855',
  },
  randomnessButtonText: {
    fontSize: 16,
    textAlign: 'center',
    bottom: 1
  },
  infoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: '#ffbf00',
    borderRadius: 12,
    marginRight: 10,
  },
  infoIcon: {
    width: 32,
  },
});

export default styles;