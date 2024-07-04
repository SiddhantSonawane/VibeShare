import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import mongoose from 'mongoose'

// register user
export const register = async (req, res) => {
    try {
        const {
          firstName,
          lastName,
          email,
          password,
          picturePath,
          location,
          occupation  
        } = req.body;

        const { friends = []} = req.body

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            profileViews: 0,
            impressions: 0,
            socialProfiles: [
                {
                    twitterProfile: "",
                    linkedInProfile: "",
                    instagramProfile: "",
                }
            ],
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// logging in
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({email: email})

        if(!user)
        {
            return res.status(400).json({msg: "User Does not exist!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        {
            return res.status(400).json({msg: "INVALID CREDENTIALS!"})
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
        // delete user password once used for validating and dont send it to frontend
        delete user.password
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

export const validateEmail = async(req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (err) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}