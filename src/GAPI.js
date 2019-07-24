import config from "./config";

const GAPI = {

  __isInit : false,

  initGoogleApi() {
    return new Promise(resolve => {
      console.log('initGoogleApi');
      gapi.load("client:auth2", () => {
        gapi.auth2.init({client_id: config.CLIENT_ID})
          .then(this.gapiAuthenticate)
          .then(resolve);
      });
    });
  },

  gapiAuthenticate() {
    console.log('gapiAuthenticate');
    return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/tasks.readonly"})
      .then(GAPI.gapiLoadClient,
        function (err) {
          console.error("Error signing in", err);
          throw err;
        });
  },

  gapiLoadClient() {
    console.log('gapiLoadClient');
    gapi.client.setApiKey(config.API_KEY);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/tasks/v1/rest")
      .then(function () {
          console.log("GAPI client loaded for API");
          GAPI.__isInit = true;
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
          throw err;
        });
  },

  isInit() { return this.__isInit }

};

export default GAPI;