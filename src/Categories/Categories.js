import React, { Component } from "react";

export default class Categories extends Component {
    static defaultProps = {
        categories: []
    }

    render() {
        const { categories } = this.props;
        const newCategories = categories.filter(cat => cat.name !== "Pick a category");

        const categoriesList = newCategories.map(category => {
            return (
                <li key={category.id} value={this.props.newCategory.name}>
                    {category.name}
                </li>
            );
        });

        return (
            <section>
                <header>
                    <h2>Budget Categories</h2>
                </header>
                <form onSubmit={e => this.props.submitCategory(e)}>
                    <label>
                        Enter a new category:
                        <input
                            type="text"
                            placeholder="Mortgage, Rent, Groceries ..."
                            onChange={e => this.props.enterCategory(e.target.value)}
                            value={this.props.newCategory.name}
                        />
                    </label>
                    <input type="submit" value="Enter" />
                </form>
                <div>
                    <h3>Your budget categories</h3>
                    <ul>{categoriesList}</ul>
                </div>
            </section>
        );
    }
}