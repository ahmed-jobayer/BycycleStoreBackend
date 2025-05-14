
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { userValidations } from './user.validation';
//import {userValidationSchema} from "./user.validation"
const router = express.Router();

router.post(
  '/create-admin',
   auth(USER_ROLE.admin),
 upload.single('file'),
(req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
  req.body = JSON.parse(req.body.data);
   next();
  },
  validateRequest(userValidations.userValidationSchema),
  UserControllers.createUser,

);

router.get(
  '/:userId',
   auth(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.getSingleUser,);

  router.put(
  '/:userId',
  auth( USER_ROLE.admin,USER_ROLE.customer),
  UserControllers.updateUser)
  
  router.delete(
    '/:userId',
     auth(USER_ROLE.admin),
   UserControllers.deleteUser)
    router.get(
      '/',
     auth(USER_ROLE.admin),
      UserControllers.getAllUser)

 
export const UserRoutes = router;