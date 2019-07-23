import React from 'react';

import config from '../../config';

const Welcome = React.createClass({

  // constructor: function () {
  //   // super(props);
  //
  //   this.initGoogleApi = this.initGoogleApi.bind(this);
  //   this.gapiAuthenticate = this.gapiAuthenticate.bind(this);
  //   this.gapiLoadClient = this.gapiLoadClient.bind(this);
  //
  //   this.initGoogleApi();
  // },

  state : {
    google_auth_status : null
  },

  componentWillMount() {
    this.initGoogleApi();
  },
  componentWillUnmount() {
    // Lifecycle function that is triggered just before a component unmounts
  },

  initGoogleApi() {
    console.log('initGoogleApi');
    gapi.load("client:auth2", function () {
      gapi.auth2.init({client_id: config.CLIENT_ID});
    });
  },

  authClick() {
    console.log('authClick');
    this.gapiAuthenticate()
      .then(this.gapiLoadClient)
      .then(() => {
        this.props.history.push('/home')
      })
      .catch(() => {
        this.setState({ google_auth_status : false });
      });
  },

  gapiAuthenticate() {
    console.log('gapiAuthenticate');
    return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/tasks.readonly"})
      .then(function () {
          console.log('SignIn success');
        },
        function (err) {
          console.error("Error signing in", err);
        });
  },

  gapiLoadClient() {
    console.log('gapiLoadClient');
    gapi.client.setApiKey(config.API_KEY);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/tasks/v1/rest")
      .then(function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        });
  },

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>Login With Google Account</p>
        <button className="btn btn-primary btn-block" onClick={this.authClick}>Login</button>
      </div>
    );
  }
});

export default Welcome;