import { useState } from 'react';
import '../styles/BookList.css';

export default function BookList({ books, onEdit, onDelete, loading, error }) {
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return <div className="loading">⏳ Loading books...</div>;
  if (error) return <div className="error">❌ Error: {error}</div>;
  if (books.length === 0) return <div className="empty-state">📚 No books found. Start by adding one!</div>;

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div
            className="book-header"
            onClick={() => setExpandedId(expandedId === book.id ? null : book.id)}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <div className="genre-badge">{book.genre}</div>
            </div>
            <div className="book-actions">
              <button onClick={(e) => { e.stopPropagation(); onEdit(book); }} className="btn-edit">✏️ Edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(book.id); }} className="btn-delete">🗑️ Delete</button>
            </div>
          </div>
          {expandedId === book.id && (
            <div className="book-details">
              <p><strong>📅 Year:</strong> <span>{book.publicationYear}</span></p>
              <p><strong>📖 Genre:</strong> <span>{book.genre}</span></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
