export interface KBResult {
  resolved: boolean;
  answer?: string;
  confidence?: number;
  sources?: { id: string; title: string }[];
}

export async function lookupKnowledgeBase(_orgId: string, _query: string): Promise<KBResult> {
  // TODO: replace with RAG implementation and Langfuse tracing hook
  return { resolved: false };
}
