import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    fetch('https://movie-catalog-copy-production.up.railway.app/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, []);

  const genres = ['All', ...new Set(movies.map(movie => movie.genre))];

  const filteredMovies =
    selectedGenre === 'All'
      ? movies
      : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">🎬 Movie Catalog</h1>
          <div>
            <label className="mr-2 text-sm sm:text-base font-medium">Genre:</label>
            <select
              className="bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded-md"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center mt-10 text-xl font-semibold text-gray-300">
            Loading movies...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMovies.map(movie => (
              <div
                key={movie.id}
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
                  <p className="text-sm text-gray-400">{movie.genre} • {movie.year}</p>
                  <p className="text-yellow-400 font-semibold mt-1">⭐ {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Movie Catalog. Built by Farheen Malak
      </footer>
    </div>
  );
}

export default App;
