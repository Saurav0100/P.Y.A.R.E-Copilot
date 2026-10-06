import { useState } from "react";

function PyareChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askPyare = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer(null);

    try {
      const response = await fetch(
        `/api/ask?question=${encodeURIComponent(question)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAnswer(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🤖 Ask P.Y.A.R.E.</h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about the mission..."
        rows={4}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <button
        onClick={askPyare}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "P.Y.A.R.E. is thinking..." : "Ask P.Y.A.R.E."}
      </button>

      {error && (
        <p style={{ marginTop: "15px" }}>
          ❌ {error}
        </p>
      )}

      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h3>Conclusion</h3>
          <p>{answer.message}</p>

          {answer.evidence?.telemetry?.length > 0 && (
            <>
              <h3>Telemetry Evidence</h3>
              <pre>
                {JSON.stringify(answer.evidence.telemetry, null, 2)}
              </pre>
            </>
          )}

          {answer.evidence?.logs?.length > 0 && (
            <>
              <h3>Mission Logs</h3>
              <pre>
                {JSON.stringify(answer.evidence.logs, null, 2)}
              </pre>
            </>
          )}

          {answer.evidence?.incidents?.length > 0 && (
            <>
              <h3>Previous Incidents</h3>
              <pre>
                {JSON.stringify(answer.evidence.incidents, null, 2)}
              </pre>
            </>
          )}

          {answer.evidence?.procedures?.length > 0 && (
            <>
              <h3>Recommended Procedures</h3>
              <pre>
                {JSON.stringify(answer.evidence.procedures, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PyareChat;