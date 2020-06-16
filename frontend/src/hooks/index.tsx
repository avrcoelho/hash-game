import React from 'react';

import { IntegrationProvider } from './integration';

const AppProvider: React.FC = ({ children }) => (
  <IntegrationProvider>{children}</IntegrationProvider>
);

export default AppProvider;
