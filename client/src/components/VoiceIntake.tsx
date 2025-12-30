import { useEffect, useRef, useState } from 'react';
import { useTicketStore } from '../hooks/useTickets';

export function VoiceIntake() {
  const { createTicket, loading } = useTicketStore();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return;
    }
    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionImpl();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };
    recognitionRef.current.onend = () => setIsRecording(false);
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const submitTranscript = async () => {
    if (!transcript) return;
    await createTicket({ content: transcript, inputType: 'VOICE' });
    setTranscript('');
  };

  return (
    <div className="card">
      <h3>Push-to-Talk Intake</h3>
      <p>Record a quick note and route it through the same pipeline.</p>
      <button className="button" onClick={toggleRecording} disabled={!recognitionRef.current}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {transcript && (
        <div style={{ marginTop: 12 }}>
          <p>Transcript:</p>
          <div className="card" style={{ background: '#f8fafc' }}>
            <p>{transcript}</p>
          </div>
          <button className="button" onClick={submitTranscript} disabled={loading}>
            Submit Ticket
          </button>
        </div>
      )}
      {!recognitionRef.current && <p>Browser speech recognition not available. Use text form below.</p>}
    </div>
  );
}
