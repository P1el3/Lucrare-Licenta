//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const {parse} = require("dotenv");
const secretKey = "seIaLicentaVere"
// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const {name, email, password, agencyname, agencyphone} = req.body;

        const existingUser = await User.findOne({where: {email: email}});
        if (existingUser) {
            return res.status(409).send({message: "User already exist"});
        }
        const data = {
            name,
            email,
            password: await bcrypt.hash(password, 10),
            agencyname,
            agencyphone
        };
        //saving the user
        const user = await User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({id: user.id}, secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60, httpOnly: true});
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                let token = jwt.sign({id: user.userid}, secretKey, {
                    expiresIn: '1d'
                });
                let id = user.userid;

                res.cookie("jwt", token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});

                return res.status(200).json({
                    message: "Authentication successful",
                    token: token,
                    id: id
                });
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).json({message: "Authentication failed"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occurred", error: error.message});
    }
};

//verifica daca exista agentia
const isAgency = async (req, res) => {
    try {

        const userId = parseInt(req.params['id'])
        if (!userId) {
            return res.status(401).send("No user found.");
        }

        const user = await User.findOne({
            where: {
                userid: userId
            }
        });
        if (user.agencyname && user.agencyphone) {
            return res.status(200).json({
                message: "Agency exists.",
                agencyname: user.agencyname,
                agencyphone: user.agencyphone
            });
        } else if (user) {
            return res.status(200).json({
                message: "No agency found."
            });
        } else {
            return res.status(404).json({
                message: "User not found."
            });
        }
    } catch (error) {
        console.error("isAgency error: ", error);
        return res.status(500).json({
            message: "An error occurred",
            error: error.message
        })
    }
}

module.exports = {
    signup,
    login,
    isAgency,
};