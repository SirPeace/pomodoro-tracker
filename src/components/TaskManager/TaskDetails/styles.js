import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  TaskDetails: {
    padding: 20,
  },

  TaskDetails__paper: {
    minWidth: 304,
    top: 64,
    zIndex: theme.zIndex.drawer * 2,
  },

  "@media (max-width: 600px)": {
    TaskDetails__paper: {
      top: 56,
      width: "100%",
    },
  },

  TaskDetails__header: {
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
  },

  TaskDetails__btn: {
    marginLeft: -5,
    padding: 5,
    color: "#777",
  },

  TaskDetails__form: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  TaskDetails__name: {
    marginBottom: 30,
  },

  TaskDetails__note: {
    marginBottom: 20,
  },

  TaskDetails__noteInput: {
    fontSize: 14,
  },

  TaskDetails__tag: {
    marginBottom: 20,
  },

  TaskDetails__dueTo: {},

  TaskDetails__footer: {},
}))
