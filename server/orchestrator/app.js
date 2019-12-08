
const { ApolloServer, makeExecutableSchema } = require('apollo-server');

const movieResolvers = require('./resolvers/movie')
const seriesResolvers = require('./resolvers/series')
const entertainmentResolvers = require('./resolvers/all')
const Movie = require('./typedef/Movie')
const Serie = require('./typedef/Series')
const Entertaintment = require('./typedef/All')

const jsSchema = makeExecutableSchema({
  typeDefs: [Movie, Serie, Entertaintment],
  resolvers: [movieResolvers, entertainmentResolvers, seriesResolvers]
})

const server = new ApolloServer({ 
  schema: jsSchema
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});