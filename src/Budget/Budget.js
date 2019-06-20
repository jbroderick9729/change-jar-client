import React from 'react'
import './Budget.css'

function Budget(props) {
  return (
    <div>
      <header>
        <h2>Budget</h2>
      </header>
      <ul>
        {props.budgetCategories.map(cat => (
          <li key={cat.category_id}>{`${cat.category_name} | ${
            cat.amountSpent
          } | ${cat.amountBudgeted}`}</li>
        ))}
      </ul>
    </div>
  )
}

Budget.defaultProps = {
  budgetCategories: []
}

export default Budget
