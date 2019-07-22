// import './common/jquery-3.3.1.slim.min';
// import './common/popper.min';
import './common/bootstrap-4.3.1/css/bootstrap.min.css';
// import './common/bootstrap-4.3.1/js/bootstrap.min';

import './css/index.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Home from './screen/home/Home';
import Welcome from './screen/welcome/Welcome';

class App extends Component {

  componentWillMount() {
    // Lifecycle function that is triggered just before a component mounts
  }
  componentWillUnmount() {
    // Lifecycle function that is triggered just before a component unmounts
  }

  render() {
    return (
      <Router>
        <Root>
          <Main>
            <Route exact={true} path="/" component={Home} />
            <Route path="/welcome" component={Welcome} />
          </Main>
        </Root>
      </Router>
    );
  }

}

const Root = (props) => (
  <div style={{display: 'flex'}} {...props} />
);
const Main = (props) => (
  <div style={{
    flex: 1,
    height: '100vh',
    overflow: 'auto'
  }}>
    <div style={{ padding: '20px' }} {...props} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
