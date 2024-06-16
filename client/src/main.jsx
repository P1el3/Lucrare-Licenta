import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import "./index.css";
import AddAgency from "./components/AddAgency.jsx";
import AgencyInCity from "./components/AgencyInCity.jsx";
import AgencyPage from "./components/AgencyPage";
import EditAgency from "./components/EditAgency.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/add-agency",
    element: <AddAgency/>
  },
  {
    path: `/agency-in-city/:city`,
    element: <AgencyInCity/>
  },
  {
    path: '/agency-details-page/:agencyid',
    element: <AgencyPage/>
  },
  {
    path: '/edit-agency',
    element: <EditAgency/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);