import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  Task: {
    display: "flex",
    alignItems: "center",
    padding: "8px 10px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 4,
    position: "relative",
    margin: "5px 0",
    zIndex: 1600,
    opacity: 1,
    transition: "opacity 0.3s, background-color 0.2s",
    width: "100%",

    "&:hover": {
      background: "#fdfdfd",
      borderColor: "rgba(0, 0, 0, 0.16)",
    },
  },

  "@media (max-width: 600px)": {
    Task: {
      cursor: "pointer",
      padding: 12,
    },

    Task__name: {
      fontSize: 16,
    },

    Task__checkbox: {
      width: 26,
      height: 26,
    },
  },

  tagLabel: {
    content: '""',
    position: "absolute",
    top: -1,
    left: -1,
    bottom: -1,
    width: 5,
    borderRadius: "4px 0 0 4px",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },

  Task_enter: {
    opacity: 0,
  },

  Task_enterActive: {
    opacity: 1,
  },

  Task_exitActive: {
    opacity: 0,
  },

  Task_focus: {
    boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
  },

  Task__name: {
    flexGrow: 1,
    fontSize: 15,
    border: "none",
    padding: 0,
    margin: 0,
    outline: "none",
    background: "transparent",
    marginLeft: 7,
  },

  Task__detailsBtn: {
    height: 26,
    width: 26,
  },

  Task__checkbox: {
    width: 21,
    height: 21,
    position: "relative",
  },

  Task__checkboxLabel: {
    cursor: "pointer",
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "2px solid #999",
    transition: "border-color 0.2s",

    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },

  Task__checkboxLabel_checked: {
    border: "none",
  },

  Task__checkboxTick: {
    opacity: 0,
    position: "absolute",
    left: -1.5,
    top: -1.5,
    fontSize: 24,
    color: "#cc6363",
    pointerEvents: "none",
  },

  Task__checkboxTick_enterActive: {
    animation: "$check 0.5s",
  },

  "@keyframes check": {
    "50%": {
      opacity: 1,
      transform: "scale(1.5)",
    },

    "100%": {
      opacity: 0,
      transform: "scale(0.5)",
    },
  },
}))
