import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { showOrder } from './../../api/order'
// import Button from 'react-bootstrap/Button'
import { showHistory } from './../../api/journalAPI'
// import messages from '../AutoDismissAlert/messages'

class JournalHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journals: [],
      isDeleted: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    // console.log('props', this.props)
    showHistory(user)
      .then(response => {
        // console.log(response)
        this.setState({
          journals: response.data.entries
        })
      })
      .then('this.journals', this.state.journals)
      .catch(console.error)
  }

  render () {
    const journals = this.state.journals.map(entry => (
      <div key={entry._id}>
        <Link to={{
          pathname: `/journal/${entry._id}`,
          journalProps: {
            journalID: `${entry._id}`
          }
        }} >{entry.title}</Link>
        <img src={entry.image} />
        <p>{entry.location}</p>
      </div>
    ))

    return (
      <div>
        <h1> Journal History </h1>
        {journals}
      </div>
    )
  }
}

export default JournalHistory
