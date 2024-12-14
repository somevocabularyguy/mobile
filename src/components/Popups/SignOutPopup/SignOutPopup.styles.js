import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

  blankButton: {
    width: 200, 
    height: 48,
    borderRadius: 8,
    backgroundColor: "#e9e9ed",
  },
  signOutButton: {
    backgroundColor: "#dda400",
    color: "#000000",
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
    opacity: 0
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
  signOutPopup: {
    borderColor: "#dda400"
  },
  popupVisible: {
    opacity: 1
  },
  progressLinkText: {
    color: "#dda400",
    fontWeight: "bold",  
    padding: 8,
  }
})

export default styles;