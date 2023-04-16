import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWalletProvider from './components/AppWalletProvider';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import routes from './routes'
import AppNav from './components/AppNav';
import Layout from './layout';

export const creatorAddress = '7AQT5DB3PN6EFGYDKVUOO7QWK2GBTX34LYF5MNCP725TKE7E7Y3GIZNYEI'
export const applicationId = 192376827
export const contractAddress = 'YYN2FVPOMHBQV7EU43QP23GUTYECTTDJXDDUJGR6Z2GUW27AITA3OGXBFI'

const router = createBrowserRouter(
  routes.map(route => 
    ({
      path: route.path,
      element: route.element
    })
  )
);

console.log(
  routes.map(route => 
    ({
      path: route.path,
      element: route.element
    })
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWalletProvider>
    <AppNav/>
    <Layout>
      <RouterProvider router={router}/>
    </Layout>
  </AppWalletProvider>
);
