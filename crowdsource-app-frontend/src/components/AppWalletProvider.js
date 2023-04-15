import { reconnectProviders, initializeProviders, WalletProvider } from '@txnlab/use-wallet'
import { useEffect } from 'react'

const walletProviders = initializeProviders()

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