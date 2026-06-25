import { useState } from "react";

/* ============================================================================
   CONTROLLED INPUT
   ----------------------------------------------------------------------------
   React state is the "source of truth".

   Every time the user types:
   1. onChange fires.
   2. We update React state.
   3. React re-renders the textarea with the new value.

   The browser is NOT in charge of storing the value—React is.
============================================================================ */

export default function Example3FeedbackForm() {
  const [isSent, setIsSent] = useState(false);

  // React stores the current text here.
  const [message, setMessage] = useState("");

  if (isSent) return <h1>Thank you!</h1>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Since React already knows the current value,
        // we can access it directly from state.
        alert(`Sending: "${message}"`);

        setIsSent(true);
      }}
    >
      <textarea
        placeholder="controlled"
        // React controls what is displayed inside the textarea.
        value={message}
        // Every keystroke updates React state.
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button type="submit">Send</button>
    </form>
  );
}

/* ============================================================================
   UNCONTROLLED INPUT
   ----------------------------------------------------------------------------
   The browser is the "source of truth".

   React does NOT keep track of what is being typed.
   The textarea stores its own value internally.

   We only read the value when the form is submitted.
============================================================================ */

export function FeedbackForm() {
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    // e.target is the <form>.
    //
    // Because the textarea has name="message",
    // we can access it as:
    // e.target.message
    //
    // Then read its current value.
    const message = e.target.message.value;

    alert(`Sending: "${message}"`);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* The browser stores whatever the user types. */}
      <textarea name="message" placeholder="uncontrolled"/>

      <br />

      <button type="submit">Send</button>
    </form>
  );
}
