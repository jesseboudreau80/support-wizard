import { useState } from 'react';
import { useTicketStore } from '../hooks/useTickets';

export function TextIntake() {
  const { createTicket, loading } = useTicketStore();
  const [content, setContent] = useState('');

  const submit = async () => {
    if (!content) return;
    await createTicket({ content, inputType: 'TEXT' });
    setContent('');
  };

  return (
    <div className="card">
      <h3>Text Intake</h3>
      <p>Fallback text input shares the same routing pipeline.</p>
      <textarea
        className="input"
        rows={4}
        placeholder="Describe your issue"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div style={{ marginTop: 12 }}>
        <button className="button" onClick={submit} disabled={loading}>
          Create Ticket
        </button>
      </div>
    </div>
  );
}
