const { axiosMovie } = require('../config/axios')
const { ApolloError } = require('apollo-server')
const { GraphQLDateTime } = require('graphql-iso-date')

const movieResolvers = {
  Query: {
    movies: async (parent, args, context, info ) => {
      try{
        const {data} = await axiosMovie({
          method: 'GET',
          url: '/movie'
        })
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message, 'No Data')
      }
    },
    moviedetail: async (parent, args, context, info ) => {
      
      try{
        const {data} = await axiosMovie({
          method: 'GET',
          url: `/movie/${args.id}`
        })
        console.log(data)
        return data

      }
      catch({response}){
        throw new ApolloError(response.data.message, 'No Data')
      }
    }
  },
  Mutation:{
    createMovie: async(parent, args, context, info ) => {
      try{
        const {data} = await axiosMovie({
          method: 'POST',
          url: '/movie',
          data: args
        })
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message)
      }
    },
    updateMovie: async(parent, args, context, info) => {
      try{
        const { data } = await axiosMovie({
          method:'PUT',
          url: `/movie/${args.id}`,
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
    deleteMovie: async(parent, args, context, info) => {
      try{
        const { data } = await axiosMovie({
          method:'DELETE',
          url: `/movie/${args.id}`
        })
        return data
      }
      catch({response}){
        throw new ApolloError(response.data.message)
      }
    }
  },
  Date: GraphQLDateTime
};

module.exports = movieResolvers
