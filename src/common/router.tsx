import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../modules/auth/RegisterPage";
import { LoginPage } from "../modules/auth/LoginPage";
import { CategoryPage } from "../modules/category/CategoryPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/category',
        element: <CategoryPage />
    },
])

export default router
