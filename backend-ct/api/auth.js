import {validateLoginUser, validateUser} from "../utils";
import {saltRounds} from "../utils/constants";
import bcrypt from 'bcrypt'

const express = require('express');
const isString = require('lodash/isString');

const router = express.Router();
const quires = require('../db/quires')

router.post('/signup', async (req, res, next) => {
    if (validateUser(req.body)) {
        const emailUsed = await quires.users.getOneByEmail(req.body.email);
        const clinicNameUsed = await quires.users.getOneByClinicName(req.body.clinic_name);
        const phoneUsed = await quires.users.getOneByPhoneNumber(req.body.phone_number);
        if (!emailUsed && !clinicNameUsed && !phoneUsed) {
            const hashedPw = await bcrypt.hash(req.body.password, saltRounds);
            const user = {
                ...req.body,
                password: hashedPw,
                created_at: new Date()
            }
            const message = await quires.users.create(user);
            if (message) {
                res.json({
                    id: message[0],
                    message: "🐧"
                })
            } else {
                res.status(422);
            }
        } else {
            let errors = ``;
            if (emailUsed) {
                errors += `This email is already in used.\n`
            }
            if (clinicNameUsed) {
                errors += `This clinic name is already in used.\n`
            }
            if (phoneUsed) {
                errors += `This phone number is already in used.\n`
            }
            next(new Error(errors));
        }

    } else {
        next(new Error('Invalid input'))
    }
})

router.post('/signin', async (req, res, next) => {
    if (validateLoginUser(req.body)) {
        const emailUsed = await quires.users.getOneByEmail(req.body.email);
        if (emailUsed) {
            const isEqualPw = await bcrypt.compare(req.body.password, emailUsed.password)
            if (isEqualPw) {
                res.json({
                    id: emailUsed.id,
                    message: 'Login!'
                })
            } else {
                next(new Error('Wrong password'))
            }
        } else {
            next(new Error('Email not found'))
        }
    } else {
        next(new Error('Invalid input'))
    }

})


module.exports = router;
