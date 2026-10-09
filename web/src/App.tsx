import { useState } from "react";
import { canEnterLab } from "./consent";

type ApiState = "unknown" | "online" | "offline";

export default function App() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [entered, setEntered] = useState(false);
  const [apiState, setApiState] = useState<ApiState>("unknown");

  async function checkApi() {
    try {
      const response = await fetch("/api/health", { cache: "no-store" });
      if (!response.ok) throw new Error("API is unavailable.");
      const body: { status?: string; event_collection_enabled?: boolean } = await response.json();
      setApiState(body.status === "ok" && body.event_collection_enabled === false ? "online" : "offline");
    } catch {
      setApiState("offline");
    }
  }

  function toggleAcknowledgement(nextValue: boolean) {
    setAcknowledged(nextValue);
    if (!nextValue) setEntered(false);
  }

  return (
    <main className="app-shell">
      <header className="masthead">
        <a className="wordmark" href="/" aria-label="Cognitive Lab home">
          <span className="symbol" aria-hidden="true">✳</span> Cognitive Lab
        </a>
        <span className="stage">M0 · Foundation</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <span className="eyebrow">An open-ended experiment in thinking</span>
        <h1 id="page-title">
          Get curious about <em>how</em> you think.
        </h1>
        <p>
          An opt-in research prototype exploring reasoning, learning, adaptability, and the many
          ways cognitive strengths emerge. There are no intelligence scores yet.
        </p>
      </section>

      <div className="panels">
        <section className="panel" aria-labelledby="begin-heading">
          <div className="panel-index">01 / PARTICIPATION</div>
          <h2 id="begin-heading">The lab begins with your choice.</h2>
          <p>
            This is a development preview, not an IQ test, diagnosis, or evaluation of your worth.
            Future tasks may estimate cognitive skills, and any collection of response data will
            require clear consent before it begins.
          </p>
          <label className="consent-choice">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => toggleAcknowledgement(event.target.checked)}
            />
            <span>
              I understand this is a voluntary cognitive assessment prototype and that M0 does
              not collect or save my cognitive responses.
            </span>
          </label>
          <button
            type="button"
            className="primary-button"
            disabled={!canEnterLab(acknowledged)}
            onClick={() => setEntered(true)}
          >
            Enter the lab
          </button>

          {entered && (
            <div className="ready" role="status">
              <strong>Lab preview unlocked.</strong>
              <p>
                You're ready for the first experiment. M0 includes the foundation only; interactive
                cognitive challenges arrive in M2.
              </p>
              <button type="button" className="text-button" onClick={() => setEntered(false)}>
                Leave preview
              </button>
            </div>
          )}
        </section>

        <aside className="panel detail-panel" aria-labelledby="preview-heading">
          <div className="panel-index">02 / BUILD STATUS</div>
          <h2 id="preview-heading">A foundation, not a verdict.</h2>
          <ul>
            <li>Assessment and Exploration modes are planned for M3.</li>
            <li>Procedurally generated rule-discovery tasks are planned for M2.</li>
            <li>Scores and percentiles remain disabled until appropriately validated.</li>
            <li>No user accounts, cookies, tracking scripts, or event database in M0.</li>
          </ul>
          <div className="api-check">
            <span>
              API status: <strong>{apiState}</strong>
            </span>
            <button type="button" className="outline-button" onClick={checkApi}>
              Check API
            </button>
          </div>
        </aside>
      </div>

      <footer>
        Private by design · Read the privacy specification in docs/PRIVACY.md · M0 has no
        participant telemetry.
      </footer>
    </main>
  );
}
