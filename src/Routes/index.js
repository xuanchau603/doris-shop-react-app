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
import Cart from "../Page/Cart";
import OrderDetail from "../Components/Admin/AdminOrder/OrderDetail";
import EditOrder from "../Components/Admin/AdminOrder/EditOrder";
import Lookup from "../Page/Lookup";
import LoopkupDetail from "../Page/Lookup/LoopkupDetail";
import AdminUser from "../Components/Admin/AdminUser";
import EditUser from "../Components/Admin/AdminUser/EditUser";
import CreateUser from "../Components/Admin/AdminUser/CreateUser";

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
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "lookup",
    component: Lookup,
  },
  {
    path: "lookup/detail",
    component: LoopkupDetail,
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
    path: "/admin/order/detail",
    component: OrderDetail,
    layout: AdminLayout,
  },
  {
    path: "/admin/order/edit",
    component: EditOrder,
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
  {
    path: "/admin/user",
    component: AdminUser,
    layout: AdminLayout,
  },
  {
    path: "/admin/user/edit",
    component: EditUser,
    layout: AdminLayout,
  },
  {
    path: "/admin/user/add",
    component: CreateUser,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes };
