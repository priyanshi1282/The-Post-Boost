import { createBrowserRouter } from "react-router-dom";
import Login  from "../components/auth/Login";
import Register from "../components/auth/Register";
import Layout from "../components/layout";
import Dashboard from "components/HomeDashBoard";
import Home from "components/Home";
import AboutPage from '../components/About'; // Import the AboutPage component
import ContactForm from "components/About/contact";




export const HOME  = "/";
export const LOGIN  = "/login";
export const REGISTER  = "/register";



// home page hai 
export const DASHBOARD = "/protected/dashboard"; 
export const PROTECTED = "/protected";
export const ABOUT = '/about'; // Define the ABOUT route path
export const CONTACT = '/contact'; // Define the CONTACT route path


export const router  = createBrowserRouter([
    {path: HOME, element: <Home />},
    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Register/>},
    { path: ABOUT, element: <AboutPage /> },
    { path: CONTACT, element: <ContactForm />},
    

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