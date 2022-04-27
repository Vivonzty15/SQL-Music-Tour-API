const Stages = require('express').Router()
const db = require('../models')
const { stage, events } = db
const { Op } = require('sequelize')
const stage_events = require('../models/stage_events')

// FIND ALL STAGES
Stages.get('/', async (req, res) => {
    try {
        const foundStages = await stage.findAll()
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC STAGE
Stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await stage.findOne({
            where: { stage_name: req.params.name }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A STAGE
Stages.post('/', async (req, res) => {
    console.log('hit post endpoint')
    try {
        const newStage = await stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A STAGE
Stages.put('/:name', async (req, res) => {
    try {
        const updatedStages = await stage.update(req.body, {
            where: {
                stage_name: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// DELETE A STAGE
Stages.delete('/:name', async (req, res) => {
    try {
        const deletedStages = await stage.destroy({
            where: {
                stage_name: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})




module.exports = Stages