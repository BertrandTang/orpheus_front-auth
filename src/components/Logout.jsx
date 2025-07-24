import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (auth && new Date(auth.expiresAt) > new Date()) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
            }
          );

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [navigate, auth]);

  return null;
};

export default Logout;
