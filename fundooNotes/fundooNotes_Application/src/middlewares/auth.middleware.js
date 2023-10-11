import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if the user has a valid Authorization token
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
        message: 'Authorization token is required',
      };
    bearerToken = bearerToken.split(' ');

    var user = await jwt.verify(bearerToken[1], process.env.Secret_Key);

    req.body.email = user.email;

    next();
  } catch (error) {
    next(error);
  }
};

export const ForgotAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');

    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required',
      };
    bearerToken = bearerToken.split(' ');

    var user = await jwt.verify(bearerToken[1], process.env.Secret_KeyForForgot);

    req.body.email = user.email;

    next();
  } catch (error) {
    next(error);
  }
};


export const convertFirstName = (req,res,next) => {
 
  if(req.body.firstName){
    req.body.firstName = req.body.firstName.toLowerCase();
  }
  
  next();

}
