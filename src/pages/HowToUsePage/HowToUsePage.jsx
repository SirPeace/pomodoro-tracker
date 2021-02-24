import { Container, Paper } from "@material-ui/core"
import React from "react"
import { useStyles } from "../styles"

export default function HowToUsePage() {
  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Paper className={classes.body}>
        <h2>How to use</h2>

        <p className={classes.body__text}>
          Instructions to use... Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Veritatis adipisci quia culpa ad libero minus omnis
          voluptatibus molestias, dolores esse neque cumque aliquid quam
          corporis reiciendis ea enim maiores voluptatum alias natus. Ratione
          corporis aliquam eius nam voluptatem mollitia, delectus cumque culpa
          possimus laudantium fuga obcaecati totam! Cupiditate suscipit modi
          eaque perspiciatis esse necessitatibus nesciunt corporis impedit.
          Cupiditate, eligendi quibusdam!
        </p>
      </Paper>
    </Container>
  )
}
