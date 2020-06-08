import App from './App';

const app = new App();

app.server.listen(3333, () => {
  console.log('🚀 server started on port 3333');
});
