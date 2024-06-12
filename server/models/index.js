//importing modules
const {Sequelize, DataTypes} = require('sequelize')


const sequelize = new Sequelize(`postgres://piele:piele@localhost:5432/licenta`, {dialect: "postgres"})

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./userModel') (sequelize, DataTypes)
db.agentii = require('./agencyModel') (sequelize, DataTypes)
//exporting the module
module.exports = db