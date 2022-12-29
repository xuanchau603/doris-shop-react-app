import { privateRoutes, publicRoutes } from "./Routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Components/Layout/DefaultLayout";

function App() {
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
                  <Layout>
                    <route.component></route.component>
                  </Layout>
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
