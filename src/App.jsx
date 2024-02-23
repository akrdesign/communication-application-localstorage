import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import LoginSuccess from "./pages/LoginSuccess";
import ProtectedRegister from "./components/common/projected/ProtectedRegister";
import Protected from "./components/common/projected/Protected";
import GroupChats from "./pages/GroupChats";
import ManageUsers from "./pages/ManageUsers";
import ManageDocuments from "./pages/ManageDocuments";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";
import DocumentShare from "./pages/DocumentShare";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/register-success",
    element: (
      <ProtectedRegister>
        <RegisterSuccess />
      </ProtectedRegister>
    ),
  },
  {
    path: "/login-success",
    element: (
      <Protected>
        <LoginSuccess />
      </Protected>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <GroupChats />
      </Protected>
    ),
  },
  {
    path: "/manage-users",
    element: (
      <Protected>
        <ManageUsers />
      </Protected>
    ),
  },
  {
    path: "/edit-user/:id",
    element: (
      <Protected>
        <EditUser />
      </Protected>
    ),
  },
  {
    path: "/manage-documents",
    element: (
      <Protected>
        <ManageDocuments />
      </Protected>
    ),
  },
  {
    path: "/manage-document/:id",
    element: (
      <Protected>
        <DocumentShare />
      </Protected>
    ),
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
