import React, { Component } from 'react'
import BudgetCategory from '../BudgetCategory/BudgetCategory'
import './Manage.css'

export default class Manage extends Component {
  static defaultProps = {
    categories: [],
    enterCategoryAmount: () => { },
    submitCategoryAmount: () => { }
  }

  state = {
    showEditIncomeButton: true,
    newIncome: '',
    income: 0
  }

  handleEnterIncome = newIncome => {
    this.setState({
      newIncome: parseInt(newIncome)
    })
  }

  handleSubmitIncome = event => {
    event.preventDefault()
    this.setState({
      income: this.state.newIncome,
      newIncome: '',
      showEditIncomeButton: !this.state.showEditIncomeButton
    })
  }

  render() {
    const { categories } = this.props

    const categoriesList = categories.map((cat, i) => (
      <BudgetCategory
        key={i}
        enterCategoryAmount={this.props.enterCategoryAmount}
        submitCategoryAmount={this.props.submitCategoryAmount}
        newCategoryBudgetAmount={this.props.newCategoryBudgetAmount}
        {...cat}
      />
    ))

    const mapCatsAmountBudgeted = this.props.categories.map(cat => cat.amountBudgeted)
    const budgeted = mapCatsAmountBudgeted.reduce((a, b) => a + b)

    const left = this.state.income - budgeted

    return (
      <div>
        <section>
          <header>
            <h2>Income</h2>
            {this.state.income === '' ? null : (
              <h3>{`Total monthly income: ${
                this.state.income
                }`}</h3>
            )}
          </header>
          {this.state.showEditIncomeButton ? (
            <button
              onClick={() => {
                this.setState({
                  showEditIncomeButton: false
                })
              }}
            >
              {this.state.income === 0 Enter Income ? Edit Income}
            </button>
          ) : (
              <div>
                <form onSubmit={e => this.handleSubmitIncome(e)}>
                  <label>Enter your total income for the month:</label>
                  <input
                    type="text"
                    onChange={e => this.handleEnterIncome(e.target.value)}
                    value={this.state.newIncome}
                  />

                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
        </section>
        <hr />
        <section>
          <header>
            <h2>Budget</h2>
          </header>
          <div>
            <h3>{`Amount Budgeted: ${budgeted} | Amount Left to Budget: ${left}`}</h3>
            <table>
              <tr>
                <th>Category</th>
                <th>Amount Spent</th>
                <th>Amount Budgeted</th>
              </tr>
              {categoriesList}
            </table>
          </div>

          <form onSubmit={e => this.props.submitCategory(e)}>
            <label>Enter a new category:</label>
            <input
              type="text"
              placeholder="Mortgage, Rent, Groceries ..."
              onChange={e => this.props.enterCategory(e.target.value)}
              value={this.props.newCategoryEntry}
            />
            <input type="submit" value="Enter" />
          </form>

        </section>
      </div>
    )
  }
}
