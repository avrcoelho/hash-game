import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();

  return createConnection(options);
};
