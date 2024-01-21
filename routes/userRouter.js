const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Handler not defined for this route'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Handler not defined for this route'
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Handler not defined for this route'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Handler not defined for this route'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Handler not defined for this route'
  });
};

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
