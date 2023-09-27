import { error } from 'winston';
import User from '../models/user.model'
import HttpStatus from 'http-status-codes';

export const userRegistration = async(body) => {
   const checkForExistingUser = await User.findOne({email: body.email});
   var data;
   if(checkForExistingUser != null){
    throw new Error("Email is already registered.")
   }else{
    data = await User.create(body);
   }

   return data;
}

export const userLogin = async(body) => {
  const checkForUserCredentials = await User.findOne({email: body.email,password: body.password});
  var data;
  if(checkForUserCredentials == null){
    throw new Error("User not registered")
  }else{
    data = body.email;
  }
  return data;
}