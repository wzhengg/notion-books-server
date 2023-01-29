import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const addUserToReq: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization!.split(' ')[1];
  const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;
  req.userid = id;
  next();
};
