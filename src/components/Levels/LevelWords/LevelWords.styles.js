import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  levelWordsContainer: {
    height: 172,
  },
  levelWordsLabel: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10
  },
  levelWordsGrid: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  levelWordContainer: {
    width: '50%',
    height: 25
  },
  levelWord: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    lineHeight: 20
  },
})

export default styles;