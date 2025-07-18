import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../services/queries'
import './Recommendations.css'  // será similar a Authors.css y Books.css

const Recommendations = ({ show }) => {
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) return null
  if (meResult.loading || booksResult.loading)
    return <div className="loading">Loading...</div>
  if (meResult.error) return <div className="error">Error loading user data</div>
  if (booksResult.error) return <div className="error">Error loading books</div>

  const favoriteGenre = meResult.data?.me?.favoriteGenre
  const books =
    booksResult.data?.allBooks?.filter((book) =>
      book.genres.includes(favoriteGenre)
    ) || []

  return (
    <div className="recommendations-container">
      <h2>recommendations</h2>
      <p className="recommendations-subtitle">
        Books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table className="recommendations-table">
        <thead>
          <tr>
            <th data-label="Title">Title</th>
            <th data-label="Author">Author</th>
            <th data-label="Published">Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td data-label="Title">{book.title}</td>
              <td data-label="Author">{book.author.name || book.author}</td>
              <td data-label="Published">{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
