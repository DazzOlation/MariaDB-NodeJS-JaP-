const express = require("express");
const moviesRouter = express.Router();

const moviesController = require("../controllers/moviesController");

moviesRouter.get("/", moviesController.getMovies);
moviesRouter.get("/:id", moviesController.getMovieById);
moviesRouter.post("/", moviesController.addMovie);
moviesRouter.put("/:id", moviesController.updateMovie);
moviesRouter.delete("/:id", moviesController.deleteMovie);

module.exports = moviesRouter;