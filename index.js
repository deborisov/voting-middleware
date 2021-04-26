  const express = require('express');
  let connectToContract = require('./connect');
  let config = require('./config.json');
  let gateway;
  let network;
  var vote = require('./routes/vote_router');
  var voting = require('./routes/voting_router');
  
  const app = express();
  app.use(express.json());      
  app.use(express.urlencoded());  

  connectToContract(config).then(function(connection){
    gateway = connection.gateway;
    network = connection.network;
    console.log('- connection to fabric network ready')

    app.get('/', function (req, res) {
      res.json({msg:'hello fabric api'});
    })

    app.use('/vote', async function(req, res, next) {
      req.contract = await network.getContract(config.voteCC);
      next();
    }, vote);

    app.use('/voting', async function(req, res, next) {
      req.contract = await network.getContract(config.votingCC);
      next();
    }, voting);

    app.use((error, req, res, next) => {
      return res.status(500).json({ error: error.toString(), body: null});
    });

    // finally we start the api server
    app.listen(80, function(){	
      console.log('- api server started listening on port 3000!');
    });	
  })


process.on('SIGINT', async function  () {
  console.log("Caught interrupt signal -  start disconnect from the gateway");
    await gateway.disconnect();
    process.exit();
});