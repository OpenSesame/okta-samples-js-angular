const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: `${CLIENT_ID}`,
    issuer: `${ISSUER}`,
    redirectUri: 'https://local-catalog.dev.opensesame.com/oktapoc/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    },
    tokenManager: {
      // storage: 'memory'
    }
  },
  resourceServer: {
    messagesUrl: 'https://local-catalog.dev.opensesame.com/oktapoc/api/messages',
  },
};
