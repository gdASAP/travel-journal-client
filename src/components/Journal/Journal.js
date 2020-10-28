import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

class Journal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      journal: null,
      deleted: false
    }
  }

  componentDidMount () {
    console.log('journal props', this.props)
    axios(`${apiUrl}/journal/${this.props.match.params.id}`)
      .then(res => this.setState({ journal: res.data.entry }))
      .catch(console.error)
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/journal/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { journal, deleted } = this.state

    if (!journal) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Journal succesfully deleted!' } }
      } />
    }

    return (
      <div>
        <h4>{journal.title}</h4>
        <button onClick={this.destroy}>Delete</button>
        <Link to={`/journal/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/journal-history">Back to all entries</Link>
      </div>
    )
  }
}

export default Journal
