import React from 'react';

class Welcome extends React.Component {

  state = {
    wasLaunched : false
  };

  componentWillMount() {
    //
  }
  componentWillUnmount() {
    // Lifecycle function that is triggered just before a component unmounts
  }

  render() {
    return (
      <h1>Welcome</h1>
    );
  }
}

export default Welcome;