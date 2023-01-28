import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createUser } from '../controllers/user-controller';

const router = Router();

router.post('/', asyncHandler(createUser));

export default router;
