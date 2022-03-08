import {nodes} from './getRpcUrl'

export const connectorLocalStorageKey = 'connectorId'

export const ConnectorNames = {
    Injected: 'injected',
    BSC: 'bsc',
}

export const connectors = [
    {
        title: "Metamask",
        icon: '/assets/img/metamask.png',
        connectorId: ConnectorNames.Injected,
    },
    {
        title: "Binance Chain",
        icon: '/assets/img/binance.png',
        connectorId: ConnectorNames.BSC,
    },
    {
        title: "WalletConnect",
        icon: '/assets/img/mathwallet.png',
        connectorId: ConnectorNames.WalletConnect,
    },
    {
        title: "TrustWallet",
        icon: '/assets/img/connectwallet.png',
        connectorId: ConnectorNames.Injected,
    },
    {
        title: "MathWallet",
        icon: '/assets/img/safepal.png',
        connectorId: ConnectorNames.Injected,
    },
    {
        title: "TokenPocket",
        icon: '/assets/img/trustwallet.png',
        connectorId: ConnectorNames.Injected,
    },
    {
        title: "SafePal",
        icon: '/assets/img/tokenpocket.png',
        connectorId: ConnectorNames.Injected,
    },
];

/**
 * promt user Metamask for adding BSC network
 * or switch to BSC if wallet is on the different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {

    const provider = window.ethereum
    if (provider) {
        
        const chainId = process.env.REACT_APP_BSC_NETWORK === 'mainnet' ? 56 : 97

        try {
            
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: process.env.REACT_APP_BSC_NETWORK === 'mainnet' ? 'BSC Mainnet' : 'BSC Testnet',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'bnb',
                            decimals: 18
                        },
                        rpcUrls: nodes,
                        blockExplorerUrls: [
                            `${process.env.REACT_APP_BSC_EXPLORER}/`
                        ]
                    }
                ]
            })

            return true

        } catch (error) {

            console.error('Failed to setup the network in Metamask: ', error);
            return false
            
        }
        
    } else {

        console.error("Can't setup the BSC network on Metamask because window.ethereum is undefined");
        return false

    }

}

