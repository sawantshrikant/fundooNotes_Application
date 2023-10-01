import User from '../models/user.model';
import bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

export const userRegistration = async (body) => {
  const checkForExistingUser = await User.findOne({ email: body.email });
  var data;
  if (checkForExistingUser != null) {
    throw new Error('Email is already registered.');
  } else {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRound);

    body.password = hashedPassword;

    data = await User.create(body);

    //const {firstName , email} = data;
    const { email, firstName } = data;

    data = { email, firstName };

    // data = {
    //   firstName: data.firstName,
    //   email: data.email
    // }
  }

  return data;
};

export const userLogin = async (body) => {
  const checkForUserCredentials = await User.findOne({ email: body.email });

  var data;
  if (checkForUserCredentials == null) {
    throw new Error('User not registered');
  } else {
    const match = await bcrypt.compare(
      body.password,
      checkForUserCredentials.password
    );

    if (match) {
      const { email, firstName } = checkForUserCredentials;

      const token = jwt.sign({ email, firstName }, process.env.Secret_Key);

      data = { email, firstName, token };
    } else {
      throw new Error('Wrong Password');
    }
  }
  return data;
};

// export const storeResetToken = async (email,resetToken) => {
//   const user = await User.findOne({email});
//   if(user) {
//     user.resetToken = resetToken;
//     user.resetTokenExpires = new Date(Date.now() + 3600000)
//     await user.save()
//   } else{
//     throw new Error('User Not Found')
//   }
// }

// export const resetUserPassword = async (email,resetToken,newPassword) => {
//   const user = await User.findOne({
//     email,
//     resetToken,
//     resetTokenExpires: {$gt : Date.now() },
//   })

//   if (user) {
//     user.password = newPassword
//     user.resetToken = undefined
//     user.resetTokenExpires = undefined
//     await user.save
//   }else {
//     throw new Error('Invalid or expired token')
//   }
// };
