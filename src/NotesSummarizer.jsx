import { useState } from "react";

function NotesSummarizer({ onBack }) {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeNotes = async () => {
    if (!notes.trim()) {
      alert("Please enter some notes.");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("https://studyai-backend-cwxs.onrender.com/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to summarize notes.");
      }

      setSummary(data.summary);
    } catch (error) {
      console.error(error);

      setSummary(
        "Unable to connect to the AI server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-page">
      <button className="back-button" onClick={onBack}>
  ← Back to Dashboard
</button>
      <div className="tool-header">
        <span className="tool-label">AI LEARNING TOOL</span>

        <h1>📝 Notes Summarizer</h1>

        <p>
          Turn lengthy study notes into clear and useful revision material.
        </p>
      </div>

      <div className="solver-card">
        <label>Paste your notes</label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your lecture notes, textbook content, or study material here..."
          rows="10"
        />

        <button
          className="solve-button"
          onClick={summarizeNotes}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "✨ Summarize Notes"}
        </button>
      </div>

      {summary && (
        <div className="answer-card">
          <div className="answer-title">
            <span>📚</span>

            <div>
              <h2>AI Summary</h2>
              <p>Important points from your notes</p>
            </div>
          </div>

          <div className="answer-content">
            {summary.split("\n").map((line, index) => (
              <p key={index}>{line || "\u00A0"}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesSummarizer;