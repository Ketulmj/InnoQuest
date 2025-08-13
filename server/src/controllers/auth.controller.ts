import bcrypt from 'bcrypt';
import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
import { fetchUserFromDb, createUserIntoDb } from '../services/user.service.js';


export const handleSignIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        // if (!email || !password)
        //     return res.status(400).send({"message": "Email & Password Required!"});

        const user = await fetchUserFromDb(email);

        if (!user) {
            return res.status(400).send({ "message": "User Not Exists! Please Sign Up!" })
        }

        // hash the password of a request
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword)
        // payload to be 

        // compare passwords
        if (bcrypt.compareSync(hashedPassword, user.password)) {
            const payload = {
                email: user.email,
                name: user.name,
                avatar: user.avatar
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' })

            return res.status(200).send({ "message": "Login Successful" })
                .cookie('token', token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
                    // secure: true,
                    // httpOnly: true,
                })
        } else {
            return res.status(400).send({ "message": "Invalid Credentials" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send({ "message": "Internal Server Error" })
    }
}

export const handleSignUp = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password, name, avatar } = req.body;
        // if (!email || !password)
        //     res.status(400).send({"message": "Email & Password Required!"});

        const user = await fetchUserFromDb(email);
        if (user) {
            return res.status(400).send({ "message": "User Already Exists! Please Sign In!" })
        }

        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        await createUserIntoDb({ email, password: hashedPassword, name, avatar });

        const payload = {
            email,
            name,
            avatar
        }
        const token = jwt.sign(payload, 'secret_key', {
            expiresIn: '1d'
        })

        return res.status(200).send({ "message": "SignUp Successful" })
            .cookie('auth_token', token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
                // secure: true,
                // httpOnly: true,
            })

    } catch (e) {
        console.error(e);
        return res.status(500).send({ "message": "Internal Server Error" })
    }
}