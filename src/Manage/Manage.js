import React, { Component } from 'react'
import BudgetCategory from '../BudgetCategory/BudgetCategory'
import TokenService from '../Auth/TokenService'
import config from '../config'
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

  catsNotNullOrEmpty = () => {
    if (this.props.categories !== null) {
      if (this.props.categories.length !== 0) {
        return true
      }
    } else {
      return false
    }
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
        return Promise.all(responses)
      })
      .then(([expenses, categories, budgetAllotments, user]) => this.props.createCurrentBudget(expenses, categories, budgetAllotments, user))
  }

  render() {
    const { categories, user } = this.props
    const income = user ? user.income : null
    let budgeted
    let left
    let categoriesList


    if (this.catsNotNullOrEmpty()) {
      categoriesList = categories.map(cat => (
        <BudgetCategory
          key={cat.id}
          enterCategoryAmount={this.props.enterCategoryAmount}
          submitCategoryAmount={this.props.submitCategoryAmount}
          newCategoryBudgetAmount={this.props.newCategoryBudgetAmount}
          {...cat}
        />
      ))

      const initialValue = 0
      budgeted = categories.reduce(
        (a, b) => a + b.amountBudgeted,
        initialValue
      )
      left = income - budgeted
    }
    console.log(this.catsNotNullOrEmpty())
    return (
      <div>
        <section>
          <header>
            <h2>Manage your budget and income</h2>
          </header>
          <h3>Income</h3>
          <h4>This is how much money you make each month. Click the button below to enter or update your income.</h4>
          {income === 0 ? null : <h3>{income}</h3>}

          {this.state.showEditIncomeButton ? (
            <button
              onClick={() => {
                this.setState({
                  showEditIncomeButton: false
                })
              }}
            >
              Edit Income
            </button>
          ) : (
              <div>
                <form onSubmit={e => this.props.submitIncome(e)}>
                  <input
                    type="text"
                    onChange={e => this.props.enterIncome(e.target.value)}
                    placeholder="Your monthly income"
                  />

                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
        </section>
        <hr />
        <section>
          <h3>Budget</h3>

          <h4>{`Manage your budget categories here.`}</h4>

          {
            this.catsNotNullOrEmpty()
              ?
              <h5>{`Currently, you've budgeted ${budgeted} of your monthly income and you have ${left} left to assign to your budget categories.`}
              </h5>
              :
              <h5>Get started by entering a budget category below</h5>
          }

          {!!this.catsNotNullOrEmpty() &&
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount Spent</th>
                  <th>Amount Budgeted</th>
                </tr>
              </thead>
              <tbody>{categoriesList}</tbody>
            </table>}
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