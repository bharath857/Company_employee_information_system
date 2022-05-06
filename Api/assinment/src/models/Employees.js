const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
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
    password: {
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
    AdminAccess: {
        type: Boolean
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

EmployeesSchyme.methods.toJSON = function () {
    const employee = this
    const employeeObject = employee.toObject()

    delete employeeObject.password

    return employeeObject
}

EmployeesSchyme.methods.generateTokens = async function () {
    const employees = this
    const token = jwt.sign({ _id: employees._id.toString() }, 'stringtobereplased')

    employees.tokens = employees.tokens.concat({ token })
    await employees.save()
    return token
}
// before saving
EmployeesSchyme.pre('save', async function (next) {

    const employees = this

    if (employees.isModified('password')) {
        employees.password = await bcrypt.hash(employees.password, 8)
    }
    next();
})

//Login validation
EmployeesSchyme.statics.adminLogin = async (credential) => {
    const email = credential.email;
    let UserGivenpassword = credential.password;

    const employees = await Employees.findOne({ email })

    if (!employees) {
        throw new Error('invalid login1');
    }
    if (!(await bcrypt.compare(UserGivenpassword, employees.password))) {
        throw new Error('invalid login2');
    }
    if (!employees.AdminAccess) {
        throw new Error('invalid login3');
    }
    return employees
}

const Employees = mongoose.model('Employees', EmployeesSchyme) // making separete schema but mangoose will do internally--Middleware

module.exports = Employees
