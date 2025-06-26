const express = require('express'); 
const cors = require('cors'); 
const app = express(); 

app.use(cors()); 
app.use(express.json()); 

const movies = require('./movies.json'); 

app.get('/api/movies', (req, res) => {
  res.json(movies); 
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id)); 
  if (movie) res.json(movie); 
  else res.status(404).json({ error: 'Movie not found' }); 
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
});
