import { privateRoutes, publicRoutes } from "./Routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./Components/Layout/DefaultLayout";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <route.component></route.component>
                  </Layout>
                }
              ></Route>
            );
          })}
          {privateRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  role?.Role?.role_Name === "ADMIN" ? (
                    <Layout>
                      <route.component></route.component>
                    </Layout>
                  ) : (
                    <Navigate to="/"></Navigate>
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
