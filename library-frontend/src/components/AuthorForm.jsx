import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../services/queries'
import './AuthorForm.css'

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

  const [changeNumber, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    changeNumber({ variables: { name, setBornTo: Number(bornYear) } })
    setName('')
    setBornYear('')
  }

  return (
    <div className="author-form-container">
      <h2>CHANGE BORN YEAR</h2>
      <form onSubmit={submit}>
        <div>
          <label>name</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label>born in</label>
          <input
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default AuthorForm
