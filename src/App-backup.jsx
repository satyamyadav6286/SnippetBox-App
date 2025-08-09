import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewPaste from './components/ViewPaste';
import Paste from './components/Paste';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:
        <div>
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
      },
      {
        path:'/paste',
        element:
        <div>
          <Navbar/>
          <Paste/>
          <Footer/>
        </div>
      },
      {
        path:'/paste/:id',
        element:
        <div>
          <Navbar/>
          <ViewPaste/>
          <Footer/>
        </div>
      },
    ]
  )
  return (
    <ThemeProvider>
      <div className="app">
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-text)',
              border: '1px solid var(--border-color)',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
