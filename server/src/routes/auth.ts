import { Router } from 'express';

const router = Router();

router.get('/providers', (_req, res) => {
  res.json({
    providers: ['google', 'microsoft', 'github'],
    todo: ['okta']
  });
});

router.post('/login', (_req, res) => {
  // TODO: integrate OAuth providers and issue JWT scoped by org
  res.json({ message: 'OAuth login not yet implemented. TODO: add Okta SSO hooks.' });
});

export default router;
