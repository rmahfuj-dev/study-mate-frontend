import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import FindPartner from "../pages/FindPartner/FindPartner";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreatePartnerProfile from "../pages/CreatePartnerProfile/CreatePartnerProfile";
import MyConnecton from "../pages/MyConnection/MyConnecton";
import ForgetPass from "../pages/ForgetPass/ForgetPass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "find-partner", element: <FindPartner /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "find-partner",
        element: <FindPartner />,
      },
      {
        path: "create-partner",
        element: <CreatePartnerProfile />,
      },
      {
        path: "my-connections",
        element: <MyConnecton />,
      },
      {
        path: "forget-password",
        element: <ForgetPass />,
      },
    ],
  },
]);
