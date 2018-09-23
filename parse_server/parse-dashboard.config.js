require('dotenv').config()

module.exports = {
  apps: [
    {
      serverURL: `http://localhost:${process.env.PARSE_SERVER_PORT}${process.env.PARSE_END_POINT}`,
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      appName: process.env.APP_NAME,
    }
  ],
  users: [
    {
      user: 'admin',
      pass: '$2y$12$bUNLUABeCID47ZXouI7Ries38etO2hhLvFYYjGjl/fLIY0zOHhLqO'
    }
  ],
  useEncryptedPasswords: true,
}
