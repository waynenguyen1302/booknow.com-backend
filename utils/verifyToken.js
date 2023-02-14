import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req,res,next)=> {
  // get token from cookies
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  //verify if that token is the same as our env token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    } else {
      req.user = user;
      next();
    }
  });
}

export const verifyUser = (req, res, next) => {
  // removed next() below
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
