import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Budget.css'


export default class Budget extends Component {
  static defaultProps = {
    budgetCategories: []
  }

  budgetCatsNotNullOrEmpty = () => {
    if (this.props.budgetCategories !== null) {
      if (this.props.budgetCategories.length !== 0) {
        return true
      }
    } else {
      return false
    }
  }

  rowColor = (amtBudgeted, amtSpent) => {
    const percent = ((amtBudgeted - amtSpent) / amtBudgeted) * 100
    if (amtSpent === 0) {
      return 'green'
    }

    if (percent > 90 && percent < 80) {
      return 'red'
    } else if (percent <= 10 && percent > 0) {
      return 'orange'
    } else {
      return 'green'
    }
  }

  render() {

    return (
      <div>
        <h3>Budget</h3>
        {this.budgetCatsNotNullOrEmpty() ?
          <div>
            <h4>This is your budget for the current month.</h4>
            <h5>Amounts will turn orange when you're close to going over in that category and red if you exceed your budget.</h5>
          </div>
          :
          <div>
            <h4>Once you've created your budget, you can see your progress here.</h4>
            <h5>Get started by entering your income and creating your budget on the Budget Management page.</h5>
          </div>
        }
        {this.budgetCatsNotNullOrEmpty() ? <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount Spent</th>
              <th>Amount Budgeted</th>
            </tr>
          </thead>
          <tbody>
            {this.budgetCatsNotNullOrEmpty() ? this.props.budgetCategories.map(cat => (
              <tr key={cat.id} className={`row ${this.rowColor(cat.amountBudgeted, cat.amountSpent)}`}>
                <td>{cat.category_name}</td>
                <td>{cat.amountSpent}</td>
                <td>{cat.amountBudgeted}</td>
              </tr>
            )) : null}
          </tbody>
        </table> : <Link to='/manage-categories'>Add Budget Categories</Link>}

      </div>
    )
  }
}

