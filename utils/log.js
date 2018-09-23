const moment = require('moment')
const chalk = require('chalk')

function time() {
  return chalk.blue(moment().format('lll'))
}

function text(text) {
  return chalk.gray(text)
}

function warning(text) {
  return chalk.yellow(text)
}

function error(text) {
  return chalk.red(text)
}

module.exports = {
  time,
  text,
  warning,
  error,
}
