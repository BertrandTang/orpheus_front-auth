import { useNavigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice.js";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [canAccess, setCanAccess] = useState(false);
  useEffect(() => {
    const isValid = auth.token && new Date(auth.expiresAt) > new Date();
    if (!isValid) {
      dispatch(logout());
      navigate("/connexion");
    } else {
      setCanAccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate]);
  if (!canAccess) return null; // Tant qu’on n’a pas vérifié, on bloque
  return <Outlet />;
};
export default PrivateRoute;
