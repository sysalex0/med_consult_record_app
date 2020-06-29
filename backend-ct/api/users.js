const express = require('express');
const router = express.Router();
const quires = require('../db/quires');

router.get('/', async (req, res, next) => {
    const message = await quires.users.getAll()
    if (message) {
        res.json({
            message: message
        })
    } else {
        res.status(404);
        next(new Error('Users not found'))
    }
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    const message = await quires.users.getOne(id)
    if (message) {
        res.json({
            message: message
        })
    } else {
        res.status(404);
        next(new Error('user not found'))
    }
})

router.get('/:email', async (req, res, next) => {
    const {email} = req.params;
    const message = await quires.users.getOneByEmail(email)
    if (message) {
        res.json({
            message: message
        })
    } else {
        res.status(404);
        next(new Error('email not found'))
    }
})

module.exports = router;

