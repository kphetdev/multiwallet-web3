import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'containers/App/assets/logo.svg';
import 'containers/App/styles/index.css';
import { setWelcomeMsg } from 'actions/welcome_msg';

const App = () => {

    const welcome_msg = useSelector(state => state.welcome_msg)

    const dispatch = useDispatch()

    useEffect(() => {
        
        dispatch(setWelcomeMsg('Edit src/App.js and save to reload.'))
        
    }, [dispatch])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    {welcome_msg}
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
