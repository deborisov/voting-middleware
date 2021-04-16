'use strict';

var express = require('express');
var router = express.Router();
const {queryVote, createVote, queryHistory, queryVoteByUserId, queryVoteByVotingId, queryVoteByVotingUserPair} = require('../services/vote');

router.get('/get/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryVote(req, contract);
    res.json(result);
  });

  router.get('/getHistory/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryHistory(req, contract);
    res.json(result);
  });

  router.get('/getVotesByUserId/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryVoteByUserId(req, contract);
    res.json(result);
  });

  router.get('/getVotesByVotingId/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryVoteByVotingId(req, contract);
    res.json(result);
  });

  router.get('/getVotesByVotingUserPair/:id', async function (req, res) {
    const contract = req.contract;
    let result = await queryVoteByVotingId(req, contract);
    res.json(result);
  });

router.post('/set', async function (req, res) {
    const contract = req.contract;
    let result = await createVote(req, contract);
    res.json(result);
  });

module.exports = router;