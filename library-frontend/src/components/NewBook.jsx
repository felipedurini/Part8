import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../services/queries'
import './NewBook.css' 

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, published: parseInt(published), author, genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (genre.trim() && !genres.includes(genre.trim())) {
      setGenres(genres.concat(genre.trim()))
    }
    setGenre('')
  }

  return (
    <div className="newbook-container">
      <h2>create new book</h2>
      <form onSubmit={submit} className="newbook-form">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </label>

        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </label>

        <label>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </label>

        <div className="genre-input-group">
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            type="button"
            onClick={addGenre}
            className="add-genre-button"
          >
            add genre
          </button>
        </div>

        <div className="genres-list">
          genres: {genres.join(', ')}
        </div>

        <button type="submit" className="submit-button">
          create book
        </button>
      </form>
    </div>
  )
}

export default NewBook
