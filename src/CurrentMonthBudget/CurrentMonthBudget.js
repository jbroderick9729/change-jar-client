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
            { category_id: 1, category_name: 'Mortgage', amount: '500', created_at: new Date(June 13 2019), modified_at: new Date(June 13 2019)}
        ],
        newCategoryBudget: {}
    }

    handleCategoryAmount(amount, id) {
        const catObj = this.state.currentBudget.find(cat => cat.category_id === id)
        catObj.amount = amount
        this.setState({
            newCategoryBudget: catObj
        })
    }

    submitCategoryAmount = (e) => {
        e.preventDefault()
        const { currentBudget, newCategoryBudget } = this.state
        const omittedChangedCategory = currentBudget.filter(cat => cat.category_id !== newCategoryBudget.category_id)
        const newBudget = [{...omittedChangedCategory}, newCategoryBudget]
        this.setState({
            currentBudget: newBudget
            newCategoryBudget: {}
        })
    }

    render() {
        const displayCategories = this.state.currentBudget.map(cat => (
            <BudgetCategory
                handleCategoryAmount={this.handleCategoryAmount}
                submitCategoryAmount={this.submitAmount}
                {...cat}
            />
        ))
        const budgeted = this.state.currentBudget.reduce((a, b) => a + b.amount)
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
                            value={this.state.newCategoryBudget.amount}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <hr />
                <h2>Your Budget Categories</h2>
                <h3>{`Amount Budgeted: ${budgeted} | Amount Left to Budget: ${left}`}</h3>
                <ul>{displayCategories}</ul>
            </section>
        )
    }
}
