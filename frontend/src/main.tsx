import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import Auth from "./components/Auth";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/post/:id/edit",
        element: (
          <Auth>
            <NewPost existing={true} />
          </Auth>
        ),
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-post",
        element: (
          <Auth>
            <NewPost />
          </Auth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="bg-surface min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </main>
  </StrictMode>,
);
