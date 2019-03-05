import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import userCtr from './controllers/user-controller'

// var sslOptions = {
//   key: fs.readFileSync('../../cert/key.pem'),
//   cert: fs.readFileSync('../../cert/cert.pem')
// };
const app = express();
const SERVER_PORT = process.env.WEBAPI_PORT || 3000;
/**
 * Middleware handlers
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json({ limit: 1e6 }));
app.get('/users', userCtr.list);

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server start at port ${SERVER_PORT}`)
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(1);
  });
});