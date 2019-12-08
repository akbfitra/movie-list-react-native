const { axiosSerie } = require('../config/axios')
const { ApolloError } = require('apollo-server')

const serieResolvers = {
  Query: {
    series: async (parent, args, context, info ) => {
      try{
        const {data} = await axiosSerie({
          method: 'GET',
          url: '/series'
        })
        
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message, 'No Data')
      }
    }
  },
  Mutation:{
    createSerie: async(parent, args, context, info ) => {
      try{
        const {data} = await axiosSerie({
          method: 'POST',
          url: '/series',
          data: args
        })
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message)
      }
    },
    updateSerie: async(parent, args, context, info) => {
      try{
        const { data } = await axiosSerie({
          method:'PUT',
          url: `/series/${args.id}`,
          data: {
            title: args.title,
            description: args.description,
            url: args.url,
            tags: args.tags,
            popularity: args.popularity
          }
        })
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message)
      }
    },
    deleteSerie: async(parent, args, context, info) => {
      try{
        const { data } = await axiosSerie({
          method:'DELETE',
          url: `/series/${args.id}`
        })
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message)
      }
    }
  },
};

module.exports = serieResolvers
