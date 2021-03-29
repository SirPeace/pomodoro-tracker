import React from "react"
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

export default function ProgressPage() {
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
            defaultValue={60}
            SelectDisplayProps={{ className: classes.goalSelectElement }}
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
              Days streak: <b className={classes.metricValue}>8</b>
            </li>
            <hr />
            <li className={classes.metric}>
              <ScheduleIcon className={classes.icon} />
              Focused minutes today: <b className={classes.metricValue}>120</b>
            </li>
            <li className={classes.metric}>
              <CheckIcon className={classes.icon} />
              Completed tasks today: <b className={classes.metricValue}>2</b>
            </li>
            <hr />
            <li className={classes.metric}>
              <WhatshotIcon className={classes.icon} />
              The best days streak: <b className={classes.metricValue}>12</b>
            </li>
            <li className={classes.metric}>
              <ScheduleIcon className={classes.icon} />
              Overall focused minutes:{" "}
              <b className={classes.metricValue}>2560</b>
            </li>
            <li className={classes.metric}>
              <CheckIcon className={classes.icon} />
              Overall tasks completed:{" "}
              <b className={classes.metricValue}>1317</b>
            </li>
          </ul>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <ProgressChart />
        </TabPanel>
      </Container>
    </Page>
  )
}
