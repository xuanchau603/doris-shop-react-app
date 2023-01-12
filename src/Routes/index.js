import Home from "../Page/Home";
import Detail from "../Page/Detail";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AuthLayout from "../Components/Layout/AuthLayout";
import AdminLayout from "../Components/Layout/AdminLayout";
import AdminHome from "../Components/Admin/AdminHome";
import AdminOrder from "../Components/Admin/AdminOrder";
import CreateOrder from "../Components/Admin/AdminOrder/CreateOrder";
import AdminProduct from "../Components/Admin/AdminProduct";
import CreateProduct from "../Components/Admin/AdminProduct/CreateProduct";
import AdminCategory from "../Components/Admin/AdminCategory";
import CreateCategory from "../Components/Admin/AdminCategory/CreateCategory";
import EditCategory from "../Components/Admin/AdminCategory/EditCategory";
import EditProduct from "../Components/Admin/AdminProduct/EditProduct";

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
  {
    path: "/admin/order/add",
    component: CreateOrder,
    layout: AdminLayout,
  },
  {
    path: "/admin/product",
    component: AdminProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/product/add",
    component: CreateProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/product/edit",
    component: EditProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/category",
    component: AdminCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/category/add",
    component: CreateCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/category/edit",
    component: EditCategory,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes };
