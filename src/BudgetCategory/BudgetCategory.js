import React, { Component } from 'react'

export default class BudgetCategory extends Component {
  state = {
    edtiMode: false
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  formatDollarAmount = (num) => {
    const amount = parseInt(num)
    return amount.toFixed(2)
  }

  render() {
    return (
      <tr key={this.props.id}>
        <td>{this.props.category_name}</td>
        <td>${this.formatDollarAmount(this.props.amountSpent)}</td>
        <td>${this.formatDollarAmount(this.props.amountBudgeted)}</td>
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


