import { verifyToken } from '../libs/jwt.js';

export const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json(['No token, authorization denied']);

  try {
    const { id } = await verifyToken(token);
    req.id = id;
    next();
  } catch (error) {
    res.status(401).json(['Authorization denied']);
  }
};
