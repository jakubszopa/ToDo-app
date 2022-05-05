const express = require('express');
const mongodb = require('mongodb')
const db = require('../data/database');

const router = express.Router();

router.get('/', async function (req, res) {

    const items = await db.getDb().collection('tasks').find().toArray();
    console.log(items)
    res.render('index', {items: items});
});

router.post('/', async function (req, res) {

    const newTask = req.body.newToDo;

    await db.getDb().collection('tasks').insertOne({task: newTask, status: 0})
    res.redirect('/');
});

router.post('/delete', async function (req, res) {

    const reply = await db.getDb().collection('tasks').deleteMany({status: 0})

    res.redirect('/');
});

router.post('/statuschange', async function (req, res) {

    const id = mongodb.ObjectId(req.body.id);
    const status = +req.body.status

    if (status === 0) {
        result = await db.getDb().collection('tasks').updateOne(
            {_id: id},
            {$set: { status: 1 }
            }
        )
    } else if (status === 1) {
        result = await db.getDb().collection('tasks').updateOne(
            {_id: id},
            {$set: { status: 0 }
            }
        )
    }

    res.redirect(301, '/');
});

module.exports = router;