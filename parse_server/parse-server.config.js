require('dotenv').config()
const path = require('path')

module.exports = {
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  databaseURI: process.env.DB_URI,
  port: process.env.PARSE_SERVER_PORT,
  mountPath: process.env.PARSE_END_POINT,
  serverURL: `http://localhost:${process.env.PARSE_SERVER_PORT}${process.env.PARSE_END_POINT}`,
  cloud: path.join(__dirname, 'cloud.js'),
  auth: {
    myauth: {
      module: require('./my-auth'),
      option1: 'id'
    },
  },
}
