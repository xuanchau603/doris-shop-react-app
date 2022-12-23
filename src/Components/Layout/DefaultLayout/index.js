import Footer from "../Components/Footer";
import Header from "../Components/Header";

function DefaultLayout({ children }) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}

export default DefaultLayout;
