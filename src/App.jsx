import { Link, Route, Switch } from "react-router-dom";
import TimerPage from "./pages/TimerPage/TimerPage";
import Layout from "./hoc/Layout/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";

export default function App() {
  const theme = createMuiTheme({
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

      short_break: {
        light: colors.green[200],
        main: colors.green[400],
        dark: colors.green[600],
      },

      long_break: {
        light: colors.blue[200],
        main: colors.blue[400],
        dark: colors.blue[600],
      },
    },
  });

  const notFoundMessage = (
    <div>
      <h1>404</h1>
      <h2>It seems like you got lost</h2>
      <Link to="/">Get me back!</Link>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component={TimerPage} />
            <Route render={() => notFoundMessage} />
          </Switch>
        </Layout>
      </div>
    </ThemeProvider>
  );
}
