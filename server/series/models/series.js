const mongoose = require('mongoose')
const { Schema } = mongoose

const seriesSchema = new Schema({
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
}, {timestamps: true, versionKey: false})

const Series = mongoose.model('Series', seriesSchema)
module.exports = Series