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
    const percent = ((amtSpent / amtBudgeted) * 100)
    if (amtSpent === 0) {
      return 'green'
    }

    if (percent > 100) {
      return 'red'
    } else if (percent <= 100 && percent >= 90) {
      return 'orange'
    } else {
      return 'green'
    }
  }

  formatDollarAmount = (num) => {
    const amount = parseInt(num)
    return amount.toFixed(2)
  }

  render() {

    return (
      <div>
        {this.budgetCatsNotNullOrEmpty() ?
          <div className='budget-displayed'>
            <h4>This is your budget for the current month.</h4>
            <table className="static-budget">
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
                    <td>${this.formatDollarAmount(cat.amountSpent)}</td>
                    <td>${this.formatDollarAmount(cat.amountBudgeted)}</td>
                  </tr>
                )) : null}
              </tbody>
            </table>
            <h5>Amounts will turn orange when you're close to going over in that category and red if you exceed your budget.</h5>
          </div>

          :

          <div>
            <h4>Once you've created your budget, you can see your progress here.</h4>
            <button><Link to='/manage-categories'>Add Budget Categories</Link></button>
            <h5>Get started by entering your income and creating your budget on the Budget Management page.</h5>
          </div>
        }

      </div>
    )
  }
}

