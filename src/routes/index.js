import { Router } from 'express';
import base from './baseRouter';

const router = Router();

router.use('/', base);

router.use('*', function (req, res) {
  res.status(404).send({
    success: false,
    message: 'Route does not exists',
  });
});

export default router;
