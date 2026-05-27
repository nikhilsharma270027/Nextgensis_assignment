import '../styles/SearchBar.css';

export default function SearchBar({ searchTerm, onSearchChange, selectedGenre, genres, onGenreChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="genre-filter">Filter by Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
