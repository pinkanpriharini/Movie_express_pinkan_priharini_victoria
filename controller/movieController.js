import MovieModel from "../models/movieModels.js";

// GET /movies
export const getMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /movies/:id
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MovieModel.findById(id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /movies
export const createMovie = async (req, res) => {
    try {
        const { judul, tahunRilis, sutradara } = req.body;
        const movie = new MovieModel({ judul, tahunRilis, sutradara });
        const saved = await movie.save();
        res.status(201).json(saved);
    } catch (err) {
        // duplicate key (unique judul)
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Judul sudah ada' });
        }
        res.status(500).json({ message: err.message });
    }
};

// PUT /movies/:id
export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updated = await MovieModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(updated);
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: 'Judul sudah ada' });
        res.status(500).json({ message: err.message });
    }
};

// DELETE /movies/:id
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MovieModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
