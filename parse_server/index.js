require('dotenv').config()
const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const log = require('../utils/log')

const app = express()
const parseDashboard = new ParseDashboard(require('./parse-dashboard.config'), {
  allowInsecureHTTP: true
})
const parseServer = new ParseServer(require('./parse-server.config'))

app.use((request, response, next) => {
  console.log(`${log.time()} - ${log.text(`${request.ip} -> ${request.method} -> ${request.path} `)}`)
  next()
})
app.use(process.env.PARSE_END_POINT, parseServer)
app.use('/', parseDashboard)

const port = process.env.PARSE_SERVER_PORT
app.listen(port, () => {
  console.log(`${log.time()} - ${log.text('Server started')}`)
})
