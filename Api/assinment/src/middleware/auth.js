const jwt = require('jsonwebtoken');
const Employees = require('../models/Employees');

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization')
        const decode = jwt.verify(token, 'stringtobereplased')
        const employees = await Employees.findOne({ _id: decode._id, 'tokens.token': token })

        if (!employees) {
            throw new Error()
        }
        req.token = token
        req.employees = employees
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authantiacite' })
    }
}

module.exports = auth