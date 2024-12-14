import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  hiddenCustomSection: {
    height: 0,
    backgroundColor: "#424242",
    borderWidth: 8,
    borderColor: "#202020",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    // transition: height 0.4s ease-in-out, 
  },
  hiddenCustomSectionVisible: {
    height: 500,
  },
  hiddenCustomContainer: {
    backgroundColor: "#343434",
    borderWidth: 4,
    borderColor: "#646464",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  }, 
  hiddenCustomLabel: {
    fontSize: 24,
    textAlign: "center",
    margin: 0,
    color: "white"
  },
  hiddenCustomSearch: {
    width: "100%",
    height: 40,
    borderRadius: 0,
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: "#646464",
    color: "white",
    position: "relative",
    alignText: "center",
    paddingTop: 0,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    top: 4,
    fontSize: 20,
    color: "white"
  },
  hiddenCustomWordsContainer: {
    width: "100%",
    height: 400,
  },
  hiddenCustomWordContainer: {
    width: "100%",
    height: 44,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#646464",
    flexDirection: "row"
  },
  hiddenCustomWordText: {
    textAlign: "center",
    fontSize: 20,
    flex: 1,
  },  
  hiddenCustomDeleteIcon: {
    height: "100%",
    width: 96,
    padding: 6,
    backgroundColor: "#cc0000",
  },
  highlightedSubtext: {
    color: "#2aaaff",
  },
  notFoundText: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 24,
    lineHeight: 350,
    color: "white"
  },

})

export default styles;