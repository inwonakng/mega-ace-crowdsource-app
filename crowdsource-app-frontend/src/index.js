import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWalletProvider from './components/AppWalletProvider';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from './routes'
import AppNav from './components/AppNav';
import Layout from './layout';

export const creatorAddress = '7AQT5DB3PN6EFGYDKVUOO7QWK2GBTX34LYF5MNCP725TKE7E7Y3GIZNYEI'
export const applicationId = 194370177
export const applicationAddress = 'VOBP5LRJPEEL4EX2XKBU7RNN3IOGJBQT6XBSDPKS53ICBK7NB7LWRXZG7Y'

const router = createBrowserRouter(
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
