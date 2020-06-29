import {isValidId, validateRecord} from "../utils";

const express = require('express');
const router = express.Router();
const quires = require('../db/quires');

router.get('/', async (req, res, next) => {
    const message = await quires.consultation_records.getAll()
    if (message) {
        res.json({
            message: message
        })
    } else {
        res.status(404);
        next(new Error('Not found'))
    }
})

router.get('/:userId', isValidId, async (req, res, next) => {
    const {userId} = req.params;
    // console.log('userId:',userId)
    const user = await quires.users.getOne(userId)
    const {clinic_name} = user;
    const message = await quires.consultation_records.getOneClinic(clinic_name)
    // console.log('message:',message)
    if (message) {
        res.json({
            message: message
        })
    } else {
        res.status(404);
        next(new Error('Not found'))
    }
})

router.post('/', async (req, res, next) => {
    const user = await quires.users.getOne(req.body.userId)
    if(user){
        const {clinic_name} = user;
        const {doctor_name,patient_name,diagnosis,medication,consultation_fee,follow_up} = req.body;
        const body = {
            clinic_name: clinic_name,
            doctor_name: doctor_name,
            patient_name: patient_name,
            diagnosis: diagnosis,
            medication: medication,
            consultation_fee: consultation_fee,
            follow_up: follow_up,
        }
        if (validateRecord(body)) {
            const record = {
                ...body,
                created_at: new Date()
            }
            // console.log(`record:`, record);
            const message = await quires.consultation_records.create(record);
            if (message) {
                res.json({
                    message: message
                })
            } else {
                res.status(422);
            }
        }
        else {
            next(new Error('Invalid information'))
        }
    }
    else{
        res.status(403);
        next(new Error('Unauthorized'))
    }
})

module.exports = router;


// export const config = {
//     knex: {
//         // just the usual knex configuration
//         client: 'postgres',
//         connection: {
//             host: process.env.PG_HOST,
//             database: process.env.PG_DB,
//             user: process.env.PG_USER,
//             password: process.env.PG_PASSWORD,
//         },
//         pool: {
//             min: 2,
//             max: 10
//         },
//         migrations: {
//             tableName: 'knex_migrations'
//         }
//     },
//     dbManager: {
//         // db manager related configuration
//         collate: ['fi_FI.UTF-8', 'Finnish_Finland.1252'],
//         superUser: process.env.PG_SUPER_USER,
//         superPassword: process.env.PG_SUPER_PASSWORD,
//         populatePathPattern: 'data/**/*.js', // glob format for searching seeds
//     },
// };
