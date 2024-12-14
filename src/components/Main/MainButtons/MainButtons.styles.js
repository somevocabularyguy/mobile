import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    bottom: 180,
    width: '100%',
    justifyContent: 'space-around',
    gap: 32
  },
  mainButtonsContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    gap: 54
  },
  mainButton: {
    width: 120,
    height: 84,
    border: 'none',
    borderRadius: 4,
    backgroundColor: '#f2b500',
  },
  mainButtonText: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 78,
    fontFamily: 'Poppins',
  },
  sideButtonsContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    gap: 54
  },
  removeButton: {
    width: 100,
    height: 60,
    borderRadius: 4,
    backgroundColor: "#f2b500",
    fontSize: 16,
    paddingLeft: 7,
    paddingRight: 7,
    justifyContent: 'center'
  },
  removeButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  addToCustomButton: {
    backgroundColor: "#f2b500",
    borderRadius: 4,
    width: 100,
    height: 60,
    justifyContent: 'center',
  },
  customButtonText: {
    fontSize: 14,
    textAlign: 'center',
  }
})

export default styles;