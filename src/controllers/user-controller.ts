import { Request, Response } from 'express';
import User from '../models/user-model';

async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error(`User with email ${email} already exists`);
  }

  user = await User.create({ email, password });

  if (!user) {
    res.status(500);
    throw new Error('Failed to create user');
  }

  res.status(201);
  res.json(user);
}

export { createUser };
