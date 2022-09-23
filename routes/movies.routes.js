const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();


// =========== CREATE A NEW MOVIE ============

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


// =========== READ MOVIES LIST ============

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

// ============ READ MOVIE DETAILS ============

router.get('/movies/:movieId', (req, res, next) => {
    console.log({params: req.params.movieId});

    Movie.findById(req.params.movieId)
    .populate('cast')
    .then(movieFromDb => {
        console.log('The clicked on movie: ', movieFromDb);
        res.render('movies/movie-details', movieFromDb);
    })
    .catch(err => {
        console.log({err});
    })
})


// =========== UPDATE ============

router.get('/movies/:id/edit', (req, res, next) => {
    
    Movie.findById(req.params.id)
    .then((movieFromDb) => {
        console.log('Update movie: ', movieFromDb);
        Celebrity.find(req.params.celebsFromDb)
        .then((celebsFromDb)=>{
            console.log('Update celeb: ', celebsFromDb);
            res.render('movies/edit-movie', movieFromDb)
        })
    })
})

router.post('/movies/:id', (req, res, next)=>{
    const movieToUpdate = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.findByIdAndUpdate(req.params.id, movieToUpdate)
    .then(theUpdatedMovie => {
        console.log('The Edit: ', theUpdatedMovie);
        res.redirect(`/movies/${theUpdatedMovie.id}`);
    }).catch(err => {
        console.log({err});
    })
})


// =========== DELETE ============

router.post('/movies/:movieId/delete', (req, res, next) => {

    Movie.findByIdAndRemove(req.params.movieId)
    .then((movieFromDb) => {
        res.redirect('/movies');
    })
    .catch((err) => {
        console.log({err});
    })
});


module.exports = router;