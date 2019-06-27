import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import Nav from '../Nav/Nav'
import Manage from '../Manage/Manage'
import Expenses from '../Expenses/Expenses'
import Budget from '../Budget/Budget'
import config from '../config'

class App extends Component {
  state = {
    newCategoryEntry: '',
    newCategoryAmountEntry: {},
    newExpenseDescription: '',
    newExpenseAmount: '',
    newExpenseDate: new Date().toLocaleDateString(),
    newExpenseCategory: '1',
    expenses: [],
    budgetAllotments: [],
    newCategoryBudgetAmount: '',
    currentBudget: [],
    categories: [],
    income: ''
  }

  handleUpdateCurrentBudget = currentBudget => {
    this.setState({
      currentBudget
    })
  }

  createCurrentBudget = () => {
    const currentBudget = this.state.categories.map(cat => {
      let newCat = { ...cat }

      const matchedExpensesForCat = this.state.expenses.filter(
        exp => exp.category === cat.id
      )
      const initialValue = 0
      const totaledAmt = matchedExpensesForCat.reduce(
        (a, b) => parseInt(a) + parseInt(b.amount),
        initialValue
      )
      newCat.amountSpent = totaledAmt

      const matchedBudgetAllotmentForCat = this.state.budgetAllotments.find(
        allot => allot.category === cat.id
      )

      if (!matchedBudgetAllotmentForCat) {
        newCat.amountBudgeted = 0
      } else
        newCat.amountBudgeted = parseInt(matchedBudgetAllotmentForCat.amount)

      return newCat
    })
    this.setState({ currentBudget })
  }

  handleEnterCategory = newCategoryEntry => {
    this.setState({
      newCategoryEntry
    })
  }

  handleSubmitCategory = event => {
    event.preventDefault()

    const body = {
      category_name: this.state.newCategoryEntry
    }
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    }

    fetch(`${config.API_ENDPOINT}/categories`, options)
      .then(res => res.json())
      .then(cats =>
        this.setState({
          newCategoryEntry: ''
        })
      )
      .catch(error => console.log(error))
  }

  handleEnterExpenseDate = newExpenseDate => {
    this.setState({
      newExpenseDate
    })
  }

  handleEnterExpenseDescription = newExpenseDescription => {
    this.setState({
      newExpenseDescription
    })
  }

  handleEnterExpenseAmount = newExpenseAmount => {
    this.setState({
      newExpenseAmount: parseInt(newExpenseAmount)
    })
  }

  handleSelectExpenseCategory = newExpenseCategory => {
    this.setState({
      newExpenseCategory
    })
  }

  // need to createCurrentBudget again after setting state?
  handleSubmitExpense = event => {
    event.preventDefault()
    const body = {
      date: this.state.newExpenseDate,
      description: this.state.newExpenseDescription,
      amount: this.state.newExpenseAmount,
      category: this.state.newExpenseCategory
    }
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    }
    console.log(body)
    fetch(`${config.API_ENDPOINT}/expenses`, options)
      .then(res => res.json())
      .then(expenses =>
        this.setState({
          newExpenseDescription: '',
          newExpenseAmount: '',
          newExpenseDate: new Date().toLocaleDateString(),
          newExpenseCategory: ''
        })
      )
      .catch(error => console.log(error))
  }

  handleEnterCategoryAmount = (amount, id) => {
    const newCategoryAmountEntry = {
      id,
      amount: parseInt(amount)
    }
    this.setState({
      newCategoryAmountEntry
    })
  }
  // need to createCurrentBudget again after setting state?
  handleSubmitCategoryAmount = e => {
    e.preventDefault()

    const body = {
      id: this.state.newCategoryAmountEntry.id,
      amountBudgeted: this.state.newCategoryAmountEntry.amount
    }
    const options = {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    }

    fetch(`${config.API_ENDPOINT}/budget-allotments`, options)
      .then(res => res.json())
      .then(allotments =>
        this.setState({
          newCategoryAmountEntry: {}
        })
      )
      .catch(error => console.log(error))
  }

  handleEnterIncome = income => {
    this.setState({
      income
    })
  }

  handleSubmitIncome = event => {
    event.preventDefault()

    const body = {
      income: this.state.income
    }
    const options = {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    }

    fetch(`${config.API_ENDPOINT}/users`, options)
      .then(res => res.json())
      .then(cats =>
        this.setState({
          income: ''
        })
      )
      .catch(error => console.log(error))
  }

  componentDidMount() {
    const expensesPromise = fetch(`${config.API_ENDPOINT}/expenses`)

    const categoriesPromise = fetch(`${config.API_ENDPOINT}/categories`)

    const budgetAllotmentsPromise = fetch(
      `${config.API_ENDPOINT}/budget-allotments`
    )

    // const userId = ?from auth
    // const userInfoPromise = fetch(`${config.API_ENDPOINT}/user/${userId}`)

    Promise.all([expensesPromise, categoriesPromise, budgetAllotmentsPromise])
      .then(res => {
        const responses = res.map(response => response.json())
        return Promise.all(responses)
      })
      .then(([expenses, categories, budgetAllotments]) =>
        this.setState(
          {
            expenses,
            categories,
            budgetAllotments
          },
          () => this.createCurrentBudget()
        )
      )
  }

  render() {
    return (
      <div>
        <Router>
          <Nav />
          <header>
            <Link to="/">
              <h1>Change Jar</h1>
            </Link>
          </header>
          <main>
            <Route
              exact
              path="/"
              render={() => (
                <Budget budgetCategories={this.state.currentBudget} />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Expenses
                  enterExpenseDate={this.handleEnterExpenseDate}
                  enterExpenseDescription={this.handleEnterExpenseDescription}
                  enterExpenseAmount={this.handleEnterExpenseAmount}
                  selectExpenseCategory={this.handleSelectExpenseCategory}
                  submitExpense={this.handleSubmitExpense}
                  expenses={this.state.expenses}
                  newExpenseAmount={this.state.newExpenseAmount}
                  newExpenseDescription={this.state.newExpenseDescription}
                  newExpenseDate={this.state.newExpenseDate}
                  newExpenseCategory={this.state.newExpenseCategory}
                  categories={this.state.currentBudget}
                />
              )}
            />
            <Route
              path="/manage-categories"
              render={() => (
                <Manage
                  enterCategory={this.handleEnterCategory}
                  submitCategory={this.handleSubmitCategory}
                  newCategoryEntry={this.state.newCategoryEntry}
                  categories={this.state.currentBudget}
                  enterCategoryAmount={this.handleEnterCategoryAmount}
                  submitCategoryAmount={this.handleSubmitCategoryAmount}
                  newCategoryBudgetAmount={this.state.newCategoryBudgetAmount}
                  enterIncome={this.handleEnterIncome}
                  submitIncome={this.handleSubmitIncome}
                  income={this.state.income}
                />
              )}
            />
          </main>
        </Router>
      </div>
    )
  }
}

export default App
