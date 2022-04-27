const events = require('express').Router()
const db = require('../models')
const { event, meet_greet, set_time, stage, Band, stage_events } = db
const { Op } = require('sequelize')
const Stages = require('./stage_controller')

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await event.findAll({
            order: [['date', 'ASC']]
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await event.findOne({
            where: { name: req.params.name },
            // Couldn't get the code below to work. Kept getting a 500 error when going to the endpoint
            // include: [
            //     {
            //         model: meet_greet,
            //         as: "meet_greets",
            //         include: {
            //             model: Band,
            //             as: "band",
            //         }
            //     },
            //     {
            //         model: set_time,
            //         as: "set_times",
            //         include: [
            //             {
            //                 model: Band,
            //                 as: "band",
            //             },
            //             {
            //                 model: stage,
            //                 as: "stage"
            //             }
            //         ]
            //     },
            //     {
            //         model: stage,
            //         as: "stages",
            //         include: {
            //             model: stage_events,
            //             as: "StageEvent"
            //         }

            //     }
            // ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE AN EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE AN EVENT
events.put('/:name', async (req, res) => {
    try {
        const updatedEvents = await event.update(req.body, {
            where: {
                name: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE AN EVENT
events.delete('/:name', async (req, res) => {
    try {
        const deletedEvents = await event.destroy({
            where: {
                name: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = events