import Home from "../Page/Home";
import Detail from "../Page/Detail";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AuthLayout from "../Components/Layout/AuthLayout";
import AdminLayout from "../Components/Layout/AdminLayout";
import AdminHome from "../Components/Admin/AdminHome";
import AdminOrder from "../Components/Admin/AdminOrder";

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

const privateRoutes = [
  {
    path: "/admin",
    component: AdminHome,
    layout: AdminLayout,
  },
  {
    path: "/admin/order",
    component: AdminOrder,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes };
