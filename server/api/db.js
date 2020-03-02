const { Router } = require('express');
const dbRouter = Router();
const { 
        saveEvent,
        getCreatedEvents,
        addUser,
        selectUser,
        getAllEvents,
        getEventPage,
        rsvp,
    } = require('../db/index.js')



dbRouter.post('/events', (req,res) =>{
saveEvent(req.body)
})

dbRouter.get(`/events/:id`, (req,res) => {
getCreatedEvents(req.params.id)
.then(data => {
    console.log(data)
    res.send(data)})
})

dbRouter.get('/users/:email', (req , res) =>{
    selectUser(req.params.email, res)
    .then(data => res.send(data))
});

dbRouter.post('/users', (req,res) =>{
    addUser(req.body)
});

dbRouter.get('/events', (req,res) =>{
    getAllEvents()
        .then((events) => {
            res.send(events);
        })
});

dbRouter.get('/events/page/:id', (req,res) =>{
    getEventPage(req.params.id)
    .then(data => 
        res.send(data))
});

dbRouter.post('/rsvp', (req, res) =>{
    rsvp(req.body)
        .then(() => {
            res.send(true);
        })
        .catch(() => {
            res.send(false);
        });
});

module.exports = {
    dbRouter
}