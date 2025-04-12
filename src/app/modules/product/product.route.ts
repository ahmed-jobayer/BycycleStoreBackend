//import express from 'express';
import { ProductControllers } from './product.controller';
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import productValidationSchema from './product.validation';
//import { updateProductSchema  } from './updateProduct.validation';

const router = express.Router();

router.post('/',
    auth( USER_ROLE.admin),
   validateRequest(productValidationSchema),
 ProductControllers.createABicycle);

router.get('/',  ProductControllers. getAllBicycles);

router.get('/:id',  ProductControllers.getASpecificBicycle);

router.put('/:id', 
    auth(USER_ROLE.admin),
     ProductControllers.updateABicycle);

router.delete('/:id', auth(USER_ROLE.admin), ProductControllers. deleteABicycle);



export const ProductRoutes = router;