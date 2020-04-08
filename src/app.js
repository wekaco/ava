// riot js migration
import { component } from 'riot';
import App from './app.riot';

import {
  client,
  Query,
} from './graphql.client';


const init = () => {
  const createApp = component(App);

  client.query({ query: Query, variables: {} })
    .then(({ data }) => {
      let id = data.id;
      createApp(document.getElementById('root'), { id, client });
    })
};

document.addEventListener('DOMContentLoaded', init, false);
