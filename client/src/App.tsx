import { TextIntake } from './components/TextIntake';
import { VoiceIntake } from './components/VoiceIntake';
import { TicketList } from './components/TicketList';

function AdminDashboardBanner() {
  return (
    <div className="card" style={{ border: '1px dashed #cbd5e1', background: '#f8fafc' }}>
      <h4>Admin Dashboard</h4>
      <p>
        All tickets are currently visible for review mode. Later we will toggle to show low confidence
        tickets only and wire Langfuse observability, Okta SSO, MCP exposure, and Chatterbox voice
        output.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <h1>Support Wizard</h1>
      <p>Voice-first internal support routing with human-in-the-loop review.</p>
      <AdminDashboardBanner />
      <VoiceIntake />
      <TextIntake />
      <TicketList />
    </div>
  );
}
