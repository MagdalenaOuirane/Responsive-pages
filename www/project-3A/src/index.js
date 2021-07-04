const express = require('express')
const crypto = require('crypto')
const { users, schedules } = require('./data')

const app = express()

//Body parser
app.use(express.json())

const PORT = 3000

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our schedule website!' })
})

//get all users
app.get('/users', (req, res) => res.json(users))

//get specific user
app.get('/users/:userIndex', (req, res) => {
  const userObj = users[req.params.userIndex]

  if (!userObj) {
    return res.status(404).json('Object Does Not Exist')
  }

  res.json(userObj)
})

//get all schedules
app.get('/schedules', (req, res) => res.json(schedules))

//get specific schedule by ID
app.get('/users/:userId/schedules', (req, res) => {
  const newSchedules = []
  for (const el of schedules) {
    if (parseInt(req.params.userId) === el.user_id) {
      newSchedules.push(el)
    }
  }
  res.json(newSchedules)
})

//create new term
app.post('/schedules', (req, res) => {
  const newSchedule = {
    user_id: req.body.user_id,
    day: req.body.day,
    start_at: req.body.start_at,
    end_at: req.body.end_at,
  }

  if (
    !newSchedule.user_id ||
    !newSchedule.day ||
    !newSchedule.start_at ||
    !newSchedule.end_at
  ) {
    return res.status(404).json({ msg: 'Please include all informations' })
  }

  schedules.push(newSchedule)
  res.json(schedules)
})

//create new user
app.post('/users', (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  }

  if (
    !newUser.firstname ||
    !newUser.lastname ||
    !newUser.email ||
    !newUser.password
  ) {
    return res
      .status(404)
      .json({ msg: 'Please include firstname, lastname, email and password' })
  }
  newUser.password = crypto
    .createHash('sha256')
    .update(newUser.password)
    .digest('hex')
  users.push(newUser)
  res.json(users)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
