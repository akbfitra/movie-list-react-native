const mongoose = require('mongoose')
const { Schema } = mongoose

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title Must Be Filled']
  },
  description: {
    type: String,
    required: [true, 'Description Must Be Filled']
  },
  url: {
    type: String,
    required: [true, 'Poster Url Must Be Filled']
  },
  popularity: {
    type: Number,
    required: [true, 'Popularity Must Be Filled']
  },
  tags: [{
    type: String,
    required: [true, 'Tags Must Be Filled']
  }]
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie