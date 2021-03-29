import { Drawer, makeStyles } from "@material-ui/core"
import React from "react"

export const useStyles = makeStyles(() => ({
  persistantPaperDrawer: {
    minWidth: 304,
    top: 64,
  },

  "@media (max-width: 600px)": {
    persistantPaperDrawer: {
      top: 56,
      width: "100%",
    },
  },
}))

const PersistentDrawer = ({ open, children, classes }) => {
  const drawerClasses = useStyles()

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="persistent"
      classes={{
        paper: drawerClasses.persistantPaperDrawer,
        ...classes,
      }}
    >
      {children}
    </Drawer>
  )
}

export default PersistentDrawer
