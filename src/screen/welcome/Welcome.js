import React, { Component } from 'react';

class Welcome extends Component {

  constructor(props) {
    super(props);

    this.authClick = this.authClick.bind(this);
  }

  componentWillMount() {
    // this.initGoogleApi();
  }
  componentWillUnmount() {
    // Lifecycle function that is triggered just before a component unmounts
  }
  componentDidMount() {
    // this.initGoogleApi();
  }

  authClick() {
    console.log('authClick');
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Login With Google Account</p>
        <button className="btn btn-primary btn-block" onClick={this.authClick}>Login</button>
      </div>
    );
  }
}

export default Welcome;