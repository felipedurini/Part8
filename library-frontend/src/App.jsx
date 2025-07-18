import { useQuery, useSubscription } from '@apollo/client'
import { useState, useEffect } from 'react'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./services/queries";

import './App.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';


const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`Nuevo libro agregado: "${addedBook.title}" por ${addedBook.author.name}`);

      const dataInCache = client.readQuery({ query: ALL_BOOKS });
      if (!dataInCache.allBooks.find(b => b.id === addedBook.id)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: {
            allBooks: dataInCache.allBooks.concat(addedBook)
          }
        });
      }
    }
  });

  if (authors.loading || books.loading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage("login")
  }

return (
  <>
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand>Library</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => setPage("authors")}>authors</Nav.Link>
          <Nav.Link onClick={() => setPage("books")}>books</Nav.Link>
          {token && <Nav.Link onClick={() => setPage("recommend")}>recommend</Nav.Link>}
          {token && <Nav.Link onClick={() => setPage("add")}>add book</Nav.Link>}
        </Nav>
        <Nav>
          {token ? (
            <Button variant="outline-light" onClick={logout}>logout</Button>
          ) : (
            <Button variant="outline-light" onClick={() => setPage("login")}>login</Button>
          )}
        </Nav>
      </Container>
    </Navbar>

    <Container>
      {page === "login" && !token && <LoginForm setToken={setToken} />}
      <Authors show={page === "authors"} authors={authors.data.allAuthors} token={token} />
      <Books show={page === "books"} books={books.data?.allBooks || []} />
      <NewBook show={page === "add"} />
      <Recommendations show={page === 'recommend'} />
    </Container>
  </>
);
};

export default App;
