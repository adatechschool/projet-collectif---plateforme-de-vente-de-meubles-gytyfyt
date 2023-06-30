// condition if we are in developement or in deployement
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// import express library and stokc it in a variable 
const express = require('express')
// intance of express : "app", its our application !
const app = express() //=server

// layouts to avoid code duplication - maybe unusefull 
const expressLayouts = require('express-ejs-layouts')

// import router
// index
const indexRouter = require('./routes/index')
//log in
const loginRouter = require('./routes/login')
const meublesRouter = require('./routes/meubles')
// sign in
const signinRouter = require('./routes/login')
// server settings
app.set('view engine', 'ejs')  // set server views 
app.set('views', __dirname + '/views') // path views
//app.set('layout', 'layouts/layout')  // layouts to display 

// server tools
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())


// setting up our database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // log if we are connected or not to the database
    .then(() => {
        console.log('Connexion à la base de données réussie')
    })
    .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données :', error)
    })

// another way to write
/*const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))*/

/* // setting up our database if its the online one. DO NOT USE
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // log if we are connected or not to the database
    .then(() => {
        console.log('Connexion à la base de données réussie')
    })
    .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données :', error)
    }) */

// use the route
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/meubles', meublesRouter)
app.use('/signin', signinRouter)



// server start nad listen on a specify port
app.listen(process.env.PORT || 3000)