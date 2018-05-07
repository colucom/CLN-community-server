module.exports = {
  secret: 'secret',
  ipfs: {
    host: 'qa-ipfs.colu.com',
    port: 443,
    protocol: 'https'
  },
  mongo: {
    uri: 'mongodb://localhost/CLN-community-app',
    options: {
      user: process.env.MONGO_COMMUNITY_USER,
      pass: process.env.MONGO_COMMUNITY_PASS,
      authSource: process.env.MONGO_AUTH_SOURCE
    }
  }}
