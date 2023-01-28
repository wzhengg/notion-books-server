import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation-middleware';
import { createUser } from '../controllers/user-controller';

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

export default router;
