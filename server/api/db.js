const { Router } = require('express');
const dbRouter = Router();
const { saveEvent, getCreatedEvents, addUser } =require('../db/index.js')


dbRouter.post('/events', (req,res) =>{
    console.log(req)
saveEvent(req.body)
})

dbRouter.get(`/events/:name`, (req,res) => {
    console.log(req.params)
getCreatedEvents(req.params.name)
})

dbRouter.get('/users', (req,res) =>{

});

dbRouter.post('/users', (req,res) =>{
    addUser(req.body)
});

module.exports = {
    dbRouter
}