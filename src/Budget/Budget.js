import React from 'react'
import './Budget.css'

const rowColor = (amtBudgeted, amtSpent) => {
  const percent = ((amtBudgeted - amtSpent) / amtBudgeted) * 100
  console.log(amtSpent)
  console.log(amtBudgeted)
  if (amtSpent === 0) {
    return 'green'
  }

  if (percent > 90 && percent < 80) {
    return 'green'
  } else if (percent <= 10 && percent > 0) {
    return 'orange'
  } else {
    return 'red'
  }
}

function Budget(props) {
  return (
    <div>
      <h3>Budget</h3>
      <h4>This month's budget. Amounts will turn orange when you're close to going over in that category and red when you're overbudget</h4>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount Spent</th>
            <th>Amount Budgeted</th>
          </tr>
        </thead>
        <tbody>
          {props.budgetCategories.map(cat => (
            <tr key={cat.category_id} className={`row ${rowColor(cat.amountBudgeted, cat.amountSpent)}`}>
              <td>{cat.category_name}</td>
              <td>{cat.amountSpent}</td>
              <td>{cat.amountBudgeted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Budget.defaultProps = {
  budgetCategories: []
}

export default Budget
