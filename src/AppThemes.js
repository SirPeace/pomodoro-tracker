import { colors, createMuiTheme } from "@material-ui/core"

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffa4a2",
      main: "#e57373",
      dark: "#af4448",
      contrastText: "#fff",
    },

    secondary: {
      light: "#ffcccb",
      main: "#ef9a9a",
      dark: "#ba6b6c",
      contrastText: "#000",
    },
  },
})

export const shortBreakTheme = createMuiTheme({
  palette: {
    primary: {
      light: colors.green[200],
      main: colors.green[400],
      dark: colors.green[600],
      contrastText: "#fff",
    },
  },
})

export const longBreakTheme = createMuiTheme({
  palette: {
    primary: {
      light: colors.blue[200],
      main: colors.blue[400],
      dark: colors.blue[600],
      contrastText: "#fff",
    },
  },
})
