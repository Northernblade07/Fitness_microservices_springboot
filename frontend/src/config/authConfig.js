
export const authConfig = {
  clientId: 'oauth2-pkce-client',
  authorizationEndpoint: 'http://3.237.36.60:8181/realms/fitness-oauth2/protocol/openid-connect/auth',
  tokenEndpoint: 'http://3.237.36.60:8181/realms/fitness-oauth2/protocol/openid-connect/token',
  // change the redirect uri to localhost to test , and to prod url to deploy
  redirectUri: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/',
  scope: 'openid profile email offline_access',
  autoRefresh: true,
  onRefreshTokenExpire: (event) => event.logIn(),
}