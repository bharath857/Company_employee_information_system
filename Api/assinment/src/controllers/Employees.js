var express= require('express');
var router = new express.Router()
const url = require('url');
const Employees = require('../models/Employees');
const { db } = require('../models/Employees');


router.post('/Employees', (req, res) => {
    //req.body.Emp_Id
    const employees = new Employees(req.body)
    employees.save().then(() => {
        res.send(employees)
    }).catch((error) => {
        res.status(400).send(error)
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
})

router.post('/employee/login', async (req, res) => {
    
    try{
        console.log("in")
        console.log(req.body)
        const employee = await Employees.adminLogin(req.body.email, req.body.password)

        res.send(employee)
    } catch(error){
        res.send(500).send()
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
})

router.get('/Employees',(req, res)=>{
    Employees.find({}).then((employees)=>{
        res.send(employees)
    }).catch((error)=>{
        res.send(500).send()
    })
})

router.get('/Employees/findbyid/:id',(req, res)=>{
    const id = req.params.id
    console.log(id)
    Employees.findById(id).then((employees)=>{
        res.send(employees)
        console.log(employees)
    }).catch((error)=>{
        console.log('No match')
        res.send(500).send();
    })
}) 

router.get('/Employees/findbyempid/:Emp_Id',(req, res)=>{
    const Emp_Id = req.params
    Employees.find(Emp_Id).then((employees)=>{
        res.send(employees)
        console.log(employees)
    }).catch((error)=>{ 
        console.log('No match')
        res.send(500).send();
    })
})

router.get('/Employees/findbyname/:Emp_Name',(req, res)=>{
    const Empname = req.params
    Employees.find(Empname).then((employees)=>{    
        res.send(employees)
        console.log(employees)
    }).catch((error)=>{ 
        console.log('No match')
        res.send(500).send();
    })
})

router.get('/Employees/findbyphone/:phoneNumber',(req, res)=>{
    const ph = req.params
    Employees.find(ph).then((employees)=>{
        res.send(employees)
        console.log(employees)
    }).catch((error)=>{ 
        console.log('No match')
        res.send(500).send();
    })
})
router.get('/Employees/findSubordinates/:RepotingTo',(req, res)=>{
    const report = req.params
    Employees.find(report).then((employees)=>{
        res.send(employees)
        console.log(employees)
    }).catch((error)=>{ 
        console.log('No match')
        res.send(500).send();
    })
})

router.get('/Employees/findSup/:RepotingTo',(req, res)=>{
    const report = req.params
    Employees.find(report).then((employees)=>{
        res.send(employees)
        console.log(employees)
    }).catch((error)=>{ 
        console.log('No match')
        res.send(500).send();
    })
})

router.patch('/Employees/findbyid/:id', async (req, res)=>{
    const update = Object.keys(req.body)
    const updatescanbedone = ['Company_Name', 'Emp_Name', 'Emp_Id', 'phoneNumber', 'age', 'email', 'password','Role', 'Division', 'RepotingTo'];

    const validation = update.every((update)=> updatescanbedone.includes(update))

    if (!validation){
        return res.status(404).send({error:'invalid update'})
    }
    try{
        const employee = await  Employees.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
        res.send(employee)
    } catch(error){
        res.send(404).send()
    }
})

router.delete('/Employees/findbyid/:id', async (req, res)=>{
    
    try{
        const employee = await  Employees.findByIdAndDelete(req.params.id)
        if(!employee){
            return res.status(404).send()
        }
        res.send(employee)
        console.log(employee)
    } catch(error){
        res.send(500).send()
    }
})


module.exports = router