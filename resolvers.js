const { v4 } = require('uuid');

module.exports = ({}) => ({
  Query: {
    id: () => v4()
  }
});
