const mongoose  = require("mongoose")
const Book = require('./book')

// Add to Db
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// Schema Relationships
authorSchema.pre('remove',function(next){
    Book.find({ author: this.id }, (err, books) =>{
        if(err){
            next(err)
        }else if(books.length > 0){
            next(new Error('This author has books associated in Database'))
        }else{
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)