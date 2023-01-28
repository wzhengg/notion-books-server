import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';

function generateToken(id: string) {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });
}

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
  res.json({
    id: user.id,
    email,
    token: generateToken(user.id),
  });
}

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error(`User with email ${email} doesn't exist`);
  }

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    res.status(400);
    throw new Error(`Password is incorrect`);
  }

  res.json({
    id: user.id,
    email,
    token: generateToken(user.id),
  });
}

export { createUser, loginUser };
