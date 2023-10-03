import HttpStatus from 'http-status-codes';
import * as userService from '../services/user.service';


export const userRegistration = async (req, res) => {
  try {
    const data = await userService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Registration Details save sucessfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const data = await userService.userLogin(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User Login sucessful'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};




export const forgotPassword = async (req,res) => {
  try {
    const email = req.body.email

    const data = await userService.forgotPassword(email);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Password reset link send to your email account'
    });
    
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code : HttpStatus.BAD_REQUEST,
      message : error.message
    })

    
    
  }
}
export const resetPassword = async (req, res) => {
  try {
    const newPassword  = req.header("newPassword");
   

    const data = await userService.resetPassword(req.body.email,newPassword);
    res.status(HttpStatus.ACCEPTED).json({
      data : data,
      code: HttpStatus.ACCEPTED,
      message: 'Password reset successful'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

















// export const forgotPassword = async(req,res) =>{
//   try {
//      const {email} = req.body;

//      const resetToken = generateResetToken();

//      await userService.storeResetToken(email,resetToken);

//      res.status(HttpStatus.OK).json({
//       code : HttpStatus.OK,
//       message : 'Password reset Token genrated' ,
//       resetToken,
//      })

//   } catch (error) {
//     res.status(HttpStatus.BAD_REQUEST).json({
//       code : HttpStatus.BAD_REQUEST,
//       message : error.message
//     })

//   }
// }

// export const resetPassword = async(req,res) => {
//   try {
//     const {email,resetToken,newPassword} = req.body;

//     await userService.resetUserPassword(email,resetToken,newPassword);

//     res.status(HttpStatus.ACCEPTED).json({
//       code : HttpStatus.ACCEPTED,
//       message : 'Password reset sucessful'
//     })
//   } catch (error) {
//     res.status(HttpStatus.BAD_REQUEST).json({
//       code : HttpStatus.BAD_REQUEST,
//       message : error.message,
//     })

//   }
// }
