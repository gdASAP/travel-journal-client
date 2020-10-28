import React from 'react'
import { Link } from 'react-router-dom'

const JournalForm = ({ journal, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Wine Country"
      value={journal.title}
      name="title"
      onChange={handleChange}
    />

    <label>Location</label>
    <input
      placeholder="Napa Valley, CA"
      value={journal.location}
      name="location"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default JournalForm
