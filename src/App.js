import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';

import { setCurrentUser } from './redux/user/user.actions'

import HomePage from './pages/homepage/HomePage'
import ShopPage from './pages/shop/ShopPage'
import Header from './components/header/Header'
import SignInSignUpPage from './pages/sign-in-and-sign-up/SignInSignUpPage'

import { auth, createUserProfileDocument } from './firebase/firebase'

class App extends React.Component {
  unsubscrubeFromAuth = null
  
  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscrubeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            }
          )
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscrubeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
