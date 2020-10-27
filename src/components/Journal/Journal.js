import React, { Component } from 'react'
// import { showOrder } from './../../api/order'
// import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import apiUrl from './../../apiConfig'
import { showHistory } from './../../api/journal'
// import messages from '../AutoDismissAlert/messages'

class JournalHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      location: '',
      food: '',
      lodging: '',
      activities: '',
      learnings: '',
      loves: '',
      journal: []
    }
  }

  componentDidMount () {
    const user = this.props.user
    showHistory(user)
      .then(response => {
        console.log(response)
        this.setState({
          journal: response.data.entries
        })
      })
      .catch(console.error)
  }

  render () {
    const { journal } = this.state
    const jsx =
    <ol>
      {journal.map(({ title, location, food, lodging, activities, learnings, loves }) => (
        <div key={title}>
          <h5>Title: {title}</h5>
          <h5>Location: {location}</h5>
        </div>
      ))}
    </ol>
    // <Button variant="primary">Edit</Button>

    return (
      <div>
        <h1> Journal History </h1>
        {jsx}
      </div>
    )
  }
}

export default JournalHistory
