import React, {useState, useEffect} from 'react'
import BigNumber from 'bignumber.js'
import { getTargetContract, getWeb3, callContractValue } from 'utils/contractService'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'

const tokens = process.env.REACT_APP_BSC_NETWORK === 'mainnet' ? 
    [
        {
            name: 'WEL',
            icon: '/assets/img/coins/wel.png',
            abi: require('abis/mainnet/wel.json'),
            address: '0x854B4c305554c5fa72353e31b8480c0e5128A152',
            balance: 0
        },
        {
            name: 'USDT',
            icon: '/assets/img/coins/usdt.png',
            abi: require('abis/mainnet/usdt.json'),
            address: '0x55d398326f99059fF775485246999027B3197955',
            balance: 0
        },
    ]
    :
    [
        {
            name: 'WEL',
            icon: '/assets/img/coins/wel.png',
            abi: require('abis/testnet/wel.json'),
            address: '0x94Dc02E1307534540d09C02950F73E8fC31d62ad',
            balance: 0
        },
        {
            name: 'USDT',
            icon: '/assets/img/coins/usdt.png',
            abi: require('abis/testnet/usdt.json'),
            address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
            balance: 0
        },
    ]

const TokenPricing = () => {

    const {account} = useWeb3React()

    const [accountAddress, setAccountAddress] = useState('')

    const [data, setData] = useState(tokens)

    useEffect(() => {
      
        setAccountAddress(account)
        getPricing(account)
        
    }, [account])
    

    const getPricing = async (accountAddress) => {

        if (Web3.utils.isAddress(accountAddress)) {

            let newTokensList = []

            for (let i = 0; i < tokens.length; i++) {

                const t = tokens[i];

                try {

                    const tokenContract = getTargetContract(t.abi, t.address)
                    
                    const balance = await callContractValue(tokenContract.methods.balanceOf, [accountAddress])
                
                    newTokensList.push(
                        {
                            ...t,
                            balance: new BigNumber(balance).div(1e18)
                        }
                    )

                } catch (error) {
                    console.log('error: ', error);
                }

                if (newTokensList.length === tokens.length) {
                    setData(newTokensList)
                }
                
            }

        }

    }

    return (
        <div style={{display: 'block', padding: '20px'}}>

            <div>
                <label htmlFor="accountAddress">Account Address: </label>
                <input
                    type="text"
                    name='accountAddress'
                    value={accountAddress}
                    onChange={e => {

                        getPricing(e.target.value)

                    }}
                />
            </div>

            <br />

            <ul>
                {
                    data.map(t => (
                        <li key={t.name} style={{}}>
                            <img src={t.icon} alt={t.name} style={{height: '60px', verticalAlign: 'middle'}} />
                            <span style={{marginLeft: '10px', marginRight: '10px'}}>{t.name}</span>
                            <span style={{marginLeft: '10px', marginRight: '10px'}}>{parseFloat(t.balance.toString(10)).toLocaleString()}</span>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default TokenPricing
