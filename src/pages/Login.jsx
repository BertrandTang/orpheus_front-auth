import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const response = await fetch("https://offers-api.digistos.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

      const data = await response.json();

      if (!response.ok) {
        const errorCustom = new Error(data.error || "Une erreur est survenue");
        errorCustom.status = response.status;
        throw errorCustom;
      }

      localStorage.setItem(
        "auth",
        JSON.stringify({
          expiresAt: new Date(
            Date.now() + data.expires_in * 1000
          ).toISOString(),
          credentials: 'include',
        })
      );

      console.log("Connexion réussie !");
      navigate("/offres/professionnelles");
    } catch (error) {
      console.error(`LOGIN ERROR: ${error.message} (${error.status})`);
      if (error.status === 401) {
        setErrorMessage("Identifiants invalides.");
      } else {
        setErrorMessage("Une erreur est survenue lors de la connexion");
      }
    }

    console.log("Login submitted:", formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          {errorMessage && (
            <Alert
              variant="danger"
              onClose={() => setErrorMessage(null)}
              dismissible
              className="mb-3"
            >
              {errorMessage}
            </Alert>
          )}
          <Card className="p-4 shadow-lg">
            <h1 className="text-center mb-4">Se connecter</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
