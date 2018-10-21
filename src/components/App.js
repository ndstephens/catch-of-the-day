import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends Component {
  state = {
    fishes: {},
    order: {},
  }

  addFish = fish => {
    // 1. take a copy of the existing state (so as to not mutate the original)
    const fishes = { ...this.state.fishes }
    // 2. add our new fish to that 'fishes' object
    fishes[`fish${Date.now()}`] = fish
    // 3. set the new 'fishes' object state
    this.setState({ fishes })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App
