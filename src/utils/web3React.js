import {InjectedConnector} from '@web3-react/injected-connector'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import {BscConnector} from '@binance-chain/bsc-connector'
import {ethers} from 'ethers'
import {
    ConnectorNames,
} from './wallet'
import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = process.env.REACT_APP_BSC_NETWORK === 'mainnet' ? 56 : 97

const injected = new InjectedConnector({supportedChainIds: [chainId]})

const walletconnect = new WalletConnectConnector({
    rpc: {
        [chainId]: rpcUrl
    },
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({
    supportedChainIds: [chainId]
})

export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.walletconnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector
}

export const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}


export const signMessage = async (provider, account, message) => {

    // BSC Wallet requires a different sign method
    if (window.BinanceChain) {
        const {signature} = await window.BinanceChain.bnbSign(account, message)
        return signature
    }

    // WalletConnect does not sign the message correctly unless you use their method
    if (provider.provider?.wc) {
        const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
        const signature = await provider.provider?.wc.signPersonalMessage([
            wcMessage,
            account
        ])

        return signature
    }

    return provider.getSigner(account).signMessage(message)

}