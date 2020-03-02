const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config');

const connection = mysql.createConnection(mysqlConfig);
const query = util.promisify(connection.query).bind(connection);

const saveEvent = (req, res) => {
    query(`INSERT INTO events (creator_id, name, time, category, address, summary) VALUES ((SELECT id FROM users WHERE name="${req.creator}"), "${req.name}", "${req.date}", "${req.category}", "${req.address}", "${req.summary}")`)
    .then(console.log('Event added'))
    .catch(err => {
        console.log(err)
    })
}

const getCreatedEvents = (req, res) => {
    const  id = req
    return query(`SELECT * FROM events WHERE creator_id=${id}`)
}

const addUser = (req, res) => {
    const { username, email } = req
    query(`INSERT IGNORE INTO users (name, email) VALUES ("${username}", "${email}")`)
}

const selectUser = (req, res) => {
    const userEmail= req
    return query(`SELECT id FROM users WHERE email="${userEmail}"`)
}

const getAllEvents = (req, res) => {
    return query('SELECT * FROM events')
}

const getEventPage = (req, res) => {
    const id = req
    return query(`SELECT * FROM events WHERE id="+${id}"`)
}

const rsvp = (req, res) => {
    console.log(req);
    const eventId = req.eventId;
    const userId = req.userId;
    return query(`INSERT INTO rsvp (user_id, event_id) VALUES (${userId}, ${eventId})`);
}
 
module.exports = {
    saveEvent,
    getCreatedEvents,
    addUser,
    getAllEvents,
    selectUser,
    getEventPage,
    rsvp,
}