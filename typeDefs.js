const { gql } = require('apollo-server');

module.exports = gql`
type Query {
  id: ID
}

type Subscription {
  entry: Entry
}

type Entry {
  data: Log
}
type Log {
  message: String
}

schema {
  query: Query
  subscription: Subscription
}
`
