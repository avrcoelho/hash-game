import App from './App';

const app = new App();

app.server.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 server started on port ${process.env.PORT || 3333}`);
});
