const express= require('express');
const app= express(); 

const Employeesrouter = require('./controllers/Employees')

const connection = require('./database/mongoose');
const Employees = require('./models/Employees')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(Employeesrouter)

app.listen(port, () => {
    console.log('Server running in ' + port)
})