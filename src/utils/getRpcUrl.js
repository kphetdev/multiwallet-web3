import sample from 'lodash/sample'

const nodesConfigs = {
    testnet: [
        'https://data-seed-prebsc-1-s1.binance.org:8545',
        'https://data-seed-prebsc-2-s1.binance.org:8545',
        'https://data-seed-prebsc-1-s2.binance.org:8545',
        'https://data-seed-prebsc-2-s2.binance.org:8545',
        'https://data-seed-prebsc-1-s3.binance.org:8545',
        'https://data-seed-prebsc-2-s3.binance.org:8545',
      ],
      mainnet: [
        'https://bsc-dataseed.binance.org',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed1.ninicoin.io',
        
      ],
}

// Array of available nodes to be connect to
export const nodes = process.env.REACT_APP_BSC_NETWORK === 'mainnet' ? nodesConfigs.mainnet : nodesConfigs.testnet

const getNodeUrl = () => {
  return sample(nodes)
}

export default getNodeUrl