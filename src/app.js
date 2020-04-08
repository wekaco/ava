// riot js migration
import { component } from 'riot';
import App from './app.riot';

const init = () => {
  const createApp = component(App);

  createApp(document.getElementById('root'), { });
};

document.addEventListener('DOMContentLoaded', init, false);
