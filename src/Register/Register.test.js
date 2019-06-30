import React from 'react'
import ReactDOM from 'react-dom'
import Register from './Register'

describe('Register', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Register />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})

