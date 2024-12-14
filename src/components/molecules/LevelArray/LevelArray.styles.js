import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  levelArray: {
    borderWidth: 3,
    borderColor: '#6b6b6b',
  },
  hidden: {
    maxHeight: 6,
  },
  customEmptyContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  customEmptyText: {
    marginTop: 38,
    color: 'white',
    fontSize: 28,
    width: 120,
    textAlign: 'center',
    lineHeight: 40,
  }
});

export default styles;