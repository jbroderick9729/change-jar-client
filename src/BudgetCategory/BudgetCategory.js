import React, { Component } from 'react'

export default class BudgetCategory extends Component {
  state = {
    edtiMode: false
  }

  toggleEditMode = () => this.setState({ editMode: !this.state.editMode })

  render() {
    return (
      <li key={this.props.category_id}>
        <form onSubmit={e => props.submitCategoryAmount(e)}>
          <label>{props.category_name}</label>
          <input
            type="text"
            disabled={!this.state.editMode}
            onChange={e =>
              props.enterCategoryAmount(e.target.value, props.category_id)
            }
          />
          {this.state.editMode ? (
            <button onClick={this.toggleEditMode} type="submit">
              Save
            </button>
          ) : (
            <button onClick={this.toggleEditMode}>Edit</button>
          )}
        </form>
        {`${props.amountSpent} spent out of ${props.amountBudgeted}`}
      </li>
    )
  }
}

//1
//Value is 0, field is disabled, there's an edit button
//on click edit, field is enabled button changes to save
//on save, button turns back to edit, field is disabled

//2
//if 0 is budgeted, something better (onboarding)
