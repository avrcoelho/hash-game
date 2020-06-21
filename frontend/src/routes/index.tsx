import React from 'react';
import { Switch } from 'react-router-dom';

import Access from '../pages/Access';
import Invite from '../pages/Invite';
import AccessPlayer2 from '../pages/AccessPlayer2';
import Game from '../pages/Game';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Access} />
    <Route path="/invite/:id" component={Invite} />
    <Route path="/player2/:id" component={AccessPlayer2} />
    <Route path="/game/:id" component={Game} />
  </Switch>
);

export default Routes;
