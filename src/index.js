import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({

  componentWillMount() {
    // Lifecycle function that is triggered just before a component mounts
  },
  componentWillUnmount() {
    // Lifecycle function that is triggered just before a component unmounts
  },

  render() {
    return (
      <div>
        ...
      </div>
    );
  }

});

ReactDOM.render(<App />, document.getElementById('app'));
