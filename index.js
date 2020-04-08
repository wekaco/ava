const debug = require('debug')('app:index');
const config = require('./config');

const services = {};

const port = process.env.PORT || config.port || 3000;
  
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers')(services);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true
});

server.listen(port).then(({ url }) => debug(`🚀  Server ready at ${url}`));
