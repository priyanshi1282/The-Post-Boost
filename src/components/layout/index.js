import { LOGIN } from '../../lib/routes';
import React, { useEffect } from 'react'
import { Outlet, useLocation , useNavigate} from 'react-router-dom'
import { useAuth } from '../../hooks/auth';
import Navbar from '../navbar'
import Post from '../Post'
import UserProfileSidebar from '../sidebar'
import Footer from '../Footer'


  
export default function Layout() {
    const {pathname} = useLocation();
    const navigate = useNavigate(); 
    const {user , isLoading} = useAuth();

    

    useEffect( ()=> {
        if(pathname.startsWith("/protected") && !user){

            navigate(LOGIN);
        }
    }, [pathname, user, navigate])

    if(isLoading) return <h1>Loading...</h1>;


  return (
    <>
      <Navbar />
      <UserProfileSidebar />
      <Post/>
      <Footer />
      <Outlet />
     
    
    </>
  )
}
