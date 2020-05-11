import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import App from '../../App';

it('renders without crashing', () => {
  const component = createShallow()(<App/>);
  expect (component.length).toBe(1);
});
