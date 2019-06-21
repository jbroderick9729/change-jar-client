import React, { Component } from 'react'
import './Expenses.css'

export default class Expenses extends Component {
  static defaultProps = {
    expenses: [],
    categories: []
  }

  render() {
    const expenseItems = this.props.expenses.map(expense => (
      <tr key={expense.expense_id}>
        <td>{expense.date}</td>
        <td>{expense.amount}</td>
        <td>{expense.description}</td>
        <td>{expense.category}</td>
      </tr>
    ))
    return (
      <section>
        <div>
          <h2>Enter your expenses</h2>
          <h3>Expenses you enter here will appear below and their amounts will be reflected in your monthly budget above</h3>
          <form
            className="expense-form"
            onSubmit={e => this.props.submitExpense(e)}
          >
            <label>
              Date:
              <input
                type="text"
                onChange={e => this.props.enterExpenseDate(e.target.value)}
                value={this.props.newExpenseDate}
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
            <label>
              Category:
              <select
                name="categories"
                onChange={e => this.props.selectExpenseCategory(e.target.value)}
              >
                <option value='blank'>Choose a category...</option>
                {this.props.categories.map(cat => (
                  <option
                    key={cat.category_id}
                    value={cat.category_name}
                    id={cat.category_id}
                  >
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Submit expense</button>
          </form>
          <hr />
          <h3>Your Expenses</h3>
          {!!this.props.expenses.length &&
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {expenseItems}
              </tbody>
            </table>}
        </div>
      </section>
    )
  }
}
