import App from "@/App";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {            
            index: true,
            element: <Home/>
        },
        {
            path: "about",
            element: <About />
        },
        {
            path: "register",
            element: <Register />
        },
        {
            path: "login",
            element: <Login />
        },
        {
          path: "verify",
          element: <Verify />
        },
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]
    },
]);

export default router;