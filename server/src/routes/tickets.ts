import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, requireRole } from '../middleware/rbac';
import { createTicket, listTickets, addMessage, submitRoutingFeedback } from '../services/ticketService';
import { InputType } from '@prisma/client';
import { env } from '../config/env';

const router = Router();

const createSchema = z.object({
  inputType: z.enum(['VOICE', 'TEXT']),
  content: z.string().min(1)
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const { inputType, content } = parsed.data;
  const result = await createTicket({
    orgId: req.auth!.orgId,
    userId: req.auth!.userId,
    inputType: inputType as InputType,
    content
  });

  res.status(201).json(result);
});

router.get('/', requireAuth, async (req, res) => {
  const filterLow = env.reviewMode === 'low-confidence';
  const tickets = await listTickets(req.auth!.orgId, filterLow);
  res.json(tickets);
});

router.post('/:ticketId/messages', requireAuth, async (req, res) => {
  const messageSchema = z.object({ content: z.string().min(1) });
  const parsed = messageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const message = await addMessage(req.params.ticketId, req.auth!.userId, parsed.data.content);
  res.status(201).json(message);
});

router.post('/:ticketId/feedback', requireAuth, requireRole(['SUPERADMIN', 'ADMIN', 'AGENT']), async (req, res) => {
  const feedbackSchema = z.object({
    isCorrect: z.boolean(),
    correctedDepartment: z.string().optional(),
    notes: z.string().optional()
  });
  const parsed = feedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const feedback = await submitRoutingFeedback(
    req.params.ticketId,
    req.auth!.userId,
    parsed.data.isCorrect,
    parsed.data.correctedDepartment,
    parsed.data.notes
  );
  res.status(201).json(feedback);
});

export default router;
