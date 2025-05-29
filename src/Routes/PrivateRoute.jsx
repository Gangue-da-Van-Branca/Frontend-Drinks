import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Não está logado
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Não tem a role necessária
    return <Navigate to="/" />;
  }

  // Autorizado
  return children;
}
