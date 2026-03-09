
export const authConfig = {
  clientId: 'oauth2-pkce-client',
  authorizationEndpoint: 'http://18.232.38.61:8181/realms/fitness-oauth2/protocol/openid-connect/auth',
  tokenEndpoint: 'http://18.232.38.61:8181/realms/fitness-oauth2/protocol/openid-connect/token',
  redirectUri: 'http://18.232.38.61:5173/',
  scope: 'openid profile email offline_access',
  autoRefresh: true,
  onRefreshTokenExpire: (event) => event.logIn(),
}