import { Router } from 'express';
import base from './baseRouter';
import auth from './authRoutes';

const router = Router();

router.use('/api/v1', base);
router.use('/api/v1/auth', auth);

router.use('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'Route does not exists'
  });
});

export default router;
