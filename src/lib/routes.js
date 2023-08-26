import { createBrowserRouter } from "react-router-dom";
import Login  from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/layout";
import Dashboard from "components/HomeDashBoard";
import Home from "components/Home";
import AboutPage from '../components/About'; // Import the AboutPage component



export const HOME  = "/";
export const LOGIN  = "/login";
export const REGISTER  = "/register";


// home page hai 
export const DASHBOARD = "/protected/dashboard"; 
export const PROTECTED = "/protected";
export const ABOUT = '/about'; // Define the ABOUT route path

export const router  = createBrowserRouter([
    {path: HOME, element: <Home />},
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Register/>},
    { path: ABOUT, element: <AboutPage /> },
    
    {path: 
        
        PROTECTED,
        element:  <Layout />, 
        children: 
        [{
        path: DASHBOARD, 
        element: <Dashboard/>,
    
        

        
    
    }
]
},]); 