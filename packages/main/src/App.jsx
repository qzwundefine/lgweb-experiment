import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import router from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Login
        loginUrl='test'
        onSubmit={(values) => console.log(values)}
        title='LgWeb Experiment'
      />
      {/* <micro-app name={"react-child"} url={"http://127.0.0.1:4171/"} iframe /> */}
    </>
  );
}

export default App;
