import { ApolloClient, gql } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

import { getMainDefinition } from 'apollo-utilities';

// Instantiate required constructor fields
const cache = new InMemoryCache();

const http = new HttpLink({
  uri: `http://__SERVER_URL__`
})
const ws = new WebSocketLink({
  uri: `ws://__SERVER_URL__/sub`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  ws,
  http,
);

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

//import { gql } from 'apollo-boost';

const Query = gql`
query Query {
  id
}`

const Subscription = gql`
subscription Subscription {
  logs {
    id
  }
}
`;

export {
  client,
  Query,
  Subscription
};
