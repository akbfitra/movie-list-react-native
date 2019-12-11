const { gql } = require('apollo-server')

const series = gql`
  # scalar Date

  type Serie {
    _id: ID,
    title: String,
    description: String,
    url: String,
    popularity: Float,
    tags:[String],
    createdAt: Date,
    updatedAt: Date
  }

  extend type Query {
    series: [Serie],
    seriedetail(id: String): Serie
  }

  extend type Mutation {
    createSerie(
      title: String,
      description: String,
      url: String,
      popularity: Float,
      tags:[String],
      createdAt: Date,
      updatedAt: Date
    ): Serie,
    updateSerie(
      id:ID
      title: String,
      description: String,
      url: String,
      popularity: Float,
      tags:[String],
      createdAt: Date,
      updatedAt: Date
    ): Serie,
    deleteSerie(id: ID): Serie,
  }
`;

module.exports = series