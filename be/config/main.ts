import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: '5m',
  });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '15m',
  });
};
export const generateRefreshToken = (payload: object, res: Response) => {
  const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: '30d',
  });
  res.cookie('refreshtoken', refresh_token, {
    httpOnly: true,
    path: `/api/rf_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return refresh_token;
};
export const SocketServer = (socket: Socket) => {
  socket.on('joinRoom', (id: string) => {
    socket.join(id);
  });
  socket.on('outRoom', (id: string) => {
    socket.leave(id);
  });
  socket.on('disconnect', () => {
    console.log(socket.id + ' đã ngắt kết nối');
  });
};