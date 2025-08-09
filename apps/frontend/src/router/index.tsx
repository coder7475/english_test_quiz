import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
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
          path: "verify",
          element: <Verify />
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]
    },
]);

export default router;