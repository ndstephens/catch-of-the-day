import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Fish from './Fish'
import Order from './Order'
import Inventory from './Inventory'

import base from '../base'
import sampleFishes from '../sample-fishes'

class App extends Component {
  state = {
    fishes: {},
    order: {},
  }

  //? LIFECYCLE METHODS

  componentDidMount() {
    const { storeId } = this.props.match.params

    //* reinstate FISHES STATE from Firebase database
    //* ASYNCHRONOUS!!
    this.firebaseRef = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })

    //* reinstate ORDER STATE from localStorage
    //* SYNCHRONOUS
    const localStorageRef = localStorage.getItem(storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
  }

  componentDidUpdate() {
    //* every time state is updated (in particular from updating the 'order' property in state by either adding or deleting items from the order object), update/sync order in localStorage (keyed with the specific store id)
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order),
    )
  }

  componentWillUnmount() {
    //* every time you leave the store (by going to a url other than 'baseURl/store/<store-name>') you un-mount this component
    //* must remove the binding between this component's state and the Firebase database to prevent a memory leak
    //* it will rebind and resync when you revisit the same store/url
    base.removeBinding(this.firebaseRef)
  }

  //
  //? CUSTOM FUNCTIONS THAT UPDATE STATE
  //? Any function that updates a component's state must live in the same component where state lives

  //? ------ FISHES ------

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addFish = fish => {
    this.setState({
      fishes: { ...this.state.fishes, [`fish${Date.now()}`]: fish },
    })
  }

  updateFish = (key, updatedFish) => {
    this.setState({ fishes: { ...this.state.fishes, [key]: updatedFish } })
  }

  deleteFish = key => {
    //* in order to delete an item in Firebase it must be set to 'null'
    this.setState({ fishes: { ...this.state.fishes, [key]: null } })
  }

  //? ------ ORDER ------

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
    //* 2. remove that item from order (here we can use 'delete' b/c it is saved in localStorage...unlike fishes which needed to be set to 'null' b/c that's what Firebase requires)
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
            {/*//* Must convert the object into an array for looping */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                fish={this.state.fishes[key]}
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

App.propTypes = {
  match: PropTypes.object,
}

export default App
