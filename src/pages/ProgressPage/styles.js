import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20,
    fontSize: 18,
  },

  heading: {
    marginBottom: 20,
  },

  goal: {
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    color: "#777",
  },

  goalSelect: {
    marginLeft: 5,
    cursor: "pointer",
  },

  goalSelectElement: {
    padding: "10px 32px 10px 10px",
  },

  metricsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  metric: {
    padding: "20px 0",
    fontWeight: 300,
    color: "#777",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.1s",

    "&:hover": {
      backgroundColor: "#EFEFEF",
    },
  },

  metricValue: {
    fontSize: 19,
    fontWeight: 700,
    color: "#e57373",
    marginLeft: 4,
  },

  icon: {
    marginRight: 10,
  },
}))
