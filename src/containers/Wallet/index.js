import React from 'react'
import useWeb3Auth from 'utils/useWeb3Auth'
import {connectors} from 'utils/wallet'
import {useWeb3React} from '@web3-react/core'

const WalletConnect = () => {

    const {
        login, logout
    } = useWeb3Auth()

    const {
        account
    } = useWeb3React()

    return (
        <>
            {
                !account ?
                <div style={{display: 'flex', padding: '20px'}}>
            
                    {
                        connectors.map((connector, index) => (
                            <div
                                key={connector.title}
                                style={{margin: '20px'}}
                                onClick={() => {
                                    login(connector.connectorId)
                                }}
                            >
                                <img src={connector.icon} alt={connector.title} style={{height: '80px'}} />
                                <p style={{marginTop: '10px'}}>{connector.title}</p>
                            </div>
                        ))
                    }

                </div>
                : 
                <div style={{display: 'flex', padding: '20px'}}>
                    <p>
                        {account}
                    </p>
                    <br />
                    <button
                        style={{

                        }}
                        onClick={e => {
                            logout()
                        }}
                    >
                        Logout
                    </button>
                </div>
            }
        </>
    )
}

export default WalletConnect
