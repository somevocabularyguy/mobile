import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },  
  formContainer: {
    top: 200,
    width: '80%'
  },
  submitButton: {
    height: 48,
    borderRadius: 4,
    backgroundColor: '#cc9900',
    justifyContent: 'center',
    marginTop: 40
  },
  submitButtonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    width: '100%'
  },
  hidden: {
    opacity: 0
  },
  thanksDiv: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    bottom: 80
  }
})

export default styles;