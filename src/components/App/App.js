import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import JournalHistory from '../Journal/JournalHistory'
import Journal from '../Journal/Journal'
import JournalCreate from '../Journal/JournalCreate'
// import JournalHistory from '../Journal/Journal'
// import Journal from '../Journal/Journal'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      id: ''
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <div className='app-background'>
          <Header user={user} />
          {msgAlerts.map((msgAlert, index) => (
            <AutoDismissAlert
              key={index}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
            />
          ))}
          <main className="container">
            <Route path='/sign-up' render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />

            <Route user={user} exact path='/' render={() => (
              <div>
                <h1 className='splash-page'> RELIVE </h1>
              </div>
            )} />

            <Route exact path='/journal-history' render={() => (
              <JournalHistory
                user={user}
                msgAlert={this.msgAlert} />
            )} />

            <Route exact path='/create-journal' render={() => (
              <JournalCreate
                user={user}
                msgAlert={this.msgAlert} />
            )} />

            <Route exact path='/journal/:id' render={(props) => (
              <Journal
                user={user}
                msgAlert={this.msgAlert}
                journalID={this.props.location.journalProps}/>
            )} />
          </main>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(App)
