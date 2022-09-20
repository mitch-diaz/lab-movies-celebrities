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

router.get('/movies/:movieId', (req, res, next) => {
    console.log({params: req.params.movieId})

    Movie.findById(req.params.movieId)
    .populate('cast')
    .then(moviesFromDb => {
        // console.log({moviesFromDb});
        movieData = {movies: moviesFromDb}
        res.render('movies/movie-details', moviesFromDb);
    }).catch(err => {console.log({err})})
})

// ================
// router.get('/movies/:movieId', (req, res, next) => {
//     const {movieId} = req.params;
//     console.log({params: req.params.movieId})

//     Movie.findById(movieId)
//     .then(theMovie => {res.render('movies/movie-details', { movie: theMovie });
//     }).catch(err => {console.log({err})})
// })


// =========== DELETE ============

router.post('/movies/:movieId/delete', (req, res, next) => {
    const {movieId} = req.params;

    Movie.findByIdAndRemove('movieId')
    .then(() => {
        res.redirect('/movies/movies');
    })
    .catch((err) => {
        console.log({err});
    })
});


// =========== UPDATE ============






module.exports = router;