import express from 'express';

// rest of the code remains same
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Welcome to Tormentum API'));

app.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`⚡️[tormentum-api]: Server is running at http://localhost:${PORT}`);
});
