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

const bcrypt = require('bcryptjs');

const encriptionDemo = async()=>{
    const password = 'superman@1234'
    const hashedpassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedpassword)

    const checkequal = await bcrypt.compare('superman@1234', hashedpassword)
    
    console.log(checkequal)
}

//encriptionDemo()

const jwt = require('jsonwebtoken');

const jwtDemo = async()=>{
    const token = jwt.sign({_id:'unique'}, 'stringtobeevaluated',{expiresIn:'5 hours'})
    console.log(token)

    const equals = jwt.verify(token, 'stringtobeevaluated')
    console.log(equals)
}

//jwtDemo()