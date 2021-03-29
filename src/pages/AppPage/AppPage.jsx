import React from "react"
import { connect } from "react-redux"
import { Fab, makeStyles } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import { useMediaQuery } from "react-responsive"

import Timer from "../../components/Timer/Timer"
import { setPopup } from "../../store/actions/layout"
import Page from "../Page"

const useStyles = makeStyles(theme => ({
  floatingBtn: {
    position: "fixed",
    zIndex: 2,
    right: 20,
    bottom: 20,
  },
}))

export const PathContext = React.createContext()

function AppPage({ setPopup, match }) {
  const classes = useStyles()

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  return (
    <PathContext.Provider value={{ path: match.path }}>
      <Page>
        <Timer />
        {isMobile && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setPopup("settings")}
            className={classes.floatingBtn}
          >
            <SettingsIcon />
          </Fab>
        )}
      </Page>
    </PathContext.Provider>
  )
}

const mapDispatchToProps = dispatch => ({
  setPopup: name => dispatch(setPopup(name)),
})

export default connect(null, mapDispatchToProps)(AppPage)
