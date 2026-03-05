import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

const ProtectedRoute = ({ children }) => {

  const { token, logIn } = useContext(AuthContext);

  const isAuthenticated = !!token;
  if (!token || !isAuthenticated) {
    logIn();
    return null;
  }

  return children;
};

export default ProtectedRoute;