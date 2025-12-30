import create from 'zustand';
import { apiClient } from '../api/client';

export type Ticket = {
  id: string;
  rawInput: string;
  aiSummary: string;
  proposedDepartment: string;
  confidenceScore: number;
  status: string;
  messages: { id: string; content: string; createdAt: string }[];
};

interface TicketStore {
  tickets: Ticket[];
  loading: boolean;
  error?: string;
  fetchTickets: () => Promise<void>;
  createTicket: (payload: { content: string; inputType: 'VOICE' | 'TEXT' }) => Promise<void>;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  loading: false,
  async fetchTickets() {
    set({ loading: true });
    try {
      const data = await apiClient.get('/tickets');
      set({ tickets: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  async createTicket(payload) {
    set({ loading: true });
    try {
      await apiClient.post('/tickets', payload);
      const data = await apiClient.get('/tickets');
      set({ tickets: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));
