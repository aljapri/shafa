import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';


import CommentController from '../controllers/CommentController';
import AuthController from '../controllers/AuthController';

const authRoutes: Router = express.Router({ mergeParams: true });
const authController = new AuthController();

// Authorization middleware setup





authRoutes.get(
  '/validate-token',
  asyncWrapper(authController.checkToknValidation.bind(authController))
);




  

  export default authRoutes;
