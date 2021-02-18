import { Link, Route, Switch } from "react-router-dom"
import TimerPage from "./pages/TimerPage/TimerPage"
import Layout from "./hoc/Layout/Layout"
import { ThemeProvider } from "@material-ui/core/styles"
import useSessionTheme from "./libs/hooks/useSessionTheme"
import { connect } from "react-redux"

function App({ session }) {
  const notFoundMessage = (
    <div>
      <h1>404</h1>
      <h2>It seems like you got lost</h2>
      <Link to="/">Get me back!</Link>
    </div>
  )

  const theme = useSessionTheme(session)

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
  )
}

const mapStateToProps = state => ({
  session: state.sessions.order[state.sessions.current],
})

export default connect(mapStateToProps)(App)
