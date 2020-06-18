import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Access from '../pages/Access';
import Invite from '../pages/Invite';

import Route from './Route';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Access} />
      <Route path="/invite/:id" component={Invite} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
