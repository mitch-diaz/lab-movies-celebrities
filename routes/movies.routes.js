const Celebrity = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
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
        res.redirect('/celebrities/list', {newlyCreatedMovie});
    }).catch(err => {
        res.redirect('/celebrities/create');
    })
})





module.exports = router;