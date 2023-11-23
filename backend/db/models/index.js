'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../../config/database.js')[env]
const db = {}

const readReplicas = [
  {
    port: 5433
  }
]

// Write replica configuration
const writeReplica = {
  port: 5432
}

// Sequelize connection options
const sequelizeOptions = {
  dialect: 'postgres',
  replication: {
    read: readReplicas,
    write: writeReplica
  },
  pool: {
    max: 20,
    idle: 30000
  }
}

let sequelize
if (config.use_env_variable) {
  // sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);
  // sequelize = new Sequelize(process.env[config.use_env_variable], config);

  const primary = process.env.PRIMARY_REGION
  const current = process.env.FLY_REGION
  const db_url = process.env.DATABASE_URL

  if (!primary || !current || primary === current) {
    sequelize = new Sequelize(process.env.DATABASE_URL)
    console.log('DB connected in Region: ', current)
  } else {
    const u = new URL(db_url)
    u.port = '5433'

    // console.log("URL JSON :",  u)
    // console.log("URL String :",  u.toString())
    console.log(`primary:  ${primary}`)
    // console.log(`current:  ${current}`)
    console.log(`Read Rep DB connected in ${current}`)

    sequelize = new Sequelize(u.toString())
  }
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connected to the database!!!!!');
//     // console.log(`FLY REGION: ${process.env.FLY_REGION}`);
//     // console.log(sequelize.getDatabaseName());
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//   }
// })();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
