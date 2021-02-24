import React from "react"
import { Backdrop, Drawer } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import { setPopup, setTemporaryDrawer } from "../../store/actions/layout"
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup"
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar"
import TaskManager from "../../components/TaskManager/TaskManager"
import ResetTimerPopup from "../../components/ResetTimerPopup/ResetTimerPopup"
import ApplicationDrawer from "../../components/ApplicationDrawer/ApplicationDrawer"

const useStyles = makeStyles(theme => ({
  Layout: {
    backgroundColor: "#fdfdfd",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },

  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 1,
    height: "100%",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: "#fff",
  },

  persistantPaperDrawer: {
    minWidth: 280,
    top: 64,
  },

  "@media (max-width: 600px)": {
    persistantPaperDrawer: {
      top: 56,
    },
  },
}))

function Layout({
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
    <div className={classes.Layout}>
      <ApplicationBar />

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

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
