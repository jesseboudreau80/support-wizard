export interface RoutingDecision {
  summary: string;
  proposedDepartment: string;
  confidence: number;
}

export async function classifyTicket(input: string): Promise<RoutingDecision> {
  // TODO: plug in real classifier and Langfuse tracing
  return {
    summary: input.slice(0, 140),
    proposedDepartment: 'IT',
    confidence: 0.65
  };
}
