import { Router } from 'express';

const base = Router();

base.get('', (req, res) => {
  res.send({
    success: true,
    message: 'Welcome! To Task Management!'
  });
});

export default base;
