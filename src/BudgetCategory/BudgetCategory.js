import React, { Component } from 'react'

export default class BudgetCategory extends Component {
  state = {
    edtiMode: false
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    return (
      <tr key={this.props.id}>
        <td>{this.props.category_name}</td>
        <td>{this.props.amountSpent}</td>
        <td>{this.props.amountBudgeted}</td>
        {this.state.editMode ? (
          <td>
            <form onSubmit={e => {
              this.toggleEditMode()
              this.props.submitCategoryAmount(e)
            }}>
              <label>Enter amount...</label>
              <input
                type="text"
                onChange={e =>
                  this.props.enterCategoryAmount(
                    e.target.value,
                    this.props.id
                  )
                }
              />
              <button type="submit">Save</button>
            </form>
          </td>
        ) : (
            <td>
              <button onClick={() => this.toggleEditMode()}>Edit</button>
            </td>
          )}
      </tr>
    )
  }
}


