import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        if (token) {
          // (1) Appel API pour notifier la déconnexion
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                credentials: "include",
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
        localStorage.removeItem("auth");
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
