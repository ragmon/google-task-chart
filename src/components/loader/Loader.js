import React from 'react';

import './loader.css';

const Loader = React.createClass({

  render() {
    return (
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

});

export default Loader;