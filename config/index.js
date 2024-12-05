require("dotenv/config")

const {env} = process
const config = {
    port: env.PORT || 4000, 
    mongoDb: env.MONGO_DB
}

module.exports = config;