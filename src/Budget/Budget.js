import React from 'react'
import './Budget.css'

const rowColor = (amtBudgeted, amtSpent) => {
    const percent = (amtSpent / amtBudgeted) * 100
    if (percent > 10) {
        return 'green'
    } else if (percent <= 10 && percent > 0) {
        return 'orange'
    } else {
        return red
    }
} 

function Budget(props) {
  return (
    <div>
      <header>
        <h2>Budget</h2>
      </header>
      <table>
        <th>{' '}</th>
        <th>Category</th>
        <th>Amount Spent</th>
        <th>Amount Budgeted</th>
        {props.budgetCategories.map(cat => (
          <tr key={cat.category_id} className={`row ${rowColor(cat.amountBudgeted, cat.amountSpent)}`}>{
            <td>{cat.category_name}</td>
            <td>{cat.amountSpent}</td>
            <td>{cat.amountBudgeted}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

Budget.defaultProps = {
  budgetCategories: []
}

export default Budget
