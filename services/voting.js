'use strict';

async function createVoting(req, contract) {
  let id = req.body.id.toString();
  let description = req.body.description.toString();
  let initiator_id = req.body.initiator_id.toString();
  let voting_status = req.body.voting_status.toString();
  let start_date = req.body.start_date.toString();
  let expiry_date = req.body.expiry_date.toString();
  let comments_enabled = req.body.comments_enabled.toString();
  try {
    await contract.submitTransaction('createVoteEntity', id, description, initiator_id, voting_status, start_date, expiry_date, comments_enabled);
    let r = 'Transaction has been successfully submitted. Vote created. ';
    return r;
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}

async function queryVoting(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryVoteEntity',queryId);
    let r = {
      id: queryId,
      value: result.toString()
    };
    return r;
  } catch(err){
    let r = {result:'Failed to evaluate transaction: '+err};
    return r; 
  }
}

module.exports = {queryVoting, createVoting}