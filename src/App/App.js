import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import cuid from 'cuid'
import './App.css'
import Sidebar from '../Sidebar/Sidebar'
import Categories from '../Categories/Categories'
import Expenses from '../Expenses/Expenses'
import Budget from '../Budget/Budget'
import CurrentMonthBudget from '../EditBudget/EditBudget'

class App extends Component {
  state = {
    newCategory: {},
    newExpenseDescription: '',
    newExpenseAmount: '',
    newExpenseDate: '',
    newExpenseCategory: ''
    expenses: [],
    newIncome: '',
    income: '',
    currentBudget: {
      budget_id: 1,
      budget_name: 'June 2019',
      created_at: new Date('June 01 2019'),
      last_modified: new Date('June 01 2019'),
      categories: [
        {
          category_id: 1,
          category_name: 'Mortgage',
          amountBudgeted: 600,
          amountSpent: 600
        }
      ]
    },
    newCategoryEntry: ''
  }

  handleEnterCategory = newCategoryEntry => {
    this.setState({
      newCategoryEntry
    })
  }

  handleSubmitCategory = event => {
    event.preventDefault()
    const category_id = cuid()
    const currentCats = this.state.currentBudget.categories
    const newCat = {
      category_id,
      category_name: this.state.newCategoryEntry,
      amountBudgeted: 0,
      amountSpent: 0
    }
    const newCats = [...currentCats, newCat]
    const newBudget = { ...this.state.currentBudget }
    newBudget.categories = newCats
    this.setState({
      currentBudget: newBudget
    })
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
      newExpenseAmount
    })
  }

  handleSelectExpenseCategory = newExpenseCategory => {
    this.setState({
      newExpenseCategory
    })
  }

  handleSubmitExpense = event => {
    event.preventDefault()
    const expense_id = cuid()
    const newExpense = {
      expense_id,
      date: this.state.newExpenseDate,
      description: this.state.newExpenseDescription,
      amount: this.state.newExpenseAmount,
      category: this.state.newExpenseCategory
      created_at: Date.now(),
      last_modified: Date.now()
    }
    this.setState({
      expenses: [...this.state.expenses, newExpense],
      newExpenseAmount: '',
      newExpenseDescription: '',
      newExpenseDate: ''
    }, () => this.updateBudgetWithExpenses)
  }
  
  updateBudgetWithExpenses = () => {
    //can either set new expense in expenses in state but also
    // find that budget cat in budget and update there to
    // or
    // have a func that iterates through all expenses, retotal,
  }// then a func that updates budget based on all expenses


  handleEnterIncome = newIncome => {
    this.setState({
      newIncome
    })
  }

  handleSubmitIncome = event => {
    event.preventDefault()
    this.setState({
      income: this.state.newIncome,
      newIncome: ''
    })
  }

  handleEnterCategoryAmount = (amount, id) => {
    const newCategoryEntry = {
      id,
      amount
    }
    this.setState({
      newCategoryEntry
    })
  }

  handleSubmitCategoryAmount = e => {
    e.preventDefault()
    const omitExistingCategoryObj = this.state.currentBudget.filter(
      cat => cat.id !== this.state.newCategoryEntry.id
    )
    this.setState({
      currentBudget: [...omitExistingCategoryObj, this.state.newCategoryEntry]
    })
  }

  render() {
    return (
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Change Jar</h1>
            </Link>
          </header>
          <div className="container">
            <Sidebar />
            <main>
              <Route
                exact
                path="/"
                render={() => <Budget budget={this.state.currentBudget} />}
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
                    categories={this.state.currentBudget.categories}
                  />
                )}
              />
              <Route
                path="/manage-categories"
                render={() => (
                  <Categories
                    enterCategory={this.handleEnterCategory}
                    submitCategory={this.handleSubmitCategory}
                    newCategory={this.state.newCategory}
                  />
                )}
              />
            </main>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
