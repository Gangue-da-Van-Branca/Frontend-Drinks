import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

export default function PrivateRoute({ children, requiredRole }) {
  const location = useLocation();
  const toastShownRef = useRef(false);

  useEffect(() => {
    toastShownRef.current = false;
  }, [location.pathname]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    if (!toastShownRef.current) {
      toast.error("É necessário fazer login para acessar esta página.");
      toastShownRef.current = true;
    }
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    if (!toastShownRef.current) {
      toast.error("Você não tem permissão para acessar esta página.");
      toastShownRef.current = true;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
