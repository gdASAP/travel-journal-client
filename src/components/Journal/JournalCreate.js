import React, { Component } from 'react'
// import { showOrder } from './../../api/order'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
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
      journalTitle: '',
      clearForm: false,
      journalTemplate: {},
      handleFailure: ''
    }
  }
    handleFailure = (event) => {
      const { msgAlert } = this.props
      // const { journal } = this.state
      msgAlert({
        heading: 'Please specify required fields',
        message: messages.journalNotCreated,
        variant: 'danger'
      })
      const journalCopy = Object.assign({}, '')
      this.setState({ journal: journalCopy })
    }
    handleChange = (event) => {
      event.persist()
      this.setState(prevState => {
        const updatedField = { [event.target.name]: event.target.value }
        const newJournal = Object.assign({}, prevState.journal, updatedField)
        // console.log(newJournal)
        return { journal: newJournal }
      })
    //  console.log('journal', this.state.journal)
    }

  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    const { journal } = this.state
    const { handleFailure } = this
    if (!journal.title || !journal.location) {
      handleFailure()
    } else {
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
          journalTitle: res.data.entry.title
        }))
        .then(() => msgAlert({
          heading: `Creating '${this.state.journalTitle}'`,
          message: messages.journalCreated,
          variant: 'success'
        }))
        .catch(console.error)
    }
  }
  render () {
    const { handleChange, handleSubmit } = this
    const { journal, createdJournalId } = this.state

    if (createdJournalId) {
      return <Redirect to='/journal-history' />
    }

    return (
      <div className='container-cr'>
        <div className='row'>
          <form onSubmit={handleSubmit} className='create-form'>
            <h1 className='page-header'>Relive Your Travel Experience</h1>
            <label className='form-text'>Title (Required):</label>
            <input
              placeholder="Wine Country"
              type='text'
              value={journal.title || ''}
              name='title'
              onChange={handleChange}
            />

            <label className='form-text'>Location (Required):</label>
            <input
              placeholder="Napa Valley, CA"
              type='text'
              value={journal.location || ''}
              name='location'
              onChange={handleChange}
            />

            <label className='form-text'>Favorite Photo:</label>
            <input
              placeholder="https://i.imgur.com/yourimage.jpg"
              type='text'
              value={journal.image || ''}
              name='image'
              onChange={handleChange}
            />

            <label className='form-text'>What I Ate:</label>
            <input
              placeholder="Expensive Cheese"
              type='textarea'
              value={journal.food || ''}
              name='food'
              onChange={handleChange}
            />

            <label className='form-text'>Where I Stayed:</label>
            <input
              placeholder="Four Seasons Resort"
              type='text'
              value={journal.lodging || ''}
              name='lodging'
              onChange={handleChange}
            />

            <label className='form-text'>What I Did:</label>
            <input
              placeholder="Wine Tastings"
              type='textarea'
              value={journal.activities || ''}
              name='activities'
              onChange={handleChange}
            />

            <label className='form-text'>What I Learned:</label>
            <input
              placeholder="How wine is made"
              type='textarea'
              value={journal.learnings || ''}
              name='learnings'
              onChange={handleChange}
            />

            <label className='form-text'>What I Loved:</label>
            <input
              placeholder="Scenic views"
              type='textarea'
              value={journal.loves || ''}
              name='loves'
              onChange={handleChange}
            />
            <Button type="submit" variant="primary">Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default JournalCreate
