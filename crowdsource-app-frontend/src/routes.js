import HomePage from "./pages/HomePage";
import DataViewPage from './pages/DataViewPage'
import WalletConnectPage from "./pages/WalletConnectPage";
import CreatorPage from "./pages/CreatorPage";
import DataSubmitPage from "./pages/DataSubmitPage";


const routes = [
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


export default routes;