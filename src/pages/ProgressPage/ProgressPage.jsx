import React from "react"
import { connect } from "react-redux"
import { Container, MenuItem, Select, Tab, Tabs } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import ScheduleIcon from "@material-ui/icons/Schedule"
import WhatshotIcon from "@material-ui/icons/Whatshot"

import TabPanel from "../../components/TabPanel/TabPanel"
import Page from "../Page"
import ProgressChart from "../../components/ProgressChart/ProgressChart"
import { useStyles as usePageStyles } from "../styles"
import { useStyles } from "./styles"
import { setGoal } from "../../store/actions/progress"
import { uploadUserState } from "../../store/db"

function ProgressPage({ progress, setGoal }) {
  const pageClasses = usePageStyles()
  const classes = useStyles()

  const [tab, setTab] = React.useState(0)
  const handleTabChange = (evt, newTab) => {
    setTab(newTab)
  }

  return (
    <Page>
      <Container className={classes.container}>
        <h2 className={`${pageClasses.h2} ${classes.heading}`}>My Progress</h2>
        <p className={classes.goal}>
          Daily focus goal:
          <Select
            className={classes.goalSelect}
            variant="outlined"
            value={progress.goal}
            SelectDisplayProps={{ className: classes.goalSelectElement }}
            onChange={evt => setGoal(evt.target.value)}
          >
            <MenuItem value={60}>60 minutes</MenuItem>
            <MenuItem value={90}>90 minutes</MenuItem>
            <MenuItem value={120}>120 minutes</MenuItem>
            <MenuItem value={180}>180 minutes</MenuItem>
            <MenuItem value={300}>300 minutes</MenuItem>
          </Select>
        </p>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<FormatListBulletedIcon />} />
          <Tab icon={<EqualizerIcon />} />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <ul className={classes.metricsList}>
            <li className={classes.metric}>
              <WhatshotIcon className={classes.icon} />
              Days streak:{" "}
              <b className={classes.metricValue}>{progress.streak}</b>
            </li>
            <hr />
            <li className={classes.metric}>
              <ScheduleIcon className={classes.icon} />
              Focused minutes today:{" "}
              <b className={classes.metricValue}>{progress.today.minutes}</b>
            </li>
            <li className={classes.metric}>
              <CheckIcon className={classes.icon} />
              Completed tasks today:{" "}
              <b className={classes.metricValue}>{progress.today.tasks}</b>
            </li>
            <hr />
            <li className={classes.metric}>
              <WhatshotIcon className={classes.icon} />
              The best streak:{" "}
              <b className={classes.metricValue}>{progress.bestStreak}</b>
            </li>
            <li className={classes.metric}>
              <ScheduleIcon className={classes.icon} />
              Overall focused minutes:{" "}
              <b className={classes.metricValue}>{progress.overallMinutes}</b>
            </li>
            <li className={classes.metric}>
              <CheckIcon className={classes.icon} />
              Overall tasks completed:{" "}
              <b className={classes.metricValue}>{progress.overallTasks}</b>
            </li>
          </ul>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <ProgressChart
            today={progress.todayChart}
            week={progress.weekChart}
            year={progress.yearChart}
          />
        </TabPanel>
      </Container>
    </Page>
  )
}

const mapStateToProps = state => ({
  progress: state.progress,
})

const mapDispatchToProps = dispatch => ({
  setGoal: goal => {
    dispatch(setGoal(goal))
    dispatch(uploadUserState())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProgressPage)
