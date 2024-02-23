import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../modules/auth/RegisterPage";
import { LoginPage } from "../modules/auth/LoginPage";
import { CategoryPage } from "../modules/category/CategoryPage";
import { SubcategoryPage } from "../modules/subcategory/SubcategoryPage";
import { AppLayout } from "./layout/AppLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/register',
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
            {
                path: '/subcategory',
                element: <SubcategoryPage />
            },
        ]
    },
])

export default router
