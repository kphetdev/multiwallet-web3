import React from 'react'
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { useAuth } from 'routes/auth/ProvideAuth'

const Login = () => {

    let history = useHistory()
    let location = useLocation()

    let auth = useAuth()

    let { from } = location.state || { from: {pathname: '/'} }

    let login = () => {
        auth.login(() => {
            history.replace(from)
        })
    }

    return (
        <div>
            <p>
                You must login to view page at {from.pathname}
                <button onClick={login}>
                    Log in
                </button>
            </p>
        </div>
    )
}

export default Login
