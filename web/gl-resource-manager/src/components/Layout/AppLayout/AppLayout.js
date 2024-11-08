import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function AppLayout() {
  return (
    <>
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default AppLayout;