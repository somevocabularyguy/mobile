import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  blankButton: {
    width: 200, 
    height: 48,
    borderRadius: 8,
    backgroundColor: "#e9e9ed",
  },
  deleteButton: {
    backgroundColor: "#cc0000",
  },
  deleteButtonText: {
    textAlign: "center",
    lineHeight: 46,
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffecec",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 46
  },
  popup: {
    left: "10%",
    width: "80%",
    padding: 24,
    gap: 16,
    alignItems: "center",
    position: "absolute",
    top: "35%",
    borderRadius: 16, 
    backgroundColor: "#060606",
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "red",
    opacity: 0,
  },
  popupText: {
    fontSize: 16,
    textAlign: "center",
    width: "90%",
    color: "white"
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 8,
  },
  popupVisible: {
    opacity: 1
  },
})

export default styles;