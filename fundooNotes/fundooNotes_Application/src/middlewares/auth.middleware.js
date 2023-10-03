import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/user.util';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ');

    if(bearerToken[1] == "forgot"){
      var  user  = await jwt.verify(bearerToken[2],  process.env.Secret_KeyForForgot);
    }else{
      var  user  = await jwt.verify(bearerToken[1],  process.env.Secret_Key);
    }
   
    req.body.email = user.email
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
