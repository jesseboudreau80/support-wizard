import { useEffect } from 'react';
import { useTicketStore } from '../hooks/useTickets';

export function TicketList() {
  const { tickets, fetchTickets, loading } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Tickets</h3>
        <button className="button secondary" onClick={fetchTickets} disabled={loading}>
          Refresh
        </button>
      </div>
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="card" style={{ border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="badge">{ticket.status}</span>
              <span className="badge">{(ticket.confidenceScore * 100).toFixed(0)}% conf</span>
            </div>
            <p><strong>Summary:</strong> {ticket.aiSummary}</p>
            <p><strong>Department:</strong> {ticket.proposedDepartment}</p>
            <p><strong>Input:</strong> {ticket.rawInput}</p>
          </div>
        ))}
        {tickets.length === 0 && <p>No tickets yet.</p>}
      </div>
    </div>
  );
}
