import Home from "../Page/Home";
import Detail from "../Page/Detail";

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
