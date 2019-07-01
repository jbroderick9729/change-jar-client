import React, { Component } from 'react'
import AuthApiService from '../Auth/AuthApiService'
import TokenService from '../Auth/TokenService'
import './Login.css'

export default class Login extends Component {
    state = {
        error: false
    }

    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
        onLoginSuccess: () => { }
    }

    onLoginSuccess = () => {
        const { history } = this.props
        history.push('/manage-categories')
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = ev.target
        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <section>
                <h3>Log into Change Jar</h3>
                <form
                    className='LoginForm'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='username'>
                        <label htmlFor='LoginForm__username'>
                            User name
                        </label>
                        <input
                            required
                            name='username'
                            id='LoginForm__username'>
                        </input>
                    </div>
                    <div className='password'>
                        <label htmlFor='LoginForm__password'>
                            Password
                        </label>
                        <input
                            required
                            name='password'
                            type='password'
                            id='LoginForm__password'>
                        </input>
                    </div>
                    <button type='submit'>
                        Login
                    </button>
                </form>
            </section>
        )
    }
}

