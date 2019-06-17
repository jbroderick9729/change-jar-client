import React from 'react'
import ReactDOM from 'react-dom'
import Manage from './Manage'

describe('Categories', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Manage />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})

