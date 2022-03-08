import Web3 from 'web3'
import {connectorLocalStorageKey, ConnectorNames} from './wallet'
import getNodeUrl from './getRpcUrl'

export const callContractValue = (method, params) => {

    return new Promise((resolve, reject) => { 
        
        method(...params)
            .call()
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })

    })

}

export const sendContractValue = (method, params, from) => {

    return new Promise((resolve, reject) => { 
      
        method(...params)
            .send({from})
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        
    })

}

export const getWeb3 = () => {

    const providerUrl = getNodeUrl()

    return new Web3(
        localStorage.getItem(connectorLocalStorageKey) && 
        localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.BSC
        ?
        (
            window.BinanceChain || providerUrl
        )
        :
        (
            window.ethereum || providerUrl
        )
    )

}

export const getTargetContract = (abi, address) => {
    const instance = getWeb3()
    return new instance.eth.Contract(
        abi,
        address
    )
}