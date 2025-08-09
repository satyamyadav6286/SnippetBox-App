import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider } from './contexts/ThemeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import { Toaster } from 'react-hot-toast';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="app">
        <Navbar />
        <Home />
        <Footer />
      </div>
    )
  },
  {
    path: '/paste',
    element: (
      <div className="app">
        <Navbar />
        <Paste />
        <Footer />
      </div>
    )
  },
  {
    path: '/paste/:id',
    element: (
      <div className="app">
        <Navbar />
        <ViewPaste />
        <Footer />
      </div>
    )
  }
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
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
      </ThemeProvider>
    </Provider>
  );
}

export default App;
