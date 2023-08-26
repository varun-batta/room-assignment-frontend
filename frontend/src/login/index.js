import React, {useState} from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

const Login = ({ setAuth }) => {
    const [state, setState] = useState({
        tabValue: 0,
        name: "",
        username: "",
        password: "",
        isLoginError: false
    });

    const { tabValue, name, username, password, isLoginError } = state;

    const tabChange = (_, newTabValue) => {
        setState({
            tabValue: newTabValue,
            name: "",
            username: "",
            password: "",
        })
    }

    const nameChange = (event) => {
        setState({
            ...state,
            name: event.target.value,
        })
    }

    const usernameChange = (event) => {
        setState({
            ...state,
            username: event.target.value,
        })
    }

    const passwordChange = (event) => {
        setState({
            ...state,
            password: event.target.value,
        })
    }

    const login = () => {
        if (tabValue === 0) {
            // Logging in
            fetch('http://varun.alwaysdata.net/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            }).then((response) => {
                console.log(response, response.status === 200)
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error()
            }).then((responseBody) => {
                console.log(responseBody)
                setAuth(responseBody)
            }).catch((error) => {
                setState({
                    ...state,
                    isLoginError: true
                })
            })
        } else {
            // Signing up
            fetch('http://varun.alwaysdata.net/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            }).then((response) => {
                if (response.status === 201) {
                    return response.json()
                }
                throw new Error()
            }).then((responseBody) => {
                setAuth(responseBody)
            }).catch((error) => {
                setState({
                    ...state,
                    isLoginError: true
                })
            })
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 64}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={tabChange}>
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Box>
            {tabValue === 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 100, marginTop: 16}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={usernameChange} value={username}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={passwordChange} value={password}/>
                    </div>
                    <button onClick={login}>Login</button>
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 150, marginTop: 16}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" onChange={nameChange} value={name}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={usernameChange} value={username}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 250}}>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={passwordChange} value={password}/>
                    </div>
                    <button onClick={login}>Sign Up</button>
                </div>
            )}
            {isLoginError &&
                <p style={{color: 'red'}}>{tabValue === 0 ? "Invalid Credentials!!" : "Username already exists!!"}</p>
            }
        </div>
    )
}

Login.propTypes = {
    setAuth: PropTypes.func.isRequired
}

export default Login;
