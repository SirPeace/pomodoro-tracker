import { colors, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  Task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    transition: "background 0.2s",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 4,
    position: "relative",
    margin: "5px 0",
    zIndex: 1600,

    "&:hover": {
      background: "#fafafa",
    },

    "&:before": {
      content: '""',
      position: "absolute",
      top: -1,
      left: -1,
      bottom: -1,
      width: 5,
      borderRadius: "4px 0 0 4px",
      borderRight: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },

  Task_urgent: {
    "&:before": {
      backgroundColor: colors.red[400],
    },
  },

  taskName: {
    fontSize: 16,
    border: "none",
    padding: "none",
    margin: "none",
    outline: "none",
    background: "transparent",
  },

  deleteIcon: {
    fontSize: 20,
    transition: "color 0.2s",
    "&:hover": {
      color: "crimson",
      cursor: "pointer",
    },
  },
}))
