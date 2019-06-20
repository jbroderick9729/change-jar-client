import React, { Component } from 'react'

export default class BudgetCategory extends Component {
  state = {
    edtiMode: false
  }

  toggleEditMode = () => {
    console.log('toggleEditMode ran')
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    return (
      <tr key={this.props.category_id}>
        <td>
          <button>X</button>
        </td>
        <td>{this.props.category_name}</td>
        <td>{this.props.amountBudgeted}</td>
        <td>{this.props.amountSpent}</td>
        {this.state.editMode ? (
          <td>
            <form onSubmit={e => this.props.submitCategoryAmount(e)}>
              <label>Enter amount...</label>
              <input
                type="text"
                onChange={e =>
                  this.props.enterCategoryAmount(
                    e.target.value,
                    this.props.category_id
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

//1
//Value is 0, field is disabled, there's an edit button
//on click edit, field is enabled button changes to save
//on save, button turns back to edit, field is disabled

//2
//if 0 is budgeted, something better (onboarding)

// render() {
//   return (
//     <li key={this.props.category_id}>
//       <form onSubmit={e => this.props.submitCategoryAmount(e)}>
//         <label>{this.props.category_name}</label>
//         <input
//           type="text"
//           disabled={!this.state.editMode}
//           onChange={e =>
//             this.props.enterCategoryAmount(e.target.value, this.props.category_id)
//           }
//         />
//         {this.state.editMode ? (
//           <button type="submit">
//             Save
//           </button>
//         ) : (
//             <button onClick={() => this.toggleEditMode()}>Edit</button>
//           )}
//       </form>
//       {`${this.props.amountSpent} spent out of ${this.props.amountBudgeted}`}
//     </li>
//   )
// }
