import React, { Component } from 'react'
import './Register.css'
import AuthApiService from '../Auth/AuthApiService'

export default class Register extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  onRegistrationSuccess = () => {
    const { history } = this.props

    history.push('/login')
  }

  handleSubmitRegistration = ev => {
    ev.preventDefault()
    const { first_name, last_name, username, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        username.value = ''
        password.value = ''
        this.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {

    const { error } = this.state

    return (
      <div>
        <section>
          <header>
            <h3>Register for an account</h3>
          </header>
        </section>
        <section>
          <form
            onSubmit={this.handleSubmitRegistration}
          >
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
            <div className='first_name'>
              <label htmlFor='RegistrationForm__first_name'>
                First name *
              </label>
              <input
                name='first_name'
                type='text'
                required
                id='RegistrationForm__first_name'
              >
              </input>
            </div>
            <div className='last_name'>
              <label htmlFor='RegistrationForm__last_name'>
                Last name *
              </label>
              <input
                name='last_name'
                type='text'
                required
                id='RegistrationForm__last_name'
              >
              </input>
            </div>
            <div className='username'>
              <label htmlFor='RegistrationForm__username'>
                Username *
              </label>
              <input
                name='username'
                type='text'
                required
                id='RegistrationForm__username'
              >
              </input>
            </div>
            <div className='password'>
              <label htmlFor='RegistrationForm__password'>
                Password *
              </label>
              <input
                name='password'
                type='password'
                required
                id='RegistrationForm__password'
              >
              </input>
            </div>
            <button type='submit'>
              Register
        </button>
          </form>
        </section>
      </div>
    )
  }
}
