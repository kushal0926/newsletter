import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/error.tsx";
import SignUp from "./pages/signup.tsx";
import ConfirmEmail from "./pages/confirm-email.tsx";
import ConfirmEmailSent from "./pages/confirm-email-sent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true, 
        element: <SignUp />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmail />,
      },
      {
        path: "confirm-email-sent",
        element: <ConfirmEmailSent />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
