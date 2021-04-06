'use strict';

var express = require('express');
var router = express.Router();
const {queryVote, createVote} = require('../services/vote');

router.get('/get/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryVote(req, contract);
    res.json(result);
  })

router.post('/set', async function (req, res) {
    const contract = req.contract;
    let result = await createVote(req, contract);
    res.json(result);
  })

module.exports = router;