import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  ApplicationBar: {
    boxShadow: "0px 1px 4px 0 rgba(0, 0, 0, 0.4)",
    transition: "background-color 0.5s",
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    userSelect: "none",
  },

  barButton: {
    margin: "0 1px",
  },

  appDrawerButton: {
    marginRight: 10,
  },

  title: {
    display: "flex",
    justifyContent: "flex-start",
    flexGrow: 1,
    alignItems: "center",
    height: "100%",
  },

  appTitle: {
    fontSize: 21,
    fontWeight: 500,
    margin: 0,
  },

  sessionProgress: {
    fontSize: 19,
    margin: 0,
    padding: 0,
    fontStyle: "italic",
  },

  separator: {
    height: "50%",
    width: 2,
    backgroundColor: "#fff",
    margin: "0 12px",
  },

  "@media (max-width: 640px)": {
    appTitle: {
      fontSize: 19,
    },

    sessionProgress: {
      fontSize: 17,
    },

    barButton: {
      padding: 8,
      margin: 0,
      "&:first-child": {
        marginRight: 8,
      },
    },

    separator: {
      margin: "0 6px",
    },
  },

  "@media (max-width: 530px)": {
    title: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    },

    sessionProgress__separator: {
      display: "none",
    },

    appTitle: {
      marginBottom: 0,
    },

    appControls__settings: {
      display: "none",
    },

    sessionProgress: {
      display: "block",
      fontSize: 14,
    },
  },
}))
