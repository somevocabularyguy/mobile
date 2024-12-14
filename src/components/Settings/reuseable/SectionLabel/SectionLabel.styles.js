import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionLabelContainer: {
    flexDirection: "row",
    position: "relative",
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 24,
    color: "white"
  },
  sectionToggleIcon: {
    position: "absolute",
    width: 40,
    height: 40,
    left: 20,
    // transform: rotate(-90deg),
    // transition: transform 0.3s ease,
  },
  sectionToggleIconActive: {
    // transform: rotate(0deg),
  }
})

export default styles;