import { RouteProps } from "react-router-dom";
import MainLayout from "../src/layouts/main-layout";
import HomePage from "../src/pages/home/page";

interface CustomRoute extends Omit<RouteProps, "children"> {
  element: JSX.Element;
  children?: CustomRoute[];
}

const routes: CustomRoute[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];

export default routes;
