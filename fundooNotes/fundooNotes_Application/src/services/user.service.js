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

   //const {firstName , email} = data;
   const {email , firstName} = data;


   data = {email , firstName}

    // data = {
    //   firstName: data.firstName,
    //   email: data.email
    // }
   }

   return data;
}

export const userLogin = async(body) => {
  const checkForUserCredentials = await User.findOne({email: body.email});
  
  var data;
  if(checkForUserCredentials == null){
    throw new Error("User not registered")
  }else{
    const match = await bcrypt.compare(body.password, checkForUserCredentials.password);

    if(match) {

      const {email,firstName} = checkForUserCredentials;

      data = {email,firstName};
                                                                           
      }
     else {
      throw new Error("Wrong Password")
    }

    
  }
  return data;
}

