import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cuid from 'cuid'
import "./App.css";
import Categories from "../Categories/Categories"
import Expenses from "../Expenses/Expenses"
import CurrentMonthBudget from "../CurrentMonthBudget/CurrentMonthBudget"


class App extends Component {
  state = {
    newCategory: {},
    categories: [{ id: 1, name: "Mortgage" }, { id: 2, name: "Groceries" }],
    newExpenseDescription: "",
    newExpenseAmount: "",
    expenses: [],
    newIncome: "",
    income: "",
    currentBudget: [{ id: 1, amount: "500" }],
    newCategoryEntry: {}
  };

  handleEnterCategory = name => {
    const id = cuid();
    this.setState({
      newCategory: { id, name }
    })
  }

  handleSubmitCategory = event => {
    event.preventDefault()
    this.setState({
      categories: [...this.state.categories, this.state.newCategory],
      newCategory: {},
    })
  }

  handleEnterExpenseDescription = newExpenseDescription => {
    this.setState({
      newExpenseDescription
    });
  };

  handleEnterExpenseAmount = newExpenseAmount => {
    this.setState({
      newExpenseAmount
    });
  };

  handleSubmitExpense = event => {
    event.preventDefault()
    this.setState({
      expenses: [...this.state.expenses, { amount: this.state.newExpenseAmount, description: this.state.newExpenseDescription }],
      newExpenseAmount: "",
      newExpenseDescription: ""
    });
  };

  handleEnterIncome = newIncome => {
    this.setState({
      newIncome
    })
  }

  handleSubmitIncome = event => {
    event.preventDefault()
    this.setState({
      income: this.state.newIncome,
      newIncome: "",
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

  handleSubmitCategoryAmount = (e) => {
    e.preventDefault()
    const omitExistingCategoryObj = this.state.currentBudget.filter(cat => cat.id !== this.state.newCategoryEntry.id)
    this.setState({
      currentBudget: [...omitExistingCategoryObj, this.state.newCategoryEntry]
    })
  }


  render() {
    const { categories, expenses } = this.state
    const date = new Date()
    return (
      <div className="App">
        <Router><header className="main-header">
          <Link to='/'><h1>{`Change Jar | ${date.toDateString()}`}</h1></Link>
        </header>
          <main>
            <section>
              <Categories enterCategory={this.handleEnterCategory} submitCategory={this.handleSubmitCategory} categories={categories} newCategory={this.state.newCategory} />
            </section>
            <hr />
            <section>
              <Expenses enterExpenseDescription={this.handleEnterExpenseDescription} enterExpenseAmount={this.handleEnterExpenseAmount} submitExpense={this.handleSubmitExpense} expenses={expenses} newExpenseAmount={this.state.newExpenseAmount} newExpenseDescription={this.state.newExpenseDescription} />
            </section>
            <hr />
            <CurrentMonthBudget categories={categories} income={this.state.income} newIncome={this.state.newIncome} submitIncome={this.handleSubmitIncome} enterIncome={this.handleEnterIncome} enterCategoryAmount={this.handleEnterCategoryAmount} submitCategoryAmount={this.handleSubmitCategoryAmount} currentBudget={this.state.currentBudget} />
            <hr />
          </main>
        </Router>
      </div>
    );
  }
}

export default App;