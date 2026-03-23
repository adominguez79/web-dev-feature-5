import { Navigate } from "react-router-dom";
import Parse from "parse";

const ProtectedRoute = ({ children }) => {
  const user = Parse.User.current();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
