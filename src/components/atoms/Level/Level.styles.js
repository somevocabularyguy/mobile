import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  level:  {
    width: 45,
    height: 45,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelChecked: {
    borderWidth: 12,
    borderColor: '#e6ac00'
  },
  innerSquare: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerSquareText: {
    fontSize: 14,
    color: 'white'
  }
});

export default styles;