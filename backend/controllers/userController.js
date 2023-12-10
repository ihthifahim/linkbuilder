const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const {secretKey} = require( "../config/config" );


async function signup(req, res) {
    try {
        const { firstname, lastname, email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName: firstname, lastName: lastname, email, password: hashedPassword, username: username });
        res.status(201).json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function login(req, res){
    try{
        const { email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if(!user){
            return res.status(401).json({ error: "Invalid Email"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        const token = jwt.sign({userId: user.id}, secretKey, {expiresIn: '1h'});
        res.json({token});

    } catch (error){
        console.error(error);
    }
}

module.exports = {signup, login};