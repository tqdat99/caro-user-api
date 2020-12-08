const express = require('express');
const { createUser, getUsers, getUserByUsername, getPasswordByUsername, signUp, signIn } = require('../controllers/user');
require('../passport/passport');


const userRoutes = express.Router();

userRoutes.post('/create', createUser);
userRoutes.get('/', getUsers);
userRoutes.post('/signup', signUp);
userRoutes.post('/signin', signIn);
userRoutes.get('/user', getUserByUsername);
userRoutes.get('/password', getPasswordByUsername);

module.exports = userRoutes;