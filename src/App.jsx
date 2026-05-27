import { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import { getBooks, createBook, updateBook, deleteBook } from './api';
import './App.css';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books. Please check your API connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (formData) => {
    setFormLoading(true);
    try {
      const newBook = await createBook(formData);
      setBooks([...books, newBook]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add book');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateBook = async (formData) => {
    setFormLoading(true);
    try {
      const updated = await updateBook(editingBook.id, formData);
      setBooks(books.map((b) => (b.id === editingBook.id ? updated : b)));
      setEditingBook(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update book');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b.id !== id));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingBook(null);
    setShowForm(false);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(books.map((b) => b.genre))].sort();

  return (
    <div className="app">
      <header className="app-header">
        <h1> 📚 Book Management System</h1>
        <p>Manage your book collection with ease</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        <div className="controls">
          {!showForm && (
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              + Add New Book
            </button>
          )}
        </div>

        {showForm && (
          <div className="form-container">
            <BookForm
              onSubmit={editingBook ? handleUpdateBook : handleAddBook}
              initialData={editingBook}
              onCancel={handleCancel}
              loading={formLoading}
            />
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          genres={genres}
        />

        <div className="stats">
          <p>
            Showing <strong>{filteredBooks.length}</strong> of <strong>{books.length}</strong> books
          </p>
        </div>

        <BookList
          books={filteredBooks}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
          loading={loading}
          error={error && !books.length ? error : null}
        />
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Book Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
