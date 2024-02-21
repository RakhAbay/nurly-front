import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../modules/auth/RegisterPage";
import { LoginPage } from "../modules/auth/LoginPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
])

export default router
