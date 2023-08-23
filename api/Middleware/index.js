const User = require('../Model/UserModel');
const { verifyToken } = require('../Utils/jwt');
const {UnauthorizedError} = require('../Error/Error')

exports.checkUser = (req, res, next) => {
  try {
    const token = req.header.authorization;
    if(!token) throw new UnauthorizedError('unauthorized')
  } catch (error) {
    console.log(error);
  }
}