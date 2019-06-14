import React from 'react'
import './Budget.css'

export default function Budget(props) {
    return (
        <div>
            <header>
                <h2>Budget</h2>
            </header>
            <ul>
                {props.budget.categories.map(cat => <li>{`${cat.category_name} | ${cat.amountSpent} | ${cat.amountBudgeted}`}</li>)}
            </ul>
        </div>
    )
}
