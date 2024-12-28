import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
  sidebarContainer: {
    backgroundColor: '#5b5b5b',
    width: 220,
    paddingLeft: 2,
    position: 'absolute',
    height: '100%',  
    left: -220,
    zIndex: 20,
    alignItems: "center"
  },
  sidebarVisible: {
    left: 0,
  },
  mainLink: {
    width: '100%',
    height: 120,
    right: 2,
    top: 5
  },
  mainLinkInnerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarLink: {
    width: 200,
    height: 55,
    paddingLeft: 10
  },
  sidebarLinkActive: {
    borderLeftWidth: 2,
    borderLeftColor: 'gold'
  },
  sidebarLinkContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  sidebarLinkText: {
    color: 'white',
    fontSize: 20,
    flex: 1,
    lineHeight: 50
  },
  linkDividerLine: {
    marginTop: 10,
    marginBottom: 10, 
  },
  sidebarToggle: {
    position: 'absolute',
    height: 64,
    width: 64,
    bottom: 4,
    left: 4,
    backgroundColor: 'green',
    zIndex: 30
  },
  sidebarToggleActive: {
    width: 212,
    justifyContent: 'center'
  },
  sidebarActiveIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sidebarSingleIcon: {
    right: 8,
    bottom: 10
  },
  signInButton: {
    width: 180,
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
  },
  signOutButton: {
    width: 180,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#999999",
  },
  signOutButtonText: {
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
    lineHeight: 46,
  }
})

export default styles;