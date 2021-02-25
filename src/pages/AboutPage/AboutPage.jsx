import { Container, Paper } from "@material-ui/core"
import React from "react"
import Page from "../Page"
import { useStyles } from "../styles"

export default function AboutPage() {
  const classes = useStyles()

  return (
    <Page>
      <Container maxWidth="md">
        <Paper className={classes.body}>
          <h2>About</h2>

          <p className={classes.body__text}>
            I've built this application in order to make working routine less
            tedious. It have never been easy for me to begin working and
            maintain the high level of focus each and every time. So I've been
            researching lots of different methods how to boost productivity and
            keep myself somehow engaged with the work. What I found out, is that
            there was no automated tool, that could provide me with exactly what
            I needed. The most efficient set of instruments to enhance work
            quality without burning me out ended up as:
          </p>

          <ul className={classes.body__text}>
            <li>Pomodoro timer</li>
            <li>TODO list</li>
            <li>Reward directed work</li>
            <li>Bullet journal with [day | week | year] planning</li>
          </ul>
        </Paper>
      </Container>
    </Page>
  )
}
