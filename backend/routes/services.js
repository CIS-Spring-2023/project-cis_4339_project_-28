// implement backend functionalities here
//See if I can use the any of previous files for starter
//@wakindo
// Try to create Service schema with Module 8 lecture and try this out
const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET 20 most recent services for org
router.get('/', (req, res, next) => {
  services
    .find({ orgs: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    .sort({ updatedAt: -1 })
    .limit(20)
})

// GET single service by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  services.findOne({ _id: req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.json(data)
    }
  })
})

// POST new service
router.post('/', (req, res, next) => {
  const newService = req.body
  newService.orgs = [org]
  services.create(newService, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT / Update service
router.put('/update/:id', (req, res, next) => {
  console.log(req.body)
  services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      //console.log(error)
      //console.log(data)
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// hard DELETE Service by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  services.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.send('Service deleted')
    }
  })
})

module.exports = router
