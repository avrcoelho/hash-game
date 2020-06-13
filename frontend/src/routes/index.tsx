import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Access from '../pages/Access';

import Route from './Route';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Access} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
