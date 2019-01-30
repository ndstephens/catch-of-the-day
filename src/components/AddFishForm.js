import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddFishForm extends Component {
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  createFish = e => {
    // 1. stop form from submitting
    e.preventDefault()

    const fish = {
      name: this.nameRef.value.value,
      price: parseInt(this.priceRef.value.value, 10),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    }
    // App -> Inventory -> here
    this.props.addFish(fish)

    //* Clear all values in the form's elements ('e.currentTarget' is the form element itself since the submit event ('e') came from the form element, and all form elements have a reset() method on them)
    e.currentTarget.reset()
  }

  render() {
    return (
      //? Must be a form so that we can 'submit' it
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: PropTypes.func,
}

export default AddFishForm
