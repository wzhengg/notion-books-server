import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { header, body } from 'express-validator';
import { validateRequest } from '../middleware/validation-middleware';
import { addUserToReq } from '../middleware/auth-middleware';
import { createUser, loginUser, getUser } from '../controllers/user-controller';

const router = Router();

router.post(
  '/',
  body('email', 'Email is required')
    .trim()
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail()
    .escape(),
  body('password', 'Password is required')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .escape(),
  validateRequest,
  asyncHandler(createUser)
);

router.post(
  '/login',
  body('email', 'Email is required').trim().notEmpty().escape(),
  body('password', 'Password is required').trim().notEmpty().escape(),
  validateRequest,
  asyncHandler(loginUser)
);

router.get(
  '/info',
  header('authorization', 'Token is required')
    .exists()
    .bail()
    .custom((value) => {
      const [bearer, token] = value.split(' ');
      return bearer === 'Bearer' && token;
    })
    .withMessage("authorization must have form 'Bearer <token>'"),
  validateRequest,
  asyncHandler(addUserToReq),
  asyncHandler(getUser)
);

export default router;
