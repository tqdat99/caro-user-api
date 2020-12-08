const express = require('express');
const { getUsers, getUserByUsername, signUp, signIn } = require('../controllers/user');
var passport = require('passport');

require('../passport/passport')(passport);

const userRoutes = express.Router();

userRoutes.get('/', passport.authenticate('jwt', { session: false }), getUsers);
userRoutes.post('/signup', signUp);
userRoutes.post('/signin', signIn);
userRoutes.get('/user', passport.authenticate('jwt', { session: false }), getUserByUsername);

module.exports = userRoutes;