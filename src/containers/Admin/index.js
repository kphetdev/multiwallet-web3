import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'routes/auth/ProvideAuth'

const Admin = () => {

    let history = useHistory()
    let auth = useAuth()

    return (
        <div>
            Admin
            <br />
            <button
                onClick={e => {
                    auth.logout(() => history.push('/'))
                }}
            >
                Log out
            </button>
        </div>
    )
}

export default Admin
