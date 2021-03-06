import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
// import Layout from '../shared/Layout'

class Journal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      journal: {},
      deleted: false,
      editMode: false,
      isLoaded: false
    }
  }

  componentDidMount () {
    // console.log('journal props', this.props)
    // const { journalID } = this.props.journalID
    axios({
      url: `${apiUrl}/journal/${this.props.journalID.journalID}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    //  .then(res => console.log('res', res))
      .then(res => this.setState({
        journal: res.data.entry,
        isLoaded: true }))
      .catch(console.error)
  //  console.log(this.journal)
  }
  edit = () => {
  //  console.log(this.state.journal)
    this.setState({ editMode: true })
  //  console.log(this.journal)
  }
  destroy = () => {
    const { msgAlert } = this.props
    // const { journal } = this.state
    axios({
      url: `${apiUrl}/journal/${this.props.journalID.journalID}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Journal Entry Deleted', // would like to add in journal name
        message: messages.journalDeleted,
        variant: 'success'
      }))
      .catch(console.error)
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
    // console.log('journal', this.state.journal)
  }

  handleSubmit = event => {
    const { msgAlert } = this.props
    event.preventDefault()
    // console.log('token', this.props.user.token)
    // console.log('journal', this.state.journal)
    // console.log('owner', this.props.user)
    axios({
      url: `${apiUrl}/journal/${this.state.journal._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { entry: this.state.journal },
      owner: this.props.user
    })
      .then(res => this.setState({ editMode: false }))
      .then(() => msgAlert({
        heading: 'Journal Entry Updated',
        message: messages.journalUpdated,
        variant: 'success'
      }))
      .catch(console.error)
  }
  handleCancel = () => {
    this.setState({ editMode: false })
  }

  render () {
    let jsx
    const { journal, deleted, isLoaded, editMode } = this.state
    const { handleChange, handleSubmit, handleCancel } = this
    if (!journal) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Journal succesfully deleted!' } }
      } />
    }

    if (isLoaded) {
      jsx =
    <div className='selected-entry'>
      <h4 className='form-text'>{journal.title} <span className='alt-text'> {journal.location}</span></h4>
      <div>
        <img src={journal.image} alt={journal.title} className='edit-image'/>
      </div>
      <div>
        <p>What I Ate: {journal.food}</p>
        <p>Where I Stayed: {journal.lodging}</p>
        <p>What I Did: {journal.activities}</p>
        <p>What I Learned: {journal.learnings}</p>
        <p>What I Loved: {journal.loves}</p>
      </div>
      <div>
        <Button className='journal-edit' onClick={this.destroy} variant="primary">Delete</Button>
        <Button className='journal-edit' onClick={this.edit} variant="primary">Edit</Button>
      </div>
      <div>
        <Link to='/journal-history'>Back to all entries</Link>
      </div>
    </div>
    }

    if (editMode) {
      jsx =
      <div>
        <h2 className='page-header'>Editing {journal.title}</h2>
        <div className='container-ed'>
          <div className='row'>
            <h2 className='page-header'></h2>
            <div>
              <form onSubmit={handleSubmit} className='create-form'>
                <label className='form-text'>Title (Required):</label>
                <input
                  placeholder={journal.title}
                  type='text'
                  value={journal.title}
                  name='title'
                  onChange={handleChange}
                />
                <label className='form-text'>Location (Required):</label>
                <input
                  placeholder={journal.location}
                  type='text'
                  value={journal.location}
                  name='location'
                  onChange={handleChange}
                />
                <label className='form-text'>Favorite Photo:</label>
                <input
                  placeholder="https://i.imgur.com/yourimage.jpg"
                  type='text'
                  value={journal.image}
                  name='image'
                  onChange={handleChange}
                />
                <label className='form-text'>What I Ate:</label>
                <input
                  placeholder={journal.food}
                  type='textarea'
                  value={journal.food}
                  name='food'
                  onChange={handleChange}
                />

                <label className='form-text'>Where I Stayed:</label>
                <input
                  placeholder={journal.lodging}
                  type='text'
                  value={journal.lodging}
                  name='lodging'
                  onChange={handleChange}
                />

                <label className='form-text'>What I Did:</label>
                <input
                  placeholder={journal.activities}
                  type='textarea'
                  value={journal.activities}
                  name='activities'
                  onChange={handleChange}
                />

                <label className='form-text'>What I Learned:</label>
                <input
                  placeholder={journal.learnings}
                  type='textarea'
                  value={journal.learnings}
                  name='learnings'
                  onChange={handleChange}
                />

                <label className='form-text'>What I Loved:</label>
                <input
                  placeholder={journal.loves}
                  type='textarea'
                  value={journal.loves}
                  name='loves'
                  onChange={handleChange}
                />
                <Button type="submit" variant="primary">Submit</Button>
                <Button className='journal-edit' onClick={handleCancel} variant="primary">Cancel Edit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}

export default Journal
