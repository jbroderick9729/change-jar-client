import React from 'react'

export const BudgetCategory = props => {
  return (
    <li key={props.category_id}>
      <form onSubmit={e => props.submitCategoryAmount(e)}>
        <label>
          {props.category_name}
          <input
            type="text"
            onChange={e =>
              props.enterCategoryAmount(e.target.value, props.category_id)
            }
          />
        </label>
        <button type="submit">Enter</button>
      </form>
      {`${props.amountSpent} spent out of ${props.amountBudgeted}`}
    </li>
  )
}
