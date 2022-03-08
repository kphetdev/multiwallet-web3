import {useEffect} from 'react'
import useWeb3Auth from './useWeb3Auth'
import {connectorLocalStorageKey} from 'utils/wallet'

const useWeb3EagerConnect = () => {

    const {login} = useWeb3Auth()
    
    useEffect(() => {
      
        const connectorId = window.localStorage.getItem(connectorLocalStorageKey)

        if (connectorId) {

            login(connectorId)
            
        }

    }, [login])
    

}

export default useWeb3EagerConnect