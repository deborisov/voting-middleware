'use strict';
async function createVote(req, contract) {
  let id = req.body.id.toString();
  let voting_id = req.body.voting_id.toString();
  let user_id = req.body.user_id.toString();
  let choice = req.body.choice.toString();
  let comment = req.body.comment.toString();
  try {
    await contract.submitTransaction('createVoteChoice', id, voting_id, user_id, choice, comment);
    let r = 'Transaction has been successfully submitted. Choice created. ';
    return r;
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}

async function queryVote(req, contract) {
  let queryId = req.params.id;
  try {
    let result = await contract.evaluateTransaction('queryVoteChoice',queryId);
    let r = {
      id: queryId,
      value: result.toString()
    };
    return r;
  } catch(err){
    let r = {result:'Failed to evaluate transaction: '+ err};
    return r; 
  }
}

  module.exports = {queryVote, createVote}