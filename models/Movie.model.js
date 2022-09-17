const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: Array
})

const Movie = model('Movie', movieSchema);
module.exports = Movie;