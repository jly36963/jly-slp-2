import express from 'express';
import { auth } from '../utils/firebase-admin';

interface Headers {
  uid: string;
  token: string;
  [propName: string]: any;
}

// validate firebase token/uid
const checkToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { uid, token } = <Headers>req.headers;
  // reject if missing credentials
  if (!token || !uid) return res.status(401);
  // reject if bad credentials
  const decodedToken = await auth.verifyIdToken(token);
  const isValidToken = uid === decodedToken.uid;
  if (!isValidToken) return res.status(401);
  // success
  next();
};

export default checkToken;