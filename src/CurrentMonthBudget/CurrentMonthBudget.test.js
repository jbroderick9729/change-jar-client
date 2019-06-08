import React from 'react'
import ReactDOM from 'react-dom'
import CurrentMonthBudget from './CurrentMonthBudget'

describe('CurrentMonthBudget', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CurrentMonthBudget />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})

