import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  accountSection: {
    height: 0,
    backgroundColor: "#424242",
    borderWidth: 8,
    borderColor: "#202020",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    gap: 16,
    // transition: height 0.4s ease-in-out, 
  },
  accountSectionVisible: {
    height: 120,
  },
  blankButton: {
    width: 160, 
    height: 48,
    borderRadius: 8,
    backgroundColor: "#e9e9ed"
  },
  blankButtonText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 46,
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
  signInButton: {
    width: 160,
    height: 48,
    borderRadius: 28,
    backgroundColor: "#dda400",
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText: {
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
    lineHeight: 46,
  }
})

export default styles;