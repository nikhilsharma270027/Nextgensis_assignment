import { useState, useEffect } from 'react';
import '../styles/BookForm.css';

export default function BookForm({ onSubmit, initialData, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: '', author: '', genre: '', publicationYear: new Date().getFullYear() });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.genre.trim()) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Book' : 'Add New Book'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genre *</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        >
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Romance">Romance</option>
          <option value="Mystery">Mystery</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="publicationYear">Publication Year *</label>
        <input
          type="number"
          id="publicationYear"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          min="1000"
          max={new Date().getFullYear()}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Book' : 'Add Book'}
        </button>
        {onCancel && <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
