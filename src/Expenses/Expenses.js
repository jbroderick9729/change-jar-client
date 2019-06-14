import React, { Component } from 'react'
import './Expenses.css'

export default class Expenses extends Component {
  static defaultProps = {
    expenses: []
  }

  render() {
    const expenseItems = this.props.expenses.map((expense, i) => (
      <li key={i}>{`${expense.amount} | ${expense.description}`}</li>
    ))
    return (
      <section>
        <div>
          <header>
            <h2>Expenses</h2>
          </header>
          <form onSubmit={e => this.props.submitExpense(e)}>
            <label>
              Date:
              <input
                type="date"
                onChange={e =>
                  this.props.enterExpenseDate(e.target.value)
                }
                value={this.props.newExpenseDescription}
              />
            </label>
            <label>
              Enter a new expense:
              <input
                type="text"
                placeholder="Clothes, dinner, movie, etc..."
                onChange={e =>
                  this.props.enterExpenseDescription(e.target.value)
                }
                value={this.props.newExpenseDescription}
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                placeholder="$50.00"
                onChange={e => this.props.enterExpenseAmount(e.target.value)}
                value={this.props.newExpenseAmount}
              />
            </label>
            <label>Category: 
              <select>
                {this.props.categories.map(cat => 
                  <option 
                      key={cat.category_id} 
                      id={cat.category_id}>{cat.category_name}</option>)
                      onChange={e => this.props.selectExpenseCategory(e.target.value)}
              </select>
            </label>
            <input type="submit" value="Enter" />
          </form>
          <hr />
          <h3>Your Expenses</h3>
          <ul>{expenseItems}</ul>
        </div>
      </section>
    )
  }
}
