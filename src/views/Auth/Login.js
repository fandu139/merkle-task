import '../../App.css';
import { authContext } from '../../context/router';
import useForm from '../../hook/useFormLogin';
import validate from '../../utils/validateForm';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function App() {
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
    <div className="App">
      <form className="form-login" onSubmit={handleSubmit} noValidate>
        <h3>Masuk</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
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
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
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
        </div>
        {errorLogin && (
            <p className='error'>{errorLogin}</p>
          )}
        <div className="d-grid">
          {isLoading ? <SpinnerComponent /> : <button type="submit" className="btn btn-primary">
            Submit
          </button>}
        </div>
      </form>
    </div>
  );
}

export default App;
