import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
    margin: "50px 0",
  },

  counter: {
    fontFamily: "Open Sans",
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "5em",
    color: "rgb(85, 85, 85)",
    transform: "translate(-50%, -50%)",
  },

  "@global": {
    svg: {
      width: 320,
      height: 320,
    },

    circle: {
      stroke: "rgba(192, 192, 192, 0.473)",
      fill: "transparent",
      strokeWidth: 20,
    },
  },

  progress: {
    transformOrigin: "center",
    transform: "rotate(-90deg) rotateX(180deg)",
    stroke: theme.palette.primary.main,
    transition: "stroke 0.5s",
  },

  "@media (max-width: 400px)": {
    "@global": {
      svg: {
        width: 300,
        height: 300,
      },

      circle: {
        strokeWidth: 18,
      },
    },

    counter: {
      fontSize: "4em",
    },
  },

  "@media (max-height: 700px)": {
    wrapper: {
      margin: "20px 0",
    },
  },

  "@media (max-height: 650px)": {
    "@global": {
      svg: {
        width: 270,
        height: 270,
      },

      circle: {
        strokeWidth: 15,
      },
    },

    wrapper: {
      margin: "10px 0",
    },
  },
}))
