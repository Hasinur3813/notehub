import React from "react";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import CreateNote from "../pages/CreateNote";
import NotePage from "../pages/NotePage";
import NoteView from "../pages/NoteView";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <Signup />,
          },
        ],
      },
      {
        path: "login",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <Login />,
          },
        ],
      },
      {
        path: "notes",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <NotePage />,
          },
        ],
      },
      {
        path: "notes/note/:id",
        element: <NoteView />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="font-inter bg-primary dark:bg-dark-secondary">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
