import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWalletProvider from './components/AppWalletProvider';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

// import routes from './routes'
import AppNav from './components/AppNav';
import Layout from './layout';


import HomePage from "./pages/HomePage";
import DataViewPage from './pages/DataViewPage'
import WalletConnectPage from "./pages/WalletConnectPage";
import CreatorPage from "./pages/CreatorPage";
import DataSubmitPage from "./pages/DataSubmitPage";


export const creatorAddress = '7AQT5DB3PN6EFGYDKVUOO7QWK2GBTX34LYF5MNCP725TKE7E7Y3GIZNYEI'
export const applicationId = 194379991
export const applicationAddress = '5IZYROLYGQZNBD7KRLKH2EVNBPRSQOML2B76V3X6IA7MGACFMIPET3JECI'

// const router = createBrowserRouter(
//   routes.map(route => 
//     ({
//       path: route.path,
//       element: route.element,

//     })
//   )
// );

export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <HomePage/>,
  },
  {
    path: '/submit-data',
    name: 'Submit New Data',
    element: <DataSubmitPage/>, 
  },
  {
    path: '/view-data',
    name: 'View Collected Data',
    element: <DataViewPage/>, 
  },
  {
    path: '/creator-menu',
    name: 'Creator Menu',
    element: <CreatorPage/>
  },
  {
    path: '/connect-wallet',
    name: 'Connect Wallet',
    element: <WalletConnectPage/>
  },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppWalletProvider>
      <BrowserRouter>
      <AppNav/>
      <Layout>
      <Routes>
        {routes.map(route => 
          <Route path = {route.path} element = {route.element} key={route.name}/>
        )}
			</Routes>

        {/* <RouterProvider router={router}/> */}
      </Layout>
      </BrowserRouter>
    </AppWalletProvider>
  </Provider>
);
