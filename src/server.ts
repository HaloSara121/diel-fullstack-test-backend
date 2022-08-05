import bodyParser from 'body-parser'
import express from 'express'
import router from './router'
import cors from "cors"
import 'dotenv/config'

const server = express()

server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");

  next();
});
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(router)

server.listen(8080, () => console.log('server is running'))
