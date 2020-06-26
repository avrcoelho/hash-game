import App from './App';

const app = new App();

app.server.listen(process.env.PORT, () => {
  console.log('🚀 server started on port 3333');
});
