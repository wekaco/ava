const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  id: ID
}

type Subscription {
  logs: Log
}
type Log {
  id: String
}

schema {
  query: Query
  subscription: Subscription
}
`
