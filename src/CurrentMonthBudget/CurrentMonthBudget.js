import React, { Component } from 'react'
import './CurrentMonthBudget.css'
import { BudgetCategory } from '../BudgetCategory/BudgetCategory'

export default class CurrentMonthBudget extends Component {
  static defaultProps = {
    categories: [],
    currentBudget: []
  }

  state = {
    currentBudget: [
      { category_id: 2, category_name: 'Groceries', amount: '60' }
    ]
  }

  handleCategoryAmount(amount, id) {
    const { currentBudget } = this.state
    const budgetCatToChange = currentBudget.find(cat => cat.category_id === id)
    budgetCatToChange.amount = amount
    const newBudget = [budgetCatToChange, { ...currentBudget }]
    this.setState({
      currentBudget: newBudget
    })
  }

  render() {
    const displayCategories = this.state.currentBudget.map(cat => (
      <BudgetCategory
        enterCategoryAmount={this.handleCategoryAmount}
        {...props}
      />
    ))
    const left = this.props.income - budgeted

    return (
      <section>
        <h2>{`Current Month's Total Budget: ${this.props.income}`}</h2>
        <form onSubmit={e => this.props.submitIncome(e)}>
          <label>
            How much money will you make this month?
            <input
              type="text"
              onChange={e => this.props.enterIncome(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <h2>Your Budget Categories</h2>
        <h3>{`Amount Budgeted: ${budgeted} | Amount Left to Budget: ${left}`}</h3>
        <ul>{displayCategories}</ul>
      </section>
    )
  }
}
