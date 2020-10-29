import React from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
// import axios from 'axios'
// import apiUrl from './apiConfig'
// import { Redirect } from 'react-router-dom'
class JournalEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      journal: {},
      isLoaded: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/books/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          // set is loaded state to true to make sure the condition below knows that
          // the component is loaded.
          isLoaded: true,
          journal: response.data.book
        })
      })
      .catch(console.error)
  }
  handleChange = (event) => {
    // get value the user typed in
    const userInput = event.target.value
    // get the name of the input they typed in
    const bookKey = event.target.name // "title" or "author"
    // make a copy of the state
    const bookCopy = Object.assign({}, this.state.book)
    // updating the key in our copy with what the user typed
    bookCopy[bookKey] = userInput
    // updating the state with our new copy
    this.setState({ book: bookCopy })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const book = this.state.book
    console.log(book)
    // make POST request to API /games route with book data
    axios({
      url: `${apiUrl}/books/${book._id}`,
      method: 'PATCH',
      data: {
        book: book
      }
    })
      .then((response) => this.setState({ book }))
      .catch(console.error)
  }
  render () {
    // if (this.state.createdBookId !== '') {
    //   return <Redirect to="/books" />
    //
    return (
      <div>
        <h2>Edit Book</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="title" type="text" value={this.state.value} placeholder={this.state.book.title} onChange={this.handleChange}/>
          <input name="author" type="text" value={this.state.value} placeholder={this.state.book.author} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
export default BookUpdate
