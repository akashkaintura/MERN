if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// path to accessible folder
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layouts')

// public folder
app.use(expressLayouts)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ limit: '10mb',extended: true }));

/* Mongo DB connection*/
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true 
})
const db = mongoose.connection
db.on('error', error  => console.log(error))
db.once('open',() => console.log('Connected to Mongoose'))

// Routes
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

// Port
app.listen(process.env.PORT || 3000)