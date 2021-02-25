import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  shell: {
    backgroundColor: "#fdfdfd",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },

  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 1,
    height: "100%",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: "#fff",
  },

  persistantPaperDrawer: {
    minWidth: 280,
    top: 64,
  },

  "@media (max-width: 600px)": {
    persistantPaperDrawer: {
      top: 56,
      width: "100%",
    },
  },
}))
