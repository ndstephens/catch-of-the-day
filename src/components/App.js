import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends Component {
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    const { params } = this.props.match
    // reinstate order state from localStorage
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    // reinstate fishes state from Firebase database
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  // Any function that needs to update state (and state, in this app, lives at the root of the app, App.js) needs to live in the same component where state lives (ie 'addFish' and 'loadSampleFishes')

  addFish = fish => {
    // 1. take a copy of the existing state (so as to not mutate the original)
    const fishes = { ...this.state.fishes }
    // 2. add our new fish to that 'fishes' object
    fishes[`fish${Date.now()}`] = fish
    // 3. set the new 'fishes' object state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state (of fishes)
    const fishes = { ...this.state.fishes }
    // 2. update that state
    fishes[key] = updatedFish
    // 3. set that to state
    this.setState({ fishes })
  }

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes }
    // 2. update the state (in order to delete an item in Firebase it must be set to 'null')
    fishes[key] = null
    // 3. update state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order }
    // 2. either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1
    // 3. call 'setState' to update our state object
    this.setState({ order })
  }

  removeFromOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order }
    // 2. remove that item from order (here we can use 'delete' b/c it is stored in localStorage...unlike fishes which needed to be set to 'null' b/c that's what Firebase requires)
    delete order[key]
    // 3. call 'setState' to update our state object
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App
