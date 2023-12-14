const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const UserSessions = require('../db/models/Sessions')
const ErrorLog = require('../db/models/ErrorLog')
const {secretKey} = require( "../config/config" );


async function signup(req, res) {
    try {
        const { firstname, lastname, email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName: firstname, lastName: lastname, email, password: hashedPassword });

        if(user){
            const token = jwt.sign({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }, secretKey, {expiresIn: '5d'});

            const expireAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            await UserSessions.create({
                userId: user.id,
                tokenType: 'access',
                token,
                expireAt
            });

            res.status(201).json({
                token: token,
            });
        }


    } catch (error) {
        await ErrorLog.create({
            errorMessage: error.message,
        });
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

        if(isValidPassword){
            const token = jwt.sign({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }, secretKey, {expiresIn: '5d'});

            const expireAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            await UserSessions.create({
                userId: user.id,
                tokenType: 'access',
                token,
                expireAt
            });

            res.status(201).json({
                token: token,
            });
        } else {
            res.status(401).json({error: "Invalid Password"});
        }


    } catch (error){
        res.status(500).json({error});
    }
}

module.exports = {signup, login};