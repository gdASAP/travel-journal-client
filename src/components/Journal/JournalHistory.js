import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { showOrder } from './../../api/order'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
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

  handleDestroy = () => {
    console.log('this.journal', this.state.journal)
    axios({
      url: `${apiUrl}/journal/${this.state.journal._id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          isDeleted: true
        })
      })
      .catch(console.error)
  }

  render () {
    const journals = this.state.journals.map(entry => (
      <li key={entry._id}>
        <Link to={{
          pathname: `/journal/${entry._id}`,
          journalProps: {
            journalID: `${entry._id}`
          }
        }} >{entry.title}</Link>
      </li>
    ))
    // { _id, title, location, food, lodging, activities, learnings, loves }) => (
    // <div key={_id}>
    //   <h5>ID: {_id}</h5>
    //   <h5>Title: {title}</h5>
    //   <h5>Location: {location}</h5>
    //   <Button onClick={this.handleDestroy} variant="primary">Delete</Button>
    // </div>
    //   ))}
    // </ol>
    // <Button variant="primary">Edit</Button>

    return (
      <div>
        <h1> Journal History </h1>
        <ul>
          {journals}
        </ul>
      </div>
    )
  }
}

export default JournalHistory
