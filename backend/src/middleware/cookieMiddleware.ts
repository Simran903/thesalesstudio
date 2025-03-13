import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const ensureClientId = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.cookies.clientId) {
    const clientId = uuidv4();
    
    res.cookie('clientId', clientId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    req.cookies.clientId = clientId;
  }
  
  next();
};