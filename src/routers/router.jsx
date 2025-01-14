import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/books/CartPage.jsx";
import Checkout from "../pages/books/Checkout.jsx";
import SingleBook from "../pages/books/SingleBook.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import OrderPage from "../pages/books/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManageBooks from "../pages/dashboard/managebook/ManageBooks.jsx";
import AddNewBook from "../pages/dashboard/addbook/addNewBook.jsx";
import UpdateBook from "../pages/dashboard/editbook/UpdateBook.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import DashBoardLayout from "../pages/dashboard/DashBoardLayout.jsx";



const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderPage /></PrivateRoute>
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <PrivateRoute><Checkout /></PrivateRoute>
            },
            {
                path: '/books/:id',
                element: <SingleBook />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLogin />
    },
    {
        path: "/dashboard",
        element: <AdminRoute><DashBoardLayout /></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddNewBook /></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks /></AdminRoute>
            }
        ]
    }
]);

export default router;