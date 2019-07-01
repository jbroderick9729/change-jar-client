import React, { Component } from 'react'
import TokenService from '../Auth/TokenService'
import config from '../config'
import './Expenses.css'

export default class Expenses extends Component {
  static defaultProps = {
    expenses: [],
    categories: []
  }

  expensesNotNullOrEmpty = () => {
    if (this.props.expenses !== null) {
      if (this.props.expenses.length !== 0) {
        return true
      }
    } else {
      return false
    }
  }

  catsNotNullOrEmpty = () => {
    if (this.props.categories !== null) {
      if (this.props.categories.length !== 0) {
        return true
      }
    } else {
      return false
    }
  }

  formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  formatDollarAmount = (num) => {
    const amount = parseInt(num)
    return amount.toFixed(2)
  }


  componentDidMount() {

    const p1 = fetch(`${config.API_ENDPOINT}/expenses`, { headers: { 'Authorization': `bearer ${TokenService.getAuthToken()}` } })

    const p2 = fetch(`${config.API_ENDPOINT}/categories`, { headers: { 'Authorization': `bearer ${TokenService.getAuthToken()}` } })

    const p3 = fetch(
      `${config.API_ENDPOINT}/budget-allotments`, { headers: { 'Authorization': `bearer ${TokenService.getAuthToken()}` } }
    )

    const p4 = fetch(
      `${config.API_ENDPOINT}/users`, { headers: { 'Authorization': `bearer ${TokenService.getAuthToken()}` } }
    )

    Promise.all([p1, p2, p3, p4])
      .then(res => {
        const responses = res.map(response => response.json())
        console.log("promiseall")
        return Promise.all(responses)
      })
      .then(([expenses, categories, budgetAllotments, user]) => this.props.createCurrentBudget(expenses, categories, budgetAllotments, user))
  }


  render() {
    let expenseItems

    expenseItems = this.expensesNotNullOrEmpty() ?
      this.props.expenses.map(expense => (
        <tr key={expense.id}>
          <td>{this.formatDate(expense.date)}</td>
          <td>${this.formatDollarAmount(expense.amount)}</td>
          <td>{expense.description}</td>
          <td>{expense.category_name}</td>
        </tr>
      )) : null

    return (
      <section>
        <div className='divider'> - -- --- -- - $ - -- --- -- -</div>
        <div>
          <h4>Enter an expense</h4>
          <h5>Expenses dated for this month will be tracked against your budget categories and will also be listed below.</h5>
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
                disabled={!this.catsNotNullOrEmpty()}
              />
            </label>
            <label>
              Expense description:
              <input
                type="text"
                placeholder="Clothes, dinner, movie, etc..."
                onChange={e =>
                  this.props.enterExpenseDescription(e.target.value)
                }
                value={this.props.newExpenseDescription}
                disabled={!this.catsNotNullOrEmpty()}
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                placeholder="$50.00"
                onChange={e => this.props.enterExpenseAmount(e.target.value)}
                value={this.props.newExpenseAmount}
                disabled={!this.catsNotNullOrEmpty()}
              />
            </label>
            <label>
              Category:
              <select
                name="categories"
                onChange={e => this.props.selectExpenseCategory(e.target.value)}
                disabled={!this.catsNotNullOrEmpty()}
              >
                <option value='blank'>Choose a category...</option>
                {this.catsNotNullOrEmpty() && this.props.categories.map(cat => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    id={cat.id}
                  >
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={!this.catsNotNullOrEmpty()}>Submit expense</button>
          </form>
          <div className='divider'> - -- --- -- - $ - -- --- -- -</div>
          <h4>Your Expenses</h4>
          {this.expensesNotNullOrEmpty() ?
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount Spent</th>
                  <th>Expense Description</th>
                  <th>Budget Category</th>
                </tr>
              </thead>
              <tbody>
                {expenseItems}
              </tbody>
            </table>
            : <h6>No expenses ...</h6>}
        </div>
      </section>
    )
  }
}
