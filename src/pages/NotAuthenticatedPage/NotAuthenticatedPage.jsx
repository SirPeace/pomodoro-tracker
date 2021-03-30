import React from "react"
import { Button } from "@material-ui/core"

import Page from "../Page"
import { connect } from "react-redux"
import { login } from "../../store/actions/auth"

function NotAuthenticatedPage({ login }) {
  return (
    <Page>
      <h1>401</h1>
      <h3>You are not authenticated</h3>
      <Button variant="contained" color="primary" onClick={login}>
        Login with Google
      </Button>
    </Page>
  )
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
})

export default connect(null, mapDispatchToProps)(NotAuthenticatedPage)
