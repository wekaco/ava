const { PubSub, PubSubEngine }  = require('apollo-server');// PubSub extends abstract PubSubEngine

const { Logging } = require('@google-cloud/logging');

class GoogleLoggingPubSub extends PubSubEngine {
  
  constructor() {
    super();
    const logging = new Logging({ projectId: 'wekaco-010386' });
    this._log = logging.log('gen');
    this._pb = new PubSub();
    this._streams = new Map();
  }

  _stream(filter) {
    if (!this._streams.has(filter)) {
      this._streams
        .set(filter, this._log.getEntriesStream({ filter, orderBy: 'timestamp asc', pageSize: 1 }));
    }
    return this._streams.get(filter);
  }

  subscribe(filter, onMessage) {
    this._stream(filter)
      .on('data', entry => {
        this._pb.publish(filter, { entry });
      })
      .on('end', console.log)
      .on('error', console.error)

    return this._pb.subscribe(filter, onMessage);
  }
  unsubscribe(subId) {
    return this._pb.unsubscribe(subId);
  }

  //abstract publish(triggerName: string, payload: any): Promise<void>;
  publish() {
    throw new Error('GoogleLogginPubSub.publish not supported');
  }
}

module.exports = { GoogleLoggingPubSub };
