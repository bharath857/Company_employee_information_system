var express = require('express');
var router = new express.Router()
const url = require('url');
const auth = require('../middleware/auth');
const Employees = require('../models/Employees');


router.post('/Employees', (req, res) => {
    const employees = new Employees(req.body)
    employees.save().then(() => {
        res.send(employees)
    }).catch((error) => {
        res.status(400).send(error)//error.message check for password
    })
})

router.post('/Employees/login', async (req, res) => {
    try {
        const employee = await Employees.adminLogin(req.body)
        const token = await employee.generateTokens()
        res.send({ employee })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/myProfile', auth, async (req, res) => {
    console.log(req)
    res.send(req.employees)

})

router.get('/listallEmployees', auth, async (req, res) => {

    try {
        const employee = await Employees.find({})
        res.send(employee)
    } catch (e) {
        res.status(500).send({ error: 'asdf' })
    }
})

router.post('/Employees/logout', auth, async (req, res) => {
    try {
        console.log(req.token)
        //to log out from all sessions req.employees.tokens = []
        req.employees.tokens = req.employees.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.employees.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/Employees/findbyid/:id', (req, res) => {
    const id = req.params.id
    Employees.findById(id).then((employees) => {
        res.send(employees)
        console.log(employees)
    }).catch((error) => {
        res.status(500).send();
    })
})

router.get('/Employees/findbyempid/:Emp_Id', (req, res) => {
    const Emp_Id = req.params
    Employees.find(Emp_Id).then((employees) => {
        res.send(employees)
        // console.log(employees)
    }).catch((error) => {
        res.status(500).send();
    })
})

router.get('/Employees/findbyname/:Emp_Name', (req, res) => {
    const Empname = req.params
    Employees.find(Empname).then((employees) => {
        res.send(employees)
        console.log(employees)
    }).catch((error) => {
        res.status(500).send();
    })
})

router.get('/Employees/findbyphone/:phoneNumber', (req, res) => {
    const ph = req.params
    Employees.find(ph).then((employees) => {
        res.send(employees)
        console.log(employees)
    }).catch((error) => {
        res.status(500).send();
    })
})
router.get('/Employees/findSubordinates/:RepotingTo', (req, res) => {
    const report = req.params

    Employees.find(report).then((employees) => {
        res.send(employees)
        console.log(employees)
    }).catch((error) => {
        res.status(500).send();
    })
})


router.patch('/Employees/findbyid/:id', async (req, res) => {
    const update = Object.keys(req.body)
    const updatescanbedone = ['Company_Name', 'Emp_Name', 'phoneNumber', 'age', 'email', 'password', 'Role', 'Division', 'RepotingTo'];

    const validation = update.every((update) => updatescanbedone.includes(update))

    if (!validation) {
        return res.status(404).send({ error: 'invalid update' })
    }

    try {
        //const employee = await  Employees.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
        const employee = await Employees.findById(req.params.id)
        update.forEach((update) => {
            employee[update] = req.body[update]
        })
        await employee.save();
        res.send(employee)
    } catch (error) {
        res.status(404).send()
    }
})

router.delete('/Employees/findbyid/:id', async (req, res) => {

    try {
        const employee = await Employees.findByIdAndDelete(req.params.id)
        if (!employee) {
            return res.status(404).send()
        }
        res.send(employee)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
