// import { Request, Response, NextFunction } from 'express';
// import { Model } from 'mongoose';
// // import IUser from '../interfaces/userInterface';
// // import Email from './email';
// // import Token from './Token';
// // import IDoctor from '../interfaces/doctorInterface';
// // import AppError from './appError';
// // import { CustomRequest } from '../interfaces/sharedInterface';
// import { promisify } from 'util';
// import crypto from 'crypto';



// class Auth {
//     private Model: Model<any>;
//     private userOrDoctor: string

//     constructor(Model: Model<any>, userOrDoctor: string) {
//         this.Model = Model;
//         this.userOrDoctor = userOrDoctor;
//     }





//     public logout(req: Request, res: Response) {
//         res.cookie('jwt', 'loggedout', {
//             expires: new Date(
//                 Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string) * 24 * 60 * 60 * 1000)
//             ),
//             httpOnly: true
//         });
//         res.status(200).json({ status: 'success' });
//     }


//     public async forgotPassword(req: Request, res: Response, next: NextFunction) {
//         // 1) Get user based on POSTed email
//         const user: any = await this.Model.findOne({ email: req.body.email });
//         if (!user) {
//             return next(new AppError('There is no user with email address.', 404));
//         }
//         // 2) Generate the random reset token
//         const resetToken = user.createPasswordResetToken();
//         await user.save({ validateBeforeSave: false });
//         console.log(resetToken);
//         // 3) Send it to user's email
//         try {
//             let resetURL;
//             if (this.userOrDoctor == "user") {
//                 resetURL = `${req.protocol}://${req.get(
//                     'host'
//                 )}/api/v1/users/resetPassword/${resetToken}`;
//             } else {
//                 resetURL = `${req.protocol}://${req.get(
//                     'host'
//                 )}/api/v1/doctors/resetPassword/${resetToken}`;
//             }


//             await new Email(user, resetURL).sendPasswordReset();

//             res.status(200).json({
//                 status: 'success',
//                 message: 'Token sent to email!'
//             });
//         } catch (err) {
//             user.passwordResetToken = undefined;
//             user.passwordResetExpires = undefined;
//             await user.save({ validateBeforeSave: false });

//             return next(
//                 new AppError('There was an error sending the email. Try again later!', 500)
//             );
//         }
//     }

//     public async resetPassword(req: Request, res: Response, next: NextFunction) {
//         // 1) Get user based on the token
//         console.log("token")
//         const hashedToken = crypto
//             .createHash('sha256')
//             .update(req.params.token)
//             .digest('hex');
//         const user = await this.Model.findOne({
//             passwordResetToken: hashedToken,
//             passwordResetExpires: { $gt: Date.now() }
//         });
//         // 2) If token has not expired, and there is user, set the new password
//         if (!user) {
//             return next(new AppError('Token is invalid or has expired', 400));
//         }
//         user.password = req.body.password;
//         user.passwordConfirm = req.body.passwordConfirm;
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save();
//         console.log("ok")
//         // 3) Update changedPasswordAt property for the user
//         // 4) Log the user in, send JWT
//         const TokenGeneration: Token = new Token(user, 201);
//         TokenGeneration.createSendToken(req, res);
//     }

// }
// // 
// export default Auth;