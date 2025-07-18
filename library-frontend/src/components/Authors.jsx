import AuthorForm from "./AuthorForm"
import './Authors.css'

const Authors = ({ authors, show, token }) => {
  if (!show) return null

  return (
    <div className="authors-container">
      <h2>authors</h2>
      <table className="authors-table">
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => (
            <tr key={a.name}>
              <td data-label="Author">{a.name}</td>
              <td data-label="Born">{a.born || '-'}</td>
              <td data-label="Books">{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && <AuthorForm />}
    </div>
  )
}

export default Authors
