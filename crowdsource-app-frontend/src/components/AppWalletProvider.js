import { reconnectProviders, initializeProviders, WalletProvider } from '@txnlab/use-wallet'
import { useEffect } from 'react'

const walletProviders = initializeProviders(
  [],{
    network: 'testnet',
    nodeServer: 'https://testnet-api.algonode.cloud',
    nodeToken: '',
    nodePort: '',
  }
  // 'https://testnet-api.algonode.cloud',
)

const AppWalletProvider = ({children}) => {

  useEffect(() => {
    // algodClient.status().do().then( s =>
    //   console.log(s)
    // )
    reconnectProviders(walletProviders)
  },[])

  return (
    <WalletProvider value = {walletProviders}>
      {children}
    </WalletProvider>
  )
}

export default AppWalletProvider