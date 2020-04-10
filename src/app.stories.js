import { tag, mount } from '@storybook/riot';

import './app.riot';


export default { title: 'App Component' };
  
export const builtFromRawImport = () => {
  tag('test', '<div id="root"><App></App></div>', '', '', () =>{}) &&
  mount('test', {});
};
