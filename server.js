// DEPENDENCIES
const express = require('express')
const { Sequelize } = require('sequelize')

const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SEQUELIZE CONNECTION
const sequelize = new Sequelize({password: "Hype_woo24", username: "postgres", host: "localhost", port: 5432, database: "music_tour", dialect: "postgres"})

const connect = async () => {
    try {
        await sequelize.authenticate()
        console.log('authenticated!!')
    } catch(err) {
        console.error(`Unable to connect to PG: ${err}`)
    }
    
}

connect()

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)

const stageController = require('./controllers/stage_controller')
app.use('/stages', stageController)

const eventController = require('./controllers/event_controller')
app.use('/events', eventController)


// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})