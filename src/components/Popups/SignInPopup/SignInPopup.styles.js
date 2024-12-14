import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: '#242424',
    borderWidth: 2,
    borderColor: "#dda400",
    borderRadius: 16,
    alignItems: 'center',
    position: "absolute",
    zIndex: 1002,
    top: "30%",
    left: "5%",
    opacity: 0
  },
  containerVisible: {
    opacity: 1
  },
  mainSection: {
    width: 320,
  },
  warningBox: {
    width: '100%',
    backgroundColor: '#c44336',
    height: 50,
    borderRadius: 5,
    justifyContent: "center"
  },
  warningText: {
    fontSize: 16,
    textAlign: "center"
  },
  textInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8
  },
  emailLabel: {
    color: 'white',
    fontSize: 18,
    left: 1
  },
  emailInput: {
    backgroundColor: 'white',
    height: 45,
    borderRadius: 5,
    fontSize: 18,
    paddingLeft:12,
    paddingRight: 12,
  },
  emailButton: {
    width: '100%',
    height: 45,
    marginTop: 12,
    borderRadius: 5,
    backgroundColor: '#f2b500',
  },
  emailButtonText: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 40
  },
  waitingSection: {
    width: 340,
    alignItems: 'center',
  },
  waitingSectionInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 8,
    height: 56,
    borderWidth: 2,
    borderColor: '#00a0ff',
    borderRadius: 5,
    fontSize: 20,
    alignItems: 'center',
  },
  waitingSectionTextContainer: {
    justifyContent: 'center',
    paddingLeft: 8
  },
  waitingSectionText: {
    color: 'white',
  },
  waitingSectionSmallText: {
    fontSize: 12,
    color: '#7b8187',
  },
  waitingRefreshContainer: {
    marginTop: 30,
    borderColor: 'gold',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center'
  },
  waitingRefreshText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    lineHeight: 28
  },
  waitingRefreshButton: {
    width: '40%',
    marginTop: 30,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ddbb22'
  },
  waitingRefreshButtonText: {
    fontSize: 22,
    lineHeight: 45,
    textAlign: 'center'
  },
  hidden: {
    display: "none"
  },
  none: {

  }
})

export default styles;