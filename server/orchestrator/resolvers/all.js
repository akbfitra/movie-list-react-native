const { axiosSerie } = require('../config/axios')
const { axiosMovie } = require('../config/axios')
const { ApolloError } = require('apollo-server')

const entertainmentResolvers = {
  Query: {
    entertainment: async (parent, args, context, info ) => {
      try{
        const movies = await axiosMovie({
          method: 'GET',
          url: '/movie'
        })
        const series = await axiosSerie({
          method: 'GET',
          url: '/series'
        })
        
        return {
          movies: movies.data,
          series: series.data
        }
      }
      catch({response}){
        throw new ApolloError(response.data.message, 'No Data')
      }
    }
  }
};

module.exports = entertainmentResolvers