import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  Popper: {
    position: "absolute",
    top: 0,
    zIndex: 1700,
  },

  Popper__paper: {
    width: "130px",
  },

  Popper__button: {
    position: "relative",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "10px 12px",
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
    fontSize: 14,
    transition: "background-color 0.3s",
    cursor: "pointer",

    "&:last-child": {
      borderBottom: "none",
    },

    "&:hover": {
      backgroundColor: "#fafafa",
    },

    "&:active": {
      transition: "none",
      backgroundColor: "#ddd",
    },
  },

  Popper__icon: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#777",
  },

  deleteIcon: {},
  exitIcon: {},
}))
