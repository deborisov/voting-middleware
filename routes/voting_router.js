'use strict';

var express = require('express');
var router = express.Router();
const {queryVoting, createVoting, queryHistory} = require('../services/voting');

router.get('/get/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryVoting(req, contract);
    res.json(result);
  });

  router.get('/getHistory/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryHistory(req, contract);
    res.json(result);
  });

router.post('/set', async function (req, res) {
    const contract = req.contract;
    let result = await createVoting(req, contract);
    res.json(result);
  });

module.exports  = router;