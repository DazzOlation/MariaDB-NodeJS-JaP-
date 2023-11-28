const movieModel = require("../models/moviesModel");

const getMovies = async (req, res)=>{
    const movies = await movieModel.getMovies();
    res.json(movies);
};

const getMovieById = async (req, res)=>{
    const id = parseInt(req.params.id);
    const movie = await movieModel.getMovieById(id);
    if(movie){
        res.json(movie);
    }
    else{
        res.status(404).json({message: "Aún no disponemos de esa película"});
    }
};

const addMovie = async (req, res)=>{
    const addedMovie = await movieModel.addMovie(req.body);
    if(addedMovie){
        res.json(addMovie);
    }
    else{
        res.status(500).json({message: "Servidor caído, reintente"});
    }
};

const updateMovie = async (req, res)=>{
    const id = parseInt(req.params.id);
    const movie = await movieModel.getMovieById(id);
    if(movie){
        const updatedMovie = await movieModel.updateMovie(parseInt(req.params.id), {
            ...movie,
            ...req.body,
        });
        if(updatedMovie){
            res.json(updatedMovie);
        }
        else{
            res.status(500).json({message: "Servidor caído, reintente"});
        }
    }
    else{
        res.status(404).json({message: "Película no encontrada"});
    }
};

const deleteMovie = async (req, res)=>{
    const id = parseInt(req.params.id);
    const movie = await movieModel.getMovieById(id);
    if(movie){
        const result = await movieModel.deleteMovie(parseInt(req.params.id));
        if(result){
            res.json(movie);
        }
        else{
            res.status(500).json({message: "Servidor caído, reintente"});
        }
    }
    else{
        res.status(404).json({message: "Película no encontrada"});
    }
};

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
}