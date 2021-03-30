import React from "react"
import { connect } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"

import AboutPage from "./pages/AboutPage/AboutPage"
import AppPage from "./pages/AppPage/AppPage"
import AppShell from "./hoc/AppShell/AppShell"
import HowToUsePage from "./pages/HowToUsePage/HowToUsePage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import NotAuthenticatedPage from "./pages/NotAuthenticatedPage/NotAuthenticatedPage"
import ProgressPage from "./pages/ProgressPage/ProgressPage"
import useSessionTheme from "./libs/hooks/useSessionTheme"
import { attemptAutoLogin } from "./store/actions/auth"

function App({ session, loggedIn, attemptAutoLogin }) {
  const theme = useSessionTheme(session)

  attemptAutoLogin()

  const protectedRoutes = [{ path: "/progress", component: ProgressPage }]

  return (
    <ThemeProvider theme={theme}>
      <AppShell>
        <Switch>
          <Route path="/app" component={AppPage} />
          <Route path="/how-to-use" component={HowToUsePage} />
          <Route path="/about" component={AboutPage} />
          {protectedRoutes.map((route, i) => (
            <Route
              path={route.path}
              component={loggedIn ? route.component : NotAuthenticatedPage}
              key={i}
            />
          ))}
          <Redirect exact from="/" to="/app" />
          <Route component={NotFoundPage} />
        </Switch>
      </AppShell>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  session: state.sessions.order[state.sessions.current],
  loggedIn: state.auth.user && state.auth.token,
})

const mapDispatchToProps = dispatch => ({
  attemptAutoLogin: () => dispatch(attemptAutoLogin()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
