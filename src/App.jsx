import { Link, Route, Switch } from "react-router-dom";
import TimerPage from "./pages/TimerPage/TimerPage";
import Layout from "./hoc/Layout/Layout";

export default function App() {
  const notFoundMessage = (
    <div>
      <h1>404</h1>
      <h2>It seems like you got lost</h2>
      <Link to="/">Get me back!</Link>
    </div>
  );

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={TimerPage} />
          <Route render={() => notFoundMessage} />
        </Switch>
      </Layout>
    </div>
  );
}
