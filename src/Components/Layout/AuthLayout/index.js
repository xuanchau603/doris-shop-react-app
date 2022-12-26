import bg from "../../../Image/background_Auth.png";

function AuthLayout(props) {
  return (
    <div
      style={{
        background: `url(${bg})`,
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
}

export default AuthLayout;
