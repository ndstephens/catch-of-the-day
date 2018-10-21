import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends Component {
  state = {
    fishes: {},
    order: {},
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

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} details={this.state.fishes[key]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  }
}

export default App
