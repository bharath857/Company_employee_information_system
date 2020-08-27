const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const EmployeesSchyme = new mongoose.Schema({
    Company_Name: {
        type: String,
        required: true
    },
    Emp_Name: {
        type: String,
        required: true
    },
    Emp_Id: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
    },
    age: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot have "password" in password')
            }
        }
    },
    Role: {
        type: String,
        required: true
    },
    Division: {
        type: String,
        required: true
    },
    RepotingTo: {
        type: String,
        required: true
    },
})

EmployeesSchyme.statics.adminLogin = async (email, password)=>{

    if(!(email.includes('bharath@gmail.com') & password.includes('asdf!@#$'))){
        throw new Error('invalid login');
    }
     const employees = await Employees.findOne({ email })
    
    if(!employees){
        throw new Error('invalid login')
    }

    return employees 
}

EmployeesSchyme.pre('save', function(next){
    const employees = this
    next();
})

const Employees = mongoose.model('Employees', EmployeesSchyme)
module.exports = Employees