import React, { Component } from 'react'
// import { showOrder } from './../../api/order'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
// import { showHistory } from './../../api/journalAPI'
// import messages from '../AutoDismissAlert/messages'
// import JournalForm from './JournalForm'

class JournalCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {
        image: '',
        title: '',
        location: '',
        food: '',
        lodging: '',
        activities: '',
        learnings: '',
        loves: ''
      },
      createdJournalId: null,
      clearForm: false,
      clear: {
        image: '',
        title: '',
        location: '',
        food: '',
        lodging: '',
        activities: '',
        learnings: '',
        loves: ''
      },
      journalTemplate: {}
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
    handleClearForm = () => {
      const { clear } = this.state
      // console.log(journal.title)
      //  const { title } = this.state
      // const title = target.title
      // const location = target.location
      this.setState({
        journalTemplate: clear,
        clearForm: false
      })
    // console.log('journal', this.state.journal)
    }
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
      console.log('journal', this.state.journal)
    }

  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    const { handleClearForm } = this
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
      .then(res => this.setState({
        createdJournalId: res.data.entry._id,
        clearForm: true }))
      .then(() => msgAlert({
        heading: 'Journal Entry Created',
        message: messages.journalCreated,
        variant: 'success'
      }))
      .then(handleClearForm)
      .catch(console.error)
  }
  render () {
    const { handleChange, handleSubmit } = this
    const { journalTemplate } = this.state
    // const { handleChange, handleSubmit, handleClearForm } = this
    // const { createdJournalId, journalTemplate, clearForm } = this.state

    // if (clearForm && createdJournalId) {
    //   handleClearForm()
    // }

    // if (createdJournalId) {
    //   // console.log('journal created')
    // }

    return (
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Wine Country"
          type='text'
          value={journalTemplate.title}
          name='title'
          onChange={handleChange}
        />

        <label>Location</label>
        <input
          placeholder="Napa Valley, CA"
          type='text'
          value={journalTemplate.location}
          name='location'
          onChange={handleChange}
        />

        <label>Favorite Photo</label>
        <input
          placeholder="https://i.imgur.com/yourimage.jpg"
          type='text'
          value={journalTemplate.image}
          name='image'
          onChange={handleChange}
        />

        <label>What I Ate</label>
        <input
          placeholder="Expensive Cheese"
          type='textarea'
          value={journalTemplate.food}
          name='food'
          onChange={handleChange}
        />

        <label>Where I Stayed</label>
        <input
          placeholder="Four Seasons Resort"
          type='text'
          value={journalTemplate.lodging}
          name='lodging'
          onChange={handleChange}
        />

        <label>What I Did</label>
        <input
          placeholder="Wine Tastings"
          type='textarea'
          value={journalTemplate.activities}
          name='activities'
          onChange={handleChange}
        />

        <label>What I Learned</label>
        <input
          placeholder="How wine is made"
          type='textarea'
          value={journalTemplate.learnings}
          name='learnings'
          onChange={handleChange}
        />

        <label>What I Loved</label>
        <input
          placeholder="Scenic views"
          type='textarea'
          value={journalTemplate.loves}
          name='loves'
          onChange={handleChange}
        />
        <Button type="submit" variant="primary">Submit</Button>
      </form>
    )
  }
}

export default JournalCreate
