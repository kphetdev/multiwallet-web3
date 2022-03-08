import {useCallback} from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector
} from '@web3-react/walletconnect-connector'
import {
    connectorsByName
} from 'utils/web3React'
import {
    setupNetwork, connectorLocalStorageKey
} from 'utils/wallet'

const useWeb3Auth = () => {

    const {
        activate, deactivate
    } = useWeb3React()

    const login = useCallback(
        (connectorID) => {

            const connector = connectorsByName[connectorID]

            // set to localStorage on login first
            window.localStorage.setItem(connectorLocalStorageKey, connectorID)

            if (connector) {
                
                activate(connector, async (error) => {

                    if (error instanceof UnsupportedChainIdError) {
                        
                        console.log('error: ', error);

                        const hasSetup = await setupNetwork()

                        if (hasSetup) {
                            activate(connector)
                        }

                    } else {

                        window.localStorage.removeItem(connectorLocalStorageKey)

                        if (
                            error instanceof NoEthereumProviderError ||
                            error instanceof NoBscProviderError
                        ) {

                            window.alert('Provider Error: No provider was found')
                            
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
                        ) {

                            if (connector instanceof WalletConnectConnector) {
                                
                                const walletConnector = connector
                                walletConnector.walletConnectProvider = null

                            }

                            window.alert('Authorization Error: Please authorize to access your account')
                            
                        } else {

                            window.alert(`${error.name}: ${error.message}`)
                            
                        }
                        
                    }

                })

            } else {

                window.alert('Unable to find connector: The connector config is wrong')
                
            }

        }, 
        [activate]
    )

    const logout = useCallback(() => {

        try {
            
            deactivate()

            window.localStorage.removeItem(connectorLocalStorageKey)

            // this localStorage key is set by @web3-react/walletconnect-connector
            if (window.localStorage.getItem('walletconnect')) {
                
                connectorsByName.walletConnector.close()
                connectorsByName.walletConnector.walletConnectProvider = null

            }

        } catch (error) {
            console.log('logout error: ', error);
        }

    }, [deactivate])

    return {
        login,
        logout,
    }

}

export default useWeb3Auth