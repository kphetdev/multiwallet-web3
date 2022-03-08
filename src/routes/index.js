import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import {
    ProvideAuth
} from 'routes/auth/ProvideAuth'

import PrivateRoute from './auth/PrivateRoute'

import useWeb3EagerConnect from 'utils/useWeb3EagerConnect'

import App from 'containers/App'
import Admin from 'containers/Admin'
import Login from 'containers/Login'
import Wallet from 'containers/Wallet'
import TokenPricing from 'containers/TokenPricing'

const Routes = () => {

    useWeb3EagerConnect()

    return (
        <ProvideAuth>

            <Wallet />

            <hr/>
            <br/>
            
            <Router>
                <Switch>

                    <Route path="/" exact>
                        <App/>
                    </Route>

                    <Route path="/login">
                        <Login/>
                    </Route>

                    <Route path="/token-pricing">
                        <TokenPricing/>
                    </Route>

                    <PrivateRoute path='/admin'>
                        <Admin/>
                    </PrivateRoute>

                </Switch>
            </Router>
        </ProvideAuth>
    )
}

export default Routes
