const { axiosMovie, axiosSerie } = require('../config/axios')
const { ApolloError } = require('apollo-server')
const { GraphQLDateTime } = require('graphql-iso-date')

const entertainmentResolver = {
  Query: {
    entertainment: async (parent, args, context, info ) => {
      try{
        const movie = await axiosMovie({
          method: 'GET',
          url: '/movie'
        })
        const serie = await axiosSerie({
          method: 'GET',
          url: '/series'
        })
        return {
          movies: movie.data,
          series: serie.data
        }
      }
      catch({response}){
        throw new ApolloError(response.data.message, 'No Data')
      }
    }
  }
}

module.exports = entertainmentResolver