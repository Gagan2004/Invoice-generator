import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProducts from "./pages/AddProducts";
import GeneratePDF from "./pages/GeneratePDF";

const router = createBrowserRouter([
    {
        // path: "/",
        // element: <App />,
        children: [
            {
                path: "/",
                element: <Signup/>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/add-products",
                element: <AddProducts />
            },
            {
                path: "/generate-pdf",
                element: <GeneratePDF />
            }
        ]
    }
]);

export default router;