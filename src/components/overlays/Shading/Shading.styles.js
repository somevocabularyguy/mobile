import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 10,
  },
  shadingVisible: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  shadingPressable: {
    width: '100%',
    height: '100%',
  }
})

export default styles;