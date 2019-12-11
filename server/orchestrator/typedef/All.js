const { gql } = require('apollo-server')

const Entertainment = gql`
  # scalar Date

  type Entertainment {
    movies: [Movie],
    series: [Serie]
  }
  
  extend type Query {
    entertainment: Entertainment
  }
`

module.exports = Entertainment