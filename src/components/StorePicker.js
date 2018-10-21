import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  myInput = React.createRef()

  // create as a property set to an arrow function to help bind 'this' to the instance of the class.  using a method will unbind 'this' from the instance.
  goToStore = e => {
    // 1. Stop the form from submitting
    e.preventDefault()
    // 2. get the text from that input
    const storeName = this.myInput.value.value
    // 3. change the page to '/store/<whatever-they-entered>'
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker
