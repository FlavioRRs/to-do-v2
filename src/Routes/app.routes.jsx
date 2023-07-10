import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Tasks from "../pages/Tasks"
import RequireAuth from "../Auth/RequireAuth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Tasks/></RequireAuth>
    },
    {
        path: "/Registrar",
        element: <SignUp />
    }
])

export default router;