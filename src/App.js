import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Nominate from "./pages/Nominate";
import Vote from "./pages/Vote";
import Result from "./pages/Result";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="banner"></div>
        <div className="ui secondary menu">
          <a className="item" href="/">
            Home
          </a>
          <a className="item" href="/dapp/nominate">
            Nominate
          </a>
          <a className="item" href="/dapp/vote">
            Vote
          </a>
          <a className="item" href="/dapp/result">
            Result
          </a>
        </div>
        <Router>
          <div>
            <Route exact path="/" component={Vote} />
            <Route path="/dapp/nominate" component={Nominate} />
            <Route path="/dapp/vote" component={Vote} />
            <Route path="/dapp/result" component={Result} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
