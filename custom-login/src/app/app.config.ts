import {environment} from "../environments/environment";

const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: environment.clientId,
    issuer: environment.issuer,
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile', 'email'],
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    },

  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
