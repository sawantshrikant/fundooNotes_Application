import { error } from 'winston';

import User from '../models/user.model'
import HttpStatus from 'http-status-codes';
import bcrypt from "bcrypt";

export const userRegistration = async(body) => {
   const checkForExistingUser = await User.findOne({email: body.email});
   var data;
   if(checkForExistingUser != null){
    throw new Error("Email is already registered.")
   }else{
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(body.password,saltRound);

    body.password = hashedPassword;

    data = await User.create(body);

    data = {
      firstName: data.firstName,
      email: data.email
    }
   }

   return data;
}

export const userLogin = async(body) => {
  const checkForUserCredentials = await User.findOne({email: body.email,password: body.password});
  var data;
  if(checkForUserCredentials == null){
    throw new Error("User not registered")
  }else{
    data = {
      firstName: checkForUserCredentials.firstName,
      email: checkForUserCredentials.email,
    }
  }
  return data;
}

