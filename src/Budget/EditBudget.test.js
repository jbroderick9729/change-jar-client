
import React from 'react'
import ReactDOM from 'react-dom'
import EditBudget from './EditBudget'

describe('CurrentMonthBudget', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<EditBudget />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})

