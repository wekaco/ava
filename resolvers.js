const { v4 } = require('uuid');
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const TOPIC_NAME = 'foo';
setInterval(() => {
  pubsub.publish(TOPIC_NAME, { logs: { id: v4() }})
}, 500);

module.exports = ({}) => ({
  Query: {
    id: () => v4()
  },
  Subscription: {
    logs: {
      subscribe: () => pubsub.asyncIterator([ TOPIC_NAME ])
    }
  }
});
