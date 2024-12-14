import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainGrid: {
    alignItems: 'center',
  },
  wordLabel: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 40,
    color: 'white'
  },
  shownTextContainer: {
    width: '90%',
  },
  headLabel: {
    fontSize: 16,
    color: '#cf8888',
    textAlign: 'center',
    height: 24,
  },
  dynamicLabel: {
    minHeight: 46,
  },
  dynamicLabelItem: {
    fontSize: 16,
    color: 'white',
    width: '100%',
    lineHeight: 18,
    textAlign: 'center',
    padding: 4,
  },
  arrayTextContainer: {
    minHeight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  arrayText: {
    padding: 4,
    color: 'white'
  }
})

export default styles;