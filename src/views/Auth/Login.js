import './Login.css';
import { authContext } from '../../context/router';
import useForm from '../../hook/useFormLogin';
import validate from '../../utils/validateForm';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginPage() {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(authContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  async function login() {
    setIsLoading(true);
    const result = await fetch('https://fakestoreapi.com/auth/login',{
      headers: {
        "Content-Type": "application/json",
      },
      method:'POST',
      body:JSON.stringify({
        // username: "johnd",
        // password: "m38rmF$"
        username: values.email,
        password: values.password
      })
    });
    
    const user = await result.ok;

    if (user) {
      setErrorLogin('');
      setIsAuthenticated(true);
      navigate('/');
    }

    setIsLoading(false);
    return setErrorLogin('Silahkan cek kembali username dan passowrd anda');
  }

  const SpinnerComponent = () => {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div className='container-login-page' style={{ backgroundImage: "url(/images/bg-sign-in-cover.jpeg)" }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <Form onSubmit={handleSubmit} noValidate className='shadow-lg p-4 mb-5 bg-body-tertiary rounded'>
              <Row className="mb-3 text-center">
                <h3>Masuk</h3>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email || ""}
                    className="form-control"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className='error'>{errors.email}</p>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password || ""}
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className='error'>{errors.password}</p>
                  )}
                </Form.Group>
              </Row>
              {errorLogin && (
                <p className='error'>{errorLogin}</p>
              )}
              <div className="d-grid gap-2">
                {isLoading ? <SpinnerComponent /> : <Button type="submit">Masuk</Button>}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
