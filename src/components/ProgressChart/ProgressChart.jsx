import { makeStyles, MenuItem, Select } from "@material-ui/core"
import React from "react"
import { Line } from "react-chartjs-2"
import { useMediaQuery } from "react-responsive"

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },

  select: {
    marginLeft: 5,
    cursor: "pointer",
    alignSelf: "flex-end",
  },

  selectElement: {
    padding: "10px 32px 10px 10px",
  },
}))

function ProgressChart() {
  const classes = useStyles()

  const [chart, setChart] = React.useState("today")

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  const mobileProps = isMobile
    ? {
        height: 300,
      }
    : {}

  const renderChart = () => {
    switch (chart) {
      case "today":
        return (
          <Line
            {...mobileProps}
            data={{
              labels: ["13:00", "14:00", "16:00", "19:00", "20:00"],
              datasets: [
                {
                  label: "Minutes of focus",
                  data: [70, 60, 90, 25, 40],
                  fill: "origin",
                  backgroundColor: "rgba(229, 115, 115, 0.3)",
                  borderColor: "rgb(229, 115, 115)",
                },
              ],
            }}
          />
        )
      case "week":
        return (
          <Line
            {...mobileProps}
            data={{
              labels: ["21", "22", "23", "24", "25", "26", "27"],
              datasets: [
                {
                  label: "Minutes of focus",
                  data: [150, 60, 90, 250, 300, 190, 110],
                  fill: "origin",
                  backgroundColor: "rgba(229, 115, 115, 0.3)",
                  borderColor: "rgb(229, 115, 115)",
                },
              ],
            }}
          />
        )
      case "year":
        return (
          <Line
            {...mobileProps}
            data={{
              labels: [
                "Oct",
                "Nov",
                "Dec",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
              ],
              datasets: [
                {
                  label: "Minutes of focus",
                  data: [
                    7000,
                    6000,
                    9000,
                    2500,
                    4000,
                    3000,
                    5000,
                    7000,
                    6000,
                    9000,
                    2500,
                    4000,
                  ],
                  fill: "origin",
                  backgroundColor: "rgba(229, 115, 115, 0.3)",
                  borderColor: "rgb(229, 115, 115)",
                },
              ],
            }}
          />
        )
      default:
        return <span>Unexpected chart</span>
    }
  }

  return (
    <div className={classes.wrapper}>
      <Select
        className={classes.select}
        variant="outlined"
        SelectDisplayProps={{ className: classes.selectElement }}
        value={chart}
        onChange={evt => setChart(evt.target.value)}
      >
        <MenuItem value={"today"}>Today</MenuItem>
        <MenuItem value={"week"}>Week</MenuItem>
        <MenuItem value={"year"}>Year</MenuItem>
      </Select>

      {renderChart()}
    </div>
  )
}

export default ProgressChart
