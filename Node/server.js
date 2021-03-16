// load in environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
  
  // Next two lines needed for basic express application
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  // temporary local variable as a substitution for a database
  const users = []
  
  // In order to use ejs syntax, this line tells the server that ejs
  // is being used
  app.set('view-engine', 'ejs')
  // Tells the app that email and password inputs should be accesed
  // from the req variable inside the post method
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    // A key that we want to keep secret which will encrypt all our
    // information for us. This is gotten from our environment variables
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  // store variables to be persisted across the entire session
  app.use(passport.session())
  app.use(methodOverride('_method'))
  // This is a route. The single '/' indicates that it's the home page.
  // We are specifying to send back the view "index.ejs" as the main page.
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      // 10 is the number of hashes done. It's a good number
      // for decent speed but also a good amount of encryption
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        // date is used as a unique identifier. A database
        // would usually automatically add this
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      // redirect to login page after the user has registered
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  // will redirect the user to the login page if there is a problem.
  // I think this forces the user to relogin
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  // prevents the user from going back to a certain page if they are
  // already logged in. This method is specified in the arguments
  // to the get and post requests we don't want the logged in user to access
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    // if for some reason they are not authenticated, continue
    // on with the call
    next()
  }
  
  // server available at localhost:3000
  app.listen(3000)