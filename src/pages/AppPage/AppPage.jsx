import { Fab, makeStyles, ThemeProvider, useTheme } from "@material-ui/core"
import React from "react"
import { connect } from "react-redux"
import Timer from "../../components/Timer/Timer"
import { setPopup } from "../../store/actions/layout"
import { useStyles } from "../styles"
import SettingsIcon from "@material-ui/icons/Settings"

const useLocalStyles = makeStyles(theme => ({
  floatingBtn: {
    position: "fixed",
    zIndex: 2,
    right: 20,
    bottom: 20,
  },
}))

function AppPage({ theme, setPopup }) {
  const pageClasses = useStyles()
  const classes = useLocalStyles()

  const sessionTheme = useTheme()

  return (
    <ThemeProvider theme={sessionTheme}>
      <div className={pageClasses.page}>
        <Timer />
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setPopup("settings")}
          className={classes.floatingBtn}
        >
          <SettingsIcon />
        </Fab>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  theme: state.layout.theme,
})

const mapDispatchToProps = dispatch => ({
  setPopup: name => dispatch(setPopup(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppPage)
