import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatorInfo from "./components/CreatorInfo";
import HomePage from "./components/HomePage";
import login from "./components/login";
import WrongPage from "./components/WrongPage";
import Comments from "./components/Comments";
import "bootstrap/dist/css/bootstrap.min.css";
import register from "./components/register";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/creatorinfo" component={CreatorInfo} />
          <Route path="/comments" component={Comments} />
          <Route path="/register" component={register} />
          <Route path="/login" component={login} />
          <Route path="/" component={WrongPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
