require('dotenv').config()

module.exports = {
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  databaseURI: process.env.DB_URI,
  port: process.env.PARSE_SERVER_PORT,
  mountPath: process.env.PARSE_END_POINT,
}
