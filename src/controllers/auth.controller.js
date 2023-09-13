import bcrypt from 'bcryptjs';

import { errorResponse } from '../libs/errorResponse.js';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

const userNotFound = res => res.status(404).json(['User not found']);

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['The email is already taken']);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token);
    res.json(userSaved);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return userNotFound(res);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(['Invalid password']);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token);
    res.json(userFound);
  } catch (error) {
    errorResponse(res, error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
};

export const refreshToken = async ({ id }, res) => {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return userNotFound(res);

    const newToken = await createAccessToken({ id });
    res.cookie('token', newToken);
    res.json(userFound);
  } catch (error) {
    errorResponse(res, error);
  }
};
