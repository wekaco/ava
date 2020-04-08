import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const options = {
  uri: '__SERVER_URL__'
};
const link = new HttpLink(options);

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  name: 'net.wekaco.ava.graphql.client',
  version: '0.1',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

import { gql } from 'apollo-boost';

const Query = gql`
query Query {
  id
}`;

export {
  client,
  Query,
};
