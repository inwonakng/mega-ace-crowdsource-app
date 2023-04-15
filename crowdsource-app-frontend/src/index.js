import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWalletProvider from './components/AppWalletProvider';
import { HashRouter, Navigate, Route, Routes, createHashRouter, RouterProvider, Router, createBrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import routes from './routes'
import AppNav from './components/AppNav';
import HomePage from './pages/HomePage';


const getRoutes = () => 
  routes.map((prop, key) => 
    <Route             
      path={prop.path}
      element={prop.component}
      key={key}
    />
  )

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    children : routes.map(route => 
      ({
        path: route.path,
        element: route.element,
      })
    )
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWalletProvider>
    <AppNav routes={routes}/>
    <RouterProvider router={router}/>
  </AppWalletProvider>
);
