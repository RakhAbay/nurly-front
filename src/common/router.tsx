import { createBrowserRouter } from "react-router-dom";
import { RegisterPage } from "../modules/auth/RegisterPage";
import { LoginPage } from "../modules/auth/LoginPage";
import { CategoryPage } from "../modules/category/CategoryPage";
import { SubcategoryPage } from "../modules/subcategory/SubcategoryPage";
import { AppLayout } from "./layout/AppLayout";
import { TransactionsPage } from "../modules/transaction/TransactionsPage";
import { ChatBotContainer } from "./components/ChatbotContainer";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/register',
                element: (
                    <>
                        <RegisterPage />
                        <ChatBotContainer page={"register"} />
                    </>
                )
            },
            {
                path: '/login',
                element: (
                    <>
                        <LoginPage />
                        <ChatBotContainer page={"login"}/>
                    </>
                )
            },
            {
                path: '/category',
                element: (
                    <>
                        <CategoryPage />
                        <ChatBotContainer page={"category"}/>
                    </>
                )
            },
            {
                path: '/subcategory',
                element: (
                    <>
                        <SubcategoryPage/>
                        <ChatBotContainer page={"subcategory"}/>
                    </>
                )
            },
            {
                path: '/transaction',
                element: (
                    <>
                        <TransactionsPage/>
                        <ChatBotContainer page={"transaction"}/>
                    </>
                )
            },
        ]
    },
])

export default router
