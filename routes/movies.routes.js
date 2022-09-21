const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = require("express").Router();


// =========== CREATE ============
router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie')
})

router.post('/movies/create', (req, res ,next) => {
    console.log(req.body);
    const moviesToCreate = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(moviesToCreate)
    .then(newlyCreatedMovie => {
        res.redirect('/movies/movies', {newlyCreatedMovie});
    }).catch(err => {
        res.redirect('/movies/create');
    })
})


// =========== READ ============
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((moviesFromDb) => {
        console.log({moviesFromDb});
        movieData = {movies: moviesFromDb}
        res.render('movies/movies', movieData);
    })
    .catch(err => {
        console.log({err});
    })
})

// *** The only way to get a value from req.params is if you personally set a variable using the :variableName method in the endpoint when creating your route. You then call the value for that parameter by using req.params.variableName

// NEED POPULATE() TO WORK
router.get('/movies/:movieId', (req, res, next) => {
    console.log({params: req.params.movieId});

    Movie.findById(req.params.movieId).populate('cast')
    .then(movieFromDb => {
        res.render('movies/movie-details', movieFromDb);
    })
    .catch(err => {
        console.log({err});
    })
})


// =========== DELETE ============

router.post('/movies/:movieId/delete', (req, res, next) => {

    Movie.findByIdAndRemove(req.params.movieId)
    .then((theMovie) => {
        res.redirect('/movies/movies');
    })
    .catch((err) => {
        console.log({err});
    })
});


// =========== UPDATE ============

router.get('/movies/:movieId/edit', (req, res, next) => {
    
    Movie.findById(req.params.movieId).then((movie) => {

        Celebrity.find()
    })


})




module.exports = router;