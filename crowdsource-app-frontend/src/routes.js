import HomePage from "./pages/HomePage";
import WalletConnectPage from "./pages/WalletSetupPage";


const routes = [
  {
    path: 'home',
    name: 'Home',
    element: HomePage,
  },
  {
    path: 'connect-wallet',
    name: 'Connect Wallet',
    element: WalletConnectPage
  }
]


export default routes;