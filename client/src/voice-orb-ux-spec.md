# Support Wizard Voice-First Intake UX

A calm, mobile-first voice intake centered on a single animated orb. Focus is on clarity, confidence, and immediacy: “I can just talk, and this will help me.”

## Core Interaction Model
- **Primary gesture:** single tap to start/stop. Default to toggle for approachability; long press remains optional for power users.
- **Start recording:** tap the orb (or press-and-hold). Orb transitions from **Idle** → **Listening**.
- **Stop recording:** tap again (or release hold). Orb transitions **Listening** → **Processing** automatically.
- **Cancel:** swipe down on the orb while listening to discard and return to **Idle** (reduces accidental sends).
- **Mic denial recovery:** show inline text “Microphone needed” with retry button; orb enters **Error** state until resolved.

## Orb States & Behaviors
- **Idle:** Soft glow with subtle breathing pulse (1.2s cycle). Color: cool neutral (e.g., slate/indigo mix). Small prompt text: “Tap to speak”.
- **Listening:** Orb brightens and gently expands 4–6% with each input pulse. Color shifts to active teal/blue. Simple vertical waveform around the orb responds to volume (no dense bars). Haptic: light tick on entry, soft tick every 5s to reassure recording is live.
- **Processing:** Orb contracts slightly (−4%) and slows pulse (1.6s). Color shifts to lavender/indigo gradient. A thin ring rotates slowly clockwise to show progress. Haptic: short buzz on transition.
- **Success / Confirmation:** Orb flashes to a warm gradient (teal → mint) then settles to Idle glow. Display short text confirmation (“Got it”) with the transcribed summary. Haptic: soft double tick.
- **Error:** Orb turns desaturated red/orange with a brief wobble animation. Text label surfaces cause (“Mic denied”, “Didn’t catch that”). Offer “Retry” and “Type instead” chips. Haptic: sharper single buzz.

## Visual Language
- **Pulse:** Breathing scale between 96–104% with easing (`ease-in-out`).
- **Waveform:** Minimal vertical lines hugging the orb; opacity and height respond to input amplitude. Do not exceed 60% of orb height to stay calm.
- **Ring:** Thin 2–3px ring for processing; slow 4s rotation conveys patience without stress.
- **Color cues:** Neutral (Idle), cool active (Listening), composed gradient (Processing), warm affirmation (Success), soft alert (Error). Avoid harsh saturation.
- **Shadow/Glow:** Soft shadow on idle; brighter glow on listening to indicate active mic. Keep elevations subtle for mobile OLED comfort.

## Mobile Layout
- **Placement:** Orb anchored bottom-center, 12–16px above the safe area, sized ~72–88px for thumb reach.
- **Supporting UI:**
  - Top: brand mark and a calming one-line prompt (“Describe the issue aloud”).
  - Middle: transcript area showing live text while listening; collapses to summary after processing.
  - Bottom sheet: optional quick actions (Retry, Type instead) appear contextually; otherwise minimal.
- **Gestures:**
  - Tap toggles recording.
  - Press-and-hold records while held; release to process.
  - Swipe down during listening to cancel.

## Accessibility & Inclusion
- **Haptics:** Provide tactile confirmation on every state change; respect OS reduced-haptics settings.
- **Visual cues:** Color + motion + concise text. Ensure minimum 4.5:1 contrast for text labels around the orb.
- **Text fallback:** Always render live transcription or status text; provide “Type instead” for silent environments.
- **Voice clarity:** On first denial, show a short rationale and a one-tap retry; never block the UI.
- **Reduced motion:** When `prefers-reduced-motion` is set, replace pulses with gentle opacity fades and disable waveform bounce.

## State Diagram (text)
- **Idle** —tap/hold→ **Listening** —tap/release→ **Processing** —auto→ **Success** → **Idle**
- **Listening** —swipe down→ **Idle** (cancel)
- **Processing** —error→ **Error** —retry→ **Listening**
- **Any state** —mic denied→ **Error**

## Implementation Notes (frontend only)
- Single `VoiceOrb` component owning visual states; controlled via prop `status: "idle" | "listening" | "processing" | "success" | "error"`.
- Use CSS variables for colors and motion so themes can adjust without logic changes.
- Haptics: wrap in a utility that no-ops when unsupported or user-disabled.
- Live transcript area should truncate gracefully on small screens; preserve last success summary until next start.
- Keep tap target ≥48px, respect safe-area insets, and ensure the orb never overlaps system gesture areas.

## Later (nice-to-haves)
- Adaptive orb that reacts to sentiment (warmer glow when user sounds stressed).
- Contextual follow-ups (chip suggestions) after success based on transcript intent.
- Micro-interaction sounds (very soft chimes) for users who enable audio cues.
- Onboarding nudge that demonstrates tap vs hold with a short, skippable animation.
