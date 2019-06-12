import react from 'react'

export const BudgetCategory = props => {
  return (
    <li key={props.category_id}>
      <form onSubmit={e => this.props.submitCategoryAmount(e)}>
        <label>
          {props.category_name}
          <input
            type="text"
            onChange={e =>
              this.props.enterCategoryAmount(e.target.value, props.category_id)
            }
          />
        </label>
        <button type="submit">Enter</button>
      </form>
      {props.amount}
    </li>
  )
}
