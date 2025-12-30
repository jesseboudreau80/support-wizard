import { useState } from "react";
import { TextIntake } from "./components/TextIntake";
import { TicketList } from "./components/TicketList";
import { VoiceOrb } from "./components/VoiceOrb";

function AdminDashboardBanner() {
  return (
    <div
      className="card"
      style={{ border: "1px dashed #cbd5e1", background: "#f8fafc" }}
    >
      <h4>Admin Dashboard</h4>
      <p>
        All tickets are currently visible for review mode. Later we will toggle
        to show low confidence tickets only and wire Langfuse observability,
        Okta SSO, MCP exposure, and Chatterbox voice output.
      </p>
    </div>
  );
}

export default function App() {
  const [orbStatus, setOrbStatus] = useState<
    "idle" | "listening" | "processing" | "success" | "error"
  >("idle");

  return (
    <div className="app-shell">
      <h1>Support Wizard</h1>
      <p>Voice-first internal support routing with human-in-the-loop review.</p>

      <AdminDashboardBanner />

      {/* Voice Orb Intake */}
      <div style={{ margin: "32px 0" }}>
        <VoiceOrb
          status={orbStatus}
          onStart={() => setOrbStatus("listening")}
          onStop={() => {
            setOrbStatus("processing");
            setTimeout(() => setOrbStatus("success"), 1200);
            setTimeout(() => setOrbStatus("idle"), 2500);
          }}
          onCancel={() => setOrbStatus("idle")}
        />
      </div>

      {/* Text fallback intake */}
      <TextIntake />

      {/* Tickets list */}
      <TicketList />
    </div>
  );
}
