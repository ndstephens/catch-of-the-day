import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends Component {
  handleChange = e => {
    //* Take a copy of the current fish (object spread), use computed properties to use the 'name' attribute of the currentTarget (field being clicked on) which will match equivalent object key whose value you're looking to update, replace its value with the value the user changed in the UI
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value,
    }
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    const { name, price, status, desc, image } = this.props.fish
    //* 'this.props.fish' is coming from App's 'state.fishes' passed through the Inventory component
    //* 'this.handleChange' calls 'this.props.updateFish' which also comes from the App component and updates App's 'state.fishes'

    return (
      //? Does NOT need to be a <form> element since we aren't submitting it.  All changes are synced to state (and Firebase) on every 'change/keyup' event
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={price}
        />
        <select name="status" onChange={this.handleChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={desc} />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    )
  }
}

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  index: PropTypes.string,
  updateFish: PropTypes.func,
}

export default EditFishForm
