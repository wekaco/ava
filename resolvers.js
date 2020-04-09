const { v4 } = require('uuid');
const { GoogleLoggingPubSub } = require('./lib/google-logging-pubsub');

const pubsub = new GoogleLoggingPubSub();
const TOPIC_NAME =
`resource.type="generic_task"
timestamp>="${(new Date(Date.now() - (1000 * 60 * 15))).toISOString()}"`;

module.exports = ({}) => ({
  Query: {
    id: () => v4()
  },
  Subscription: {
    entry: {
      subscribe: () => pubsub.asyncIterator([ TOPIC_NAME ])
    }
  }
});
