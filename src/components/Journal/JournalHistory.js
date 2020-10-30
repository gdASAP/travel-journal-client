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
    const reverse = this.state.journals.reverse()
    const journals = reverse.map(entry => (
      <div key={entry._id}>
        <Link to={{
          pathname: `/journal/${entry._id}`,
          journalProps: {
            journalID: `${entry._id}`
          }
        }} >{entry.title} in {entry.location}</Link>
        <img src={entry.image} alt={entry.title} className='history-image'/>
      </div>
    ))

    return (
      <div>
        <h1 className='page-header'> Journal History </h1>
        <div className='container-cr'>
          <div className='row'>
            <div className='history-view'>
              {journals}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JournalHistory
