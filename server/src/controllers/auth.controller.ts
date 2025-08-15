import bcrypt from 'bcrypt';
import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
import { fetchUserFromDb, createUserIntoDb } from '../services/user.service.js';


export const handleSignIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({"message": "Email & Password Required!"});

        const user = await fetchUserFromDb(email);
        if (user == null) {
            return res.status(400).send({ "message": "User Not Exists! Please Sign Up!" })
        }

        // compare passwords
        if (bcrypt.compareSync(password, user.password)) {
            const payload = {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' })            
            
            res.cookie('token', token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
                    // secure: true,
                    // httpOnly: true,
            })
            return res.status(200).send({ "message": "Login Successful" })
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
        const { email, password, name, avatar, role } = req.body;
        if (!email || !password || !name || !role)
            return res.status(400).send({"message": "All Fields Required!"});

        const user = await fetchUserFromDb(email);

        if (user != null) {
            return res.status(400).send({ "message": "User Already Exists! Please Sign In!" })
        }

        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newUser = await createUserIntoDb({ email, password: hashedPassword, name, role, avatar });

        if(newUser.rowCount === 0) {
            return res.status(500).send({ "message": "Internal Server Error! Please try again later!"});
        }

        const payload = {
            email,
            name,
            role,
            avatar
        }
        const token = jwt.sign(payload, 'secret_key', {
            expiresIn: '1d'
        })

        res.cookie('auth_token', token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
                // secure: true,
                // httpOnly: true,
        })
        return res.status(200).send({ "message": "SignUp Successful" })

    } catch (e) {
        console.error(e);
        return res.status(500).send({ "message": "Internal Server Error" })
    }
}