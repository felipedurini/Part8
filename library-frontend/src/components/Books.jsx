import { useState, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../services/queries'
import './Books.css'  // archivo CSS que será igual en estructura a Authors.css

const Books = ({ books, show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const allBooks = useQuery(ALL_BOOKS)

  const { data, loading, error } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  })

  const filteredBooks = selectedGenre === 'all'
    ? allBooks.data?.allBooks || []
    : data?.allBooks || []

  const genres = useMemo(() => {
    const allGenres = books.flatMap(b => b.genres)
    return Array.from(new Set(allGenres))
  }, [books])

  if (!show) return null
  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error loading books.</div>

  return (
    <div className="books-container">
      <h2>books</h2>

      <table className="books-table">
        <thead>
          <tr>
            <th data-label="Title">Title</th>
            <th data-label="Author">Author</th>
            <th data-label="Published">Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td data-label="Title">{book.title}</td>
              <td data-label="Author">{book.author.name || book.author}</td>
              <td data-label="Published">{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="genre-buttons" style={{ marginTop: '20px' }}>
        {genres.map(g => (
          <button
            key={g}
            className={`genre-button ${selectedGenre === g ? 'active' : ''}`}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </button>
        ))}
        <button
          className={`genre-button ${selectedGenre === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedGenre('all')}
        >
          All genres
        </button>
      </div>
    </div>
  )
}

export default Books
