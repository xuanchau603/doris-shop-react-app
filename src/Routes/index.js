import Home from "../Page/Home";
import Detail from "../Page/Detail";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AuthLayout from "../Components/Layout/AuthLayout";

//public route
const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/detail",
    component: Detail,
  },
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: AuthLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
