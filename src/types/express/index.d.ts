import express from 'express';

declare global {
  namespace Express {
    interface Request {
      userid?: string | null;
    }
  }
}
