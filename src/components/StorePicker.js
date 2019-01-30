import React from 'react'
import PropTypes from 'prop-types'

import { slugify } from '../helpers'

class StorePicker extends React.Component {
  myInput = React.createRef()

  goToStore = e => {
    // 1. Stop the form from submitting
    e.preventDefault()
    // 2. get the text from that input
    const storeName = slugify(this.myInput.value.value)
    // 3. change the page to '/store/<whatever-they-entered>'
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          ref={this.myInput}
          type="text"
          required
          placeholder="Provide a Store Name"
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

StorePicker.propTypes = {
  history: PropTypes.object,
}

export default StorePicker
