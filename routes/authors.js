const express = require('express')
const router = express.Router()
const Author = require('../models/author')


// All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
       searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        })
    } catch  {
        res.redirect('/')
    }    
});

// New Author
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

// Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

router.get('/:id', (req, res) => {
    res.send('Show Author' +  req.params.id);
})

router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit' +  {author: new Author() });
    } catch  {
        
    }  
})

router.put('/:id', (req, res) => {
    res.send('Update Author' +  req.params.id);
})
router.delete('/:id', (req, res) => {
    res.send('Edit Author' +  req.params.id);
})

module.exports = router