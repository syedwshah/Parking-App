const bcrypt = require('bcryptjs');
const User = require('../models/users');

const usersController = {};

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      // res.redirect('/user'); //Redirect to this when there is a unique user page
      res.redirect('/parking');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

usersController.index = (req, res) => {
  res.json({
    message: 'Put a user profile page on this route',
    data: {
      user: req.user,
    },
  });
};

module.exports = usersController;