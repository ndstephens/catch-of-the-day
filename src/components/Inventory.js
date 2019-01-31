import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'

import base, { firebaseApp } from '../base'
import Login from './Login'
import EditFishForm from './EditFishForm'
import AddFishForm from './AddFishForm'

class Inventory extends Component {
  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    //? Check if user is currently logged in when page loads
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()

    //* connect to the Authentication portion of our Firebase App
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  authHandler = async authData => {
    // console.log('authData: ', authData)

    //? 1. Look up the current store in the Firebase App database
    const store = await base.fetch(this.props.storeId, { context: this })
    // console.log('store:', store)
    //? 2. Claim it if there is no owner
    if (!store.owner) {
      // Save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      })
    }
    //? 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({ uid: null, owner: null })
  }

  //
  //

  render() {
    //? Logout button used in two spots so create it separately here
    const logout = <button onClick={this.logout}>Log Out!</button>

    //? 1. Check if they are not logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    //? 2. Check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      )
    }
    //? 3. They must be the owner and logged in, so render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  addFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  storeId: PropTypes.string,
}

export default Inventory
