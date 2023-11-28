import { authContext } from '../../context/router';
import useForm from '../../hook/useFormLogin';
import validate from '../../utils/validateForm';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(authContext);

  const [errorLogin, setErrorLogin] = useState('')

  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  async function login() {
    const result = await fetch('https://fakestoreapi.com/auth/login',{
      headers: {
        "Content-Type": "application/json",
      },
      method:'POST',
      body:JSON.stringify({
        username: "johnd",
        password: "m38rmF$"
      })
    });
    
    const user = await result.ok;

    if (user) {
      setErrorLogin('');
      setIsAuthenticated(true);
      navigate('/');
    }
    return setErrorLogin('Silahkan cek kembali username dan passowrd anda');
  }


  return (
    <div className="App">
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-6 is-offset-3">
            <div className="box">
              <h1>Login</h1>
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label className="label">Email Address</label>
                  <div className="control">
                    <input
                      autoComplete="off"
                      className={`input ${errors.email && "is-danger"}`}
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email || ""}
                      required
                    />
                    {errors.email && (
                      <p className="help is-danger">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className={`input ${errors.password && "is-danger"}`}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password || ""}
                      required
                    />
                  </div>
                  {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                  )}
                </div>
                <div>
                  <p>{errorLogin}</p>
                </div>
                <button
                  type="submit"
                  className="button is-block is-info is-fullwidth"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
