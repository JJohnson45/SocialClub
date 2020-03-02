const { Router } = require('express');
const chatkitRouter = Router();
const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:c505ed27-4164-40ae-93c1-3c5e0f669521',
  key: '42ade2ac-932c-4653-9ce2-d0807ef066ef:rQ7Fb9xKgW/sQDI2OypBm5HdpPdAGDsFij8mQTcPMvk=',
})


chatkitRouter.post('/users', (req, res) => {

chatkit.createUser({
        id: req.body.id,
        name: req.body.name,
      })
      .then(res => {
          res.send(reply)
      })
      .catch(err => {
          res.send(err)
      })
})

chatkitRouter.post('/rooms', (req, res) => {
  chatkit.createRoom({
    id: req.body.id,
    creatorId: req.body.creatorId,
    name: req.body.name
  }) .then(() => console.log(`Room created: ${req.body.id}`))
  .catch(err => console.log(err))
})

module.exports = {
    chatkitRouter,
  };
