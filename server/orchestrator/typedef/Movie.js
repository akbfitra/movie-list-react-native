const { gql } = require('apollo-server')

const Movie = gql`
  scalar Date

  type Movie {
    _id: ID,
    title: String,
    description: String,
    url: String,
    popularity: Float,
    tags:[String],
    createdAt: Date,
    updatedAt: Date
  }

  type Query {
    movies: [Movie],
  }

  type Mutation {
    createMovie(
      title: String,
      description: String,
      url: String,
      popularity: Float,
      tags:[String],
      createdAt: Date,
      updatedAt: Date
    ): Movie,
    updateMovie(
      id:ID
      title: String,
      description: String,
      url: String,
      popularity: Float,
      tags:[String],
      createdAt: Date,
      updatedAt: Date
    ): Movie,
    deleteMovie(id: ID): Movie,
  }
`

module.exports = Movie