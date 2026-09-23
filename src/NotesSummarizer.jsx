import { useState } from "react";

function NotesSummarizer() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeNotes = () => {
    if (!notes.trim()) return;

    setLoading(true);
    setSummary("");

    setTimeout(() => {
      setSummary(
        `Here is a simple summary of your notes:\n\n` +
        `• Main idea: ${notes.slice(0, 120)}${notes.length > 120 ? "..." : ""}\n\n` +
        `• Key points: Break the topic into smaller concepts and focus on the most important definitions, ideas and examples.\n\n` +
        `• Revision tip: Read the important points once, close your notes, and try to explain them in your own words.`
      );

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <div>
          <span className="tool-label">AI LEARNING TOOL</span>
          <h1>📝 Notes Summarizer</h1>
          <p>
            Turn lengthy notes into short, simple and easy-to-revise points.
          </p>
        </div>
      </div>

      <div className="solver-card">
        <label>Paste your notes here</label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: Paste your class notes, study material, or any topic here..."
          rows="10"
        />

        <button
          className="solve-button"
          onClick={summarizeNotes}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "✨ Summarize My Notes"}
        </button>
      </div>

      {summary && (
        <div className="answer-card">
          <div className="answer-title">
            <span>📝</span>
            <div>
              <h2>AI Summary</h2>
              <p>Short and easy to revise</p>
            </div>
          </div>

          <div className="answer-content">
            {summary.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesSummarizer;