import { prisma } from '../db/client';
import { classifyTicket } from './routingService';
import { lookupKnowledgeBase } from './kbService';
import { InputType, TicketStatus } from '@prisma/client';

type CreateTicketInput = {
  orgId: string;
  userId: string;
  inputType: InputType;
  content: string;
};

export async function createTicket(input: CreateTicketInput) {
  const kbResult = await lookupKnowledgeBase(input.orgId, input.content);
  if (kbResult.resolved && kbResult.confidence && kbResult.confidence > 0.75) {
    return {
      resolved: true,
      kb: kbResult
    };
  }

  const routing = await classifyTicket(input.content);
  const ticket = await prisma.ticket.create({
    data: {
      orgId: input.orgId,
      userId: input.userId,
      inputType: input.inputType,
      rawInput: input.content,
      aiSummary: routing.summary,
      proposedDepartment: routing.proposedDepartment,
      confidenceScore: routing.confidence,
      status: TicketStatus.OPEN,
      messages: {
        create: [{ content: input.content, userId: input.userId }]
      }
    },
    include: { messages: true, routingFeedback: true }
  });

  return { resolved: false, ticket };
}

export async function listTickets(orgId: string, filterLowConfidenceOnly: boolean) {
  return prisma.ticket.findMany({
    where: {
      orgId,
      ...(filterLowConfidenceOnly ? { confidenceScore: { lt: 0.5 } } : {})
    },
    include: { messages: true, routingFeedback: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function addMessage(ticketId: string, userId: string, content: string) {
  return prisma.message.create({
    data: { ticketId, userId, content }
  });
}

export async function submitRoutingFeedback(
  ticketId: string,
  reviewerId: string,
  isCorrect: boolean,
  correctedDepartment?: string,
  notes?: string
) {
  return prisma.routingFeedback.create({
    data: { ticketId, reviewerId, isCorrect, correctedDepartment, notes }
  });
}
