import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token) {
          // (1) Appel API pour notifier la déconnexion
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          if (!response.ok) {
            const data = await response.json();
            throw new Error(
              `HTTP Error : ${data.message} status : ${data.status}`
            );
          }
        } else {
          throw new Error("Missing Token");
        }
      } catch (error) {
        console.error(
          `Error: ${error.message} ${error.status ? ` (${error.status})` : ""}`
        );
      } finally {
        // (2) Suppression du token côté frontend
        dispatch(logout());
        // (3) Redirection vers la page de login
        navigate("/connexion");
      }
    };

    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
