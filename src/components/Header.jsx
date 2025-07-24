import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import "../assets/styles/Header.css";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

  const verifyToken = () => {
      const raw = localStorage.getItem("auth");
      const token = JSON.parse(raw);
      if (token && new Date(token.expiresAt) > new Date()) setIsConnected(true);
      else setIsConnected(false);
    };
    verifyToken();
    
  }, [location]);
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/professionnelles">
            Offres Professionnelles
          </Nav.Link>
          {!isConnected ? (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/deconnexion">
              Déconnexion
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
