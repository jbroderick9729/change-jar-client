import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import cuid from 'cuid'
import './App.css'
import Nav from '../Nav/Nav'
import Manage from '../Manage/Manage'
import Expenses from '../Expenses/Expenses'
import Budget from '../Budget/Budget'

class App extends Component {
  state = {
    newCategoryEntry: '',
    newCategoryAmountEntry: {},
    newExpenseDescription: '',
    newExpenseAmount: '',
    newExpenseDate: new Date().toLocaleDateString(),
    newExpenseCategory: 'Mortgage',
    expenses: [],
    newCategoryBudgetAmount: '',
    currentBudget: {
      budget_id: 1,
      budget_name: 'June 2019',
      created_at: new Date('June 01 2019'),
      last_modified: new Date('June 01 2019'),
      categories: [
        {
          category_id: 1,
          category_name: 'first',
          amountBudgeted: 0,
          amountSpent: 0
        },
        {
          category_id: 3,
          category_name: 'third',
          amountBudgeted: 0,
          amountSpent: 0
        },
        {
          category_id: 4,
          category_name: 'fourth',
          amountBudgeted: 0,
          amountSpent: 0
        },
        {
          category_id: 2,
          category_name: 'second',
          amountBudgeted: 0,
          amountSpent: 0
        }
      ]
    }
  }

  handleEnterCategory = newCategoryEntry => {
    this.setState({
      newCategoryEntry
    })
  }

  handleSubmitCategory = event => {
    event.preventDefault()
    const count = this.state.currentBudget.categories.length
    const category_id = count + 1
    const currentCats = this.state.currentBudget.categories
    const newCat = {
      category_id,
      category_name: this.state.newCategoryEntry,
      amountBudgeted: 0,
      amountSpent: 0
    }
    const newCats = [...currentCats, newCat]
    const newBudget = { ...this.state.currentBudget }
    newBudget.categories = newCats.sort((a, b) => {
      if (a.category_id < b.category_id) {
        return -1;
      }
      if (a.category_id > b.category_id) {
        return 1;
      }
      return 0;
    })

    this.setState({
      currentBudget: newBudget,
      newCategoryEntry: ''
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
      newExpenseAmount: parseInt(newExpenseAmount)
    })
  }

  handleSelectExpenseCategory = newExpenseCategory => {
    this.setState({
      newExpenseCategory
    })
  }

  handleSubmitExpense = event => {
    event.preventDefault()
    const cat = this.state.currentBudget.categories.find(
      cat => cat.category_name === this.state.newExpenseCategory
    )
    const catId = cat.category_id

    const expense_id = cuid()
    const newExpense = {
      expense_id,
      date: this.state.newExpenseDate,
      description: this.state.newExpenseDescription,
      amount: this.state.newExpenseAmount,
      category: this.state.newExpenseCategory,
      category_id: catId,
      created_at: Date.now(),
      last_modified: Date.now()
    }
    this.setState(
      {
        expenses: [...this.state.expenses, newExpense],
        newExpenseAmount: '',
        newExpenseDescription: '',
        newExpenseDate: new Date().toLocaleDateString()
      },
      () => this.updateBudgetWithExpenses(newExpense)
    )
  }


  updateBudgetWithExpenses = newExpense => {
    const currentCats = this.state.currentBudget.categories

    const catToChange = currentCats.find(
      cat => cat.category_id === newExpense.category_id
    )
    const restOfCats = currentCats.filter(
      cat => cat.category_id !== newExpense.category_id
    )

    catToChange.amountSpent += newExpense.amount

    const updatedCats = [...restOfCats, catToChange]

    const { currentBudget } = this.state
    currentBudget.categories = updatedCats.sort((a, b) => {
      if (a.category_id < b.category_id) {
        return -1;
      }
      if (a.category_id > b.category_id) {
        return 1;
      }
      return 0;
    })

    this.setState({
      currentBudget
    })
  }

  handleEnterCategoryAmount = (amount, id) => {
    console.log(this.state.currentBudget.categories)
    const newCategoryAmountEntry = {
      id,
      amount: parseInt(amount)
    }
    this.setState({
      newCategoryAmountEntry
    })
  }

  handleSubmitCategoryAmount = e => {
    console.log(this.state.currentBudget.categories)
    e.preventDefault()
    console.log('handleSubmitCategoryAmount ran')

    const catToChange = this.state.newCategoryAmountEntry
    this.setState(
      {
        newCategoryAmountEntry: {}
      },
      () => this.updateBudgetWithCategoryAmount(catToChange)
    )
  }

  updateBudgetWithCategoryAmount = category => {
    const currentCats = this.state.currentBudget.categories

    const catToChange = currentCats.find(cat => cat.category_id === category.id)

    const restOfCats = currentCats.filter(
      cat => cat.category_id !== category.id
    )
    catToChange.amountBudgeted = parseInt(category.amount)
    const updatedCats = [...restOfCats, catToChange]

    const { currentBudget } = this.state
    currentBudget.categories = updatedCats.sort((a, b) => {
      if (a.category_id < b.category_id) {
        return -1;
      }
      if (a.category_id > b.category_id) {
        return 1;
      }
      return 0;
    })

    this.setState({
      currentBudget
    })
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
                <Budget
                  budgetCategories={this.state.currentBudget.categories}
                />
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
                  categories={this.state.currentBudget.categories}
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
                  categories={this.state.currentBudget.categories}
                  enterCategoryAmount={this.handleEnterCategoryAmount}
                  submitCategoryAmount={this.handleSubmitCategoryAmount}
                  newCategoryBudgetAmount={this.state.newCategoryBudgetAmount}
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
