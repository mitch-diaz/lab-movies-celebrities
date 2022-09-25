const User = require("../models/User.model");
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();
const bcryptjs = require('bcryptjs');


//  ========= USER SIGNUP ==========

router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})

router.post('/signup', (req, res, next)=>{
    const saltRounds = 10;
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(req.body.password, salt))
    .then(hashedPassword => {
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
    })
      res.redirect('/')
    })
    .catch(error => next(error));
});


//  ========= USER LOGIN ==========

router.get('/login', (req, res, next)=>{
    res.render('auth/login');
  })
  
router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  if (req.body.username === '' || req.body.password === '') {
    res.redirect('/login', {
      errorMessage: 'Please enter both, username and password to login.'
  });
    return;
  }
 
  User.findOne({ username: req.body.username })
    .then(resultFromDB => {
      if (!resultFromDB) {
          res.redirect('/login', { errorMessage: 'The username is not registered. Try with another one.' });
        return;
      } else if (bcryptjs.compareSync(req.body.password, resultFromDB.password)) {
        console.log("found user", resultFromDB);
        req.session.currentlyLoggedIn = resultFromDB;
        console.log(req.session);
        res.redirect('/user-profile');
        return;
      } else {
          res.redirect('/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => console.log(error));
});
  
  
  //  ========= USER PROFILE PAGE ==========

router.get('/user-profile', (req, res, next)=>{
  User.findById(req.session.currentlyLoggedIn._id)
  .then((theUser)=>{
    console.log(theUser);
    res.render('auth/user-profile', {theUser: theUser})
  })
  .catch((error)=>{
    console.log(error)
  })
})

  // ========== USER LIKES ===========
// =-=-=-=-=-=-=-=- update user model with movie likes =-=-=-=-=-=-=-=-=-=-=

router.get('/user-profile/:id', (req, res, next) => {
    User.find(req.params.theUser)
    .then((theUser) => {
        console.log('Logged on user: ', theUser);
        res.render('auth/user-profile', movieFromDb)
        Movie.findById(req.params.id)
        .then((movieFromDb)=>{
            console.log('Favorite movie: ', movieFromDb);
            res.render('auth/user-profile', movieFromDb)
        })
    })
})

router.post('/user-profile/:id', (req, res, next)=>{
  const movieFavorite = {favorites: req.body.favorites}

  User.findByIdAndUpdate(req.params.id, movieFavorite)
  .then(theMovieFav => {
      console.log('The favorite: ', theMovieFav);
      res.redirect(`/user-profile/${theMovieFav.id}`);
  }).catch(error => {
      console.log({error});
  })
})
  

  
  //  ========= USER LOGOUT ==========

router.post('/logout', (req, res, next)=>{
  req.session.destroy(error => {
    if (error) console.log(error);
    res.redirect('/');
  });
})
  

module.exports = router;
