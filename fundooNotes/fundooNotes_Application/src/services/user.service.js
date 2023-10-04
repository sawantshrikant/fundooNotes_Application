import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const nodemailer = require('nodemailer');

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

    const { email, firstName } = data;

    data = { email, firstName };
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amit40fakeemail@gmail.com',
    pass: 'dyezqtoboczpzppj',
  },
});

export const sendEmail = async (email, text) => {
  const mailOptions = {
    from: 'amit40fakeemail@gmail.com',
    to: email,
    subject: 'Reset Password Token',
    text: text, // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  let resetToken;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User Not Exist');
    }

    resetToken = jwt.sign({ email }, process.env.Secret_Key);

    await sendEmail(email, `Your reset password token: ${resetToken}`);
  } catch (error) {
    throw error;
  }
  return resetToken;
};

export const resetPassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error('User not found');
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRound);

    user.password = hashedPassword;
    const data = await user.save();

    return data.email;
  } catch (error) {
    throw error;
  }
};
