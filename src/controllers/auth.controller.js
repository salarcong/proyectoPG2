import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

exports.register = async (req, res) => {
    const { username, password, roles } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      roles: []
    });
  
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      user.roles = [role._id];
    }
  
    await user.save();
    res.status(201).send('User registered');
  };
  
  exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('roles');
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }
  
    const token = jwt.sign({ id: user._id, roles: user.roles }, 'secret', {
      expiresIn: 86400 // 24 hours
    });
  
    res.status(200).send({ token });
  };

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);	
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({message: "Usuario no autorizado"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
}

export const verifyToken = async (req, res) => {

        const {token} = req.cookies;

        if (!token) return res.status(401).json({message: "Usuario no autorizado"});

        jwt.verify(token, TOKEN_SECRET, async (err, user) => {

            if (err) return res.status(401).json({message: "Usuario no autorizado"});

            const userFound =   await User.findById(user.id)
            if (!userFound) return res.status(401).json({message: "Usuario no autorizado"});

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            })

        })
}
