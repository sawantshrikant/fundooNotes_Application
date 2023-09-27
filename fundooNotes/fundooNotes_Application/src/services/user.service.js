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