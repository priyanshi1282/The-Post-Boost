import { LOGIN } from '../../lib/routes';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Navbar from '../navbar';
import Post from '../Post';
import UserProfileSidebar from '../sidebar';
import { css } from 'styled-components'; // Import the 'css' function from styled-components
import { PropagateLoader } from 'react-spinners'; // Import PropagateLoader

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  useEffect(() => {
    if (pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }

    // Delay rendering for 1-2 seconds when transitioning from login to home/dashboard
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000); // Change this to 1000 for 1 second delay

    return () => clearTimeout(timeout);
  }, [pathname, user, navigate]);

  if (showLoading) {
    // Display loading spinner centered on the page
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className="spinner-container">
          <PropagateLoader color={'#007bff'} css={override} size={15} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    // Display loading spinner or text for general loading state
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className="spinner-container">
          <PropagateLoader color={'#007bff'} css={override} size={15} />
        </div>
      </div>
    );
  }

  // Render your content when the delay is complete
  return (
    <>
      <Navbar />
      <UserProfileSidebar />
      <Post />
      <Outlet />
    </>
  );
}
