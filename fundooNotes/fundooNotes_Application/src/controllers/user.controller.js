
import HttpStatus from 'http-status-codes';
import * as userService  from '../services/user.service'
export const userRegistration = async(req,res) => {
  try {
    const data = await userService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code : HttpStatus.CREATED,
      data : data,
      message : "User Registration Details save sucessfully"
    })
    
  } catch (error) {
    
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
      message : error.message
    })
  }
}