import {
  createBrowserRouter
} from "react-router-dom";
import LoginPage from '../views/Auth/Login';
import ListUserPage from '../views/User/List/User';
import DetailUserPage from '../views/User/Detail/User';
import AddUserPage from '../views/User/Add/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/user/list",
    element: <ListUserPage />,
  },
  {
    path: "/user/detail",
    element: <DetailUserPage />,
  },
  {
    path: "/user/add",
    element: <AddUserPage />,
  },
]);

export default router;