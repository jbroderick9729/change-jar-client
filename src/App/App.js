import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Nav from '../Nav/Nav'
import Manage from '../Manage/Manage'
import Expenses from '../Expenses/Expenses'
import Budget from '../Budget/Budget'
import Register from '../Register/Register'
import Login from '../Login/Login'
import config from '../config'
// import AuthApiService from '../Auth/AuthApiService';
import TokenService from '../Auth/TokenService'

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
    income: '',
    user: {},
  }

  createCurrentBudget = (expenses, categories, budgetAllotments, user) => {

    const currentBudget = categories.length ? categories.map(cat => {
      let newCat = { ...cat }

      const matchedExpensesForCat = expenses.filter(
        exp => exp.category === cat.id
      )
      const initialValue = 0
      const totaledAmt = matchedExpensesForCat.reduce(
        (a, b) => parseInt(a) + parseInt(b.amount),
        initialValue
      )
      newCat.amountSpent = totaledAmt

      const matchedBudgetAllotmentForCat = budgetAllotments.filter(
        allot => allot.category === cat.id
      )

      if (matchedBudgetAllotmentForCat.length === 0) {
        newCat.amountBudgeted = 0
      } else {
        matchedBudgetAllotmentForCat.sort((a, b) => a.id > b.id ? -1 : 1)
        newCat.amountBudgeted = matchedBudgetAllotmentForCat[0].amount
      }

      return newCat
    }) : null
    this.setState({ currentBudget, expenses, categories, budgetAllotments, user: user[0] })
  }

  // ---- new category form ----
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
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
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

  // ---- new expense form ----
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
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body)
    }
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

  // ---- new budget allocation form ----
  handleEnterCategoryAmount = (amount, id) => {
    const newCategoryAmountEntry = {
      id,
      amount
    }
    this.setState({
      newCategoryAmountEntry
    })
  }
  // need to createCurrentBudget again after setting state?
  handleSubmitCategoryAmount = e => {
    e.preventDefault()

    const body = {
      category: this.state.newCategoryAmountEntry.id,
      amount: this.state.newCategoryAmountEntry.amount
    }

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
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

  // ---- updated user form (currently only entering or updating income) ----
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
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
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

  render() {
    return (
      <div>
        <Router>
          <Nav />
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
                  createCurrentBudget={this.createCurrentBudget}
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
                  user={this.state.user}
                  createCurrentBudget={this.createCurrentBudget}
                />
              )}
            />
            <Route
              path="/register"
              render={({ history }) => (
                <Register
                  enterFirstName={this.handleEnterFirstName}
                  enterLastName={this.handleEnterLastName}
                  enterUsername={this.handleEnterUsername}
                  enterPassword={this.handleEnterPassword}
                  submitRegistration={this.handleSubmitRegistration}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  username={this.state.username}
                  password={this.state.password}
                  history={history}
                />
              )}
            />
            <Route
              path="/login"
              render={({ history }) => (
                <Login history={history} />)}
            />
          </main>
        </Router>
      </div>
    )
  }
}

export default App
