import React, { Component } from 'react'
// import { showOrder } from './../../api/order'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// import { showHistory } from './../../api/journalAPI'
// import messages from '../AutoDismissAlert/messages'
// import JournalForm from './JournalForm'

class JournalCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {
        title: '',
        location: '',
        food: '',
        lodging: '',
        activities: '',
        learnings: '',
        loves: ''
      },
      createdJournalId: null
    }
  }

  // componentDidMount () {
  //   const user = this.props.user
  //   showHistory(user)
  //     .then(response => {
  //       console.log(response)
  //       this.setState({
  //         journal: response.data.entries
  //       })
  //     })
  //     .catch(console.error)
  // }

  handleChange = (event) => {
    event.persist()
    //  const { title } = this.state
    // const title = target.title
    // const location = target.location
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const newJournal = Object.assign({}, prevState.journal, updatedField)
      // console.log(newJournal)
      return { journal: newJournal }
    })
    // console.log('journal', this.state.journal)
  }

  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    // console.log('token', this.props.user.token)
    // console.log('journal', this.state.journal)
    // console.log('owner', this.props.user)
    axios({
      url: `${apiUrl}/journal`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { entry: this.state.journal },
      owner: this.props.user
    })
      .then(res => this.setState({ createdJournalId: res.data.entry._id }))
      .then(() => {
        this.setState({ title: '', location: '', food: '' })
      })
      .then(() => msgAlert({
        heading: 'Journal Entry Created',
        message: messages.journalCreated,
        variant: 'success'
      }))
      .catch(console.error)
  }
  render () {
    const { handleChange, handleSubmit } = this
    const { createdJournalId, journal } = this.state

    if (createdJournalId) {
      // console.log('journal created')
    }
    // const jsx =
    //   <div key={title}>
    //       <h5>Title: {title}</h5>
    //       <h5>Location: {location}</h5>
    //     </div>
    //   ))}

    // <Button variant="primary">Edit</Button>

    return (
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Wine Country"
          type='text'
          value={journal.title}
          name='title'
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          placeholder="Napa Valley, CA"
          type='text'
          value={journal.location}
          name='location'
          onChange={handleChange}
        />

        <label>What I Ate</label>
        <input
          placeholder="Expensive Cheese"
          type='textarea'
          value={journal.food}
          name='food'
          onChange={handleChange}
        />

        <label>Where I Stayed</label>
        <input
          placeholder="Four Seasons Resort"
          type='text'
          value={journal.lodging}
          name='lodging'
          onChange={handleChange}
        />

        <label>What I Did</label>
        <input
          placeholder="Wine Tastings"
          type='textarea'
          value={journal.activities}
          name='activities'
          onChange={handleChange}
        />

        <label>What I Learned</label>
        <input
          placeholder="How wine is made"
          type='textarea'
          value={journal.learnings}
          name='learnings'
          onChange={handleChange}
        />

        <label>What I Loved</label>
        <input
          placeholder="Scenic views"
          type='textarea'
          value={journal.loves}
          name='loves'
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default JournalCreate
