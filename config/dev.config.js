let config = {}

config.dbHost = process.env.dbHost || "localhost"
config.dbPort = process.env.dbPort || "27017"
config.dbName = process.env.dbName || "pms"
config.serverPort = process.env.serverPort || 8080

export default config