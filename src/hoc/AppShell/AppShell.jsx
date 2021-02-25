import React from "react"
import { Backdrop, Drawer } from "@material-ui/core"
import { connect } from "react-redux"
import { setPopup, setTemporaryDrawer } from "../../store/actions/layout"
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup"
import TaskManager from "../../components/TaskManager/TaskManager"
import ResetTimerPopup from "../../components/ResetTimerPopup/ResetTimerPopup"
import ApplicationDrawer from "../../components/ApplicationDrawer/ApplicationDrawer"
import { useStyles } from "./styles"

function AppShell({
  pers_drawer,
  temp_drawer,
  popup,
  setPopup,
  children,
  setTempDrawer,
}) {
  const classes = useStyles()

  const handleBackdropClick = event => {
    if (!event.target.closest("[id$='popup']")) {
      setPopup(false)
    }
  }

  if (popup === "settings") {
    popup = <SettingsPopup />
  } else if (popup === "reset-timer") {
    popup = <ResetTimerPopup />
  } else {
    popup = null
  }

  return (
    <div className={classes.shell}>
      <Backdrop
        open={!!popup}
        className={classes.backdrop}
        onClick={e => handleBackdropClick(e)}
      >
        {popup}
      </Backdrop>

      <div className={classes.body}>
        <Drawer
          open={!!temp_drawer}
          anchor="left"
          onClose={() => setTempDrawer(undefined)}
        >
          <ApplicationDrawer />
        </Drawer>

        <Drawer
          open={!!pers_drawer}
          anchor="right"
          variant="persistent"
          classes={{ paper: classes.persistantPaperDrawer }}
        >
          <TaskManager />
        </Drawer>

        {children}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  popup: state.layout.popup,
  pers_drawer: state.layout.persistant_drawer,
  temp_drawer: state.layout.temporary_drawer,
})

const mapDispatchToProps = dispatch => ({
  setPopup: name => dispatch(setPopup(name)),
  setTempDrawer: name => dispatch(setTemporaryDrawer(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppShell)
