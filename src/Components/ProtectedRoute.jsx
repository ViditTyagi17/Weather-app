
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function Protected({ children, authentication = true }) {
  const { status, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (authentication && !status) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && status) {
    return <Navigate to="/" replace />;
  }

  return children;
}