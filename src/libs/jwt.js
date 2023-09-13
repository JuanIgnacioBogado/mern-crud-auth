import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../config.js';

export const createAccessToken = payload =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

export const verifyToken = payload =>
  new Promise((resolve, reject) => {
    jwt.verify(payload, TOKEN_SECRET, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
