import React, { Component } from "react"

export default class CurrentMonthBudget extends Component {
    static defaultProps = {
        categories: [],
        currentBudget: []
    }

    getCategoryAmount(id) {
        const category = this.props.currentBudget.find(cat => cat.id === id)
        return category ? category.amount : null
    }

    render() {
        const { categories } = this.props
        const displayCategories = categories.map((cat, i) => {
            return <li key={i}>{cat.name} |
                <form onSubmit={e => this.props.submitCategoryAmount(e)}>
                    <input type="text" onChange={e => this.props.enterCategoryAmount(e.target.value, cat.id)} />
                    <button type="submit">Enter</button>
                </form>
                {this.getCategoryAmount(cat.id)}
            </li>
        })
        const amountArr = []
        this.props.currentBudget.forEach(cat => amountArr.push(cat.amount))
        const budgeted = amountArr.length > 0 ? amountArr.reduce((a, b) => parseInt(a) + parseInt(b)) : 0
        const left = this.props.income - budgeted
        return (
            <section>
                <h2>{`Current Month's Total Budget: ${this.props.income}`}</h2>
                <form onSubmit={e => this.props.submitIncome(e)}>
                    <label>How much money will you make this month?
                    <input type="text" onChange={e => this.props.enterIncome(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <h2>Your Budget Categories</h2>
                <h3>{`Amount Budgeted: ${budgeted} | Amount Left to Budget: ${left}`}</h3>
                <ul>
                    <li></li>
                    {displayCategories}
                </ul>

            </section>
        );
    }
}