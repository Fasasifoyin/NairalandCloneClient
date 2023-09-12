import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../rootlayout/Layout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Create from "../pages/Create";
import PrivateRoute from "./PrivateRoute";
import PrivateRoute2 from "./PrivateRoute2";
import New from "../pages/New";
import DetailedPage from "../pages/DetailedPage";
import Edit from "../pages/Edit";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "tags/:homePage",
            element: <Home />,
          },
        ],
      },
      {
        path: "/signup",
        element: (
          <PrivateRoute2>
            <Signup />
          </PrivateRoute2>
        ),
      },
      {
        path: "/signin",
        element: (
          <PrivateRoute2>
            <Signin />
          </PrivateRoute2>
        ),
      },
      {
        path: "/blog/create",
        element: (
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/edit/:slug",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
      },
      {
        path: "new",
        element: <New />,
        children: [
          {
            path: ":newpage",
            element: <New />,
          },
        ],
      },
      {
        path: "/:slug",
        element: <DetailedPage />,
      },
    ],
  },
];

const RoutePath = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default RoutePath;
