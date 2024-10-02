import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRoles.some(role => role.name === 'admin')) {
    next();
  } else {
    res.status(403).send('Require Admin Role');
  }
};

const isUser = (req, res, next) => {
  if (req.userRoles.some(role => role.name === 'user')) {
    next();
  } else {
    res.status(403).send('Require User Role');
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser
};