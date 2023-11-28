import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate
} from "react-router-dom";
import LoginPage from './views/Auth/Login';
import ListUserPage from './views/User/List/User';
import { ProvideAuth, authContext } from './context/router';
import { useContext } from 'react';

const PrivateRoutes = () => {
  const {isAuthenticated} = useContext(authContext);

  return(
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router>
          <Routes>
            <Route element={ <LoginPage />} path="/login"/>
            <Route element={<PrivateRoutes />}>
              <Route element={<ListUserPage/>} path="/" exact/>
            </Route>
          </Routes>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;
