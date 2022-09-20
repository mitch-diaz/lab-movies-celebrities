const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res ,next) => {
    console.log(req.body);
    const celebsToCreate = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(celebsToCreate)
    .then(newlyCreatedCeleb => {
        res.redirect('/celebrities/celebrities', {newlyCreatedCeleb});
    }).catch(err => {
        res.redirect('/celebrities/create');
    })
})

router.get('/celebrities', (req, res, next) => {
    // console.log({query: req.body});
    
    Celebrity.find()
    .then((celebsFromDb) => {
        console.log({celebsFromDb});
        data = {celebs: celebsFromDb}
        res.render('celebrities/celebrities', data);
    })
    .catch(err => {
        console.log({err});
    })
})



module.exports = router;