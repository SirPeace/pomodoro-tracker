import React from "react"
import { Backdrop, Drawer } from "@material-ui/core"
import { connect } from "react-redux"

import ApplicationDrawer from "../../components/ApplicationDrawer/ApplicationDrawer"
import ResetTimerPopup from "../../components/ResetTimerPopup/ResetTimerPopup"
import { setPopup, setTemporaryDrawer } from "../../store/actions/layout"
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup"
import TaskManager from "../../components/TaskManager/TaskManager"
import { useStyles } from "./styles"
import PersistentDrawer from "./PersistentDrawer/PersistentDrawer"
import DeleteTaskPopup from "../../components/TaskManager/DeleteTaskPopup/DeleteTaskPopup"

function AppShell({
  persDrawer,
  tempDrawer,
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
  } else if (popup === "delete-task") {
    popup = <DeleteTaskPopup />
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
          open={!!tempDrawer}
          anchor="left"
          onClose={() => setTempDrawer(undefined)}
        >
          <ApplicationDrawer />
        </Drawer>

        <PersistentDrawer open={persDrawer === "tasks"}>
          <TaskManager />
        </PersistentDrawer>

        {children}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  popup: state.layout.popup,
  persDrawer: state.layout.persistant_drawer,
  tempDrawer: state.layout.temporary_drawer,
})

const mapDispatchToProps = dispatch => ({
  setPopup: name => dispatch(setPopup(name)),
  setTempDrawer: name => dispatch(setTemporaryDrawer(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppShell)
