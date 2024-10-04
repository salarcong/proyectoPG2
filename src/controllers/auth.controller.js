import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Task from "../models/task.model.js"; // Asegúrate de tener un modelo de Task
import * as XLSX from 'xlsx';

<<<<<<< Updated upstream
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
=======
export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role // rol se incluya en el nuevo usuario
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token);
        res.json({
            _id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role, // rol se incluya en la respuesta
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "El email no existe" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "La contraseña no es correcta" });

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role, // rol se incluya en la respuesta
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
>>>>>>> Stashed changes

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
            role: userFound.role,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
}

export const verifyToken = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const user = await User.findById(decoded.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to authenticate token" });
    }
};

export const uploadExcel = async (req, res) => {
    const data = req.body;

    try {
        for (const item of data) {
            const newTask = new Task({
                name: item.name,
                description: item.description,
                date: new Date(item.date),
            });
            await newTask.save();
        }

        res.status(200).json({ message: "Datos subidos correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const user = await User.findById(decoded.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" });

        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};