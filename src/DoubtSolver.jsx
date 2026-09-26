import { useState } from "react";

function DoubtSolver({ onBack }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const solveDoubt = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("https://studyai-backend-cwxs.onrender.com/api/doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.answer);
    } catch (error) {
      console.error("Doubt Solver Error:", error);
      setError("Unable to connect to the AI backend. Please try again.");
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
        <div>
          <span className="tool-label">AI LEARNING TOOL</span>
          <h1>AI Doubt Solver 💡</h1>
          <p>
            Ask any academic question and get a simple, step-by-step
            explanation.
          </p>
        </div>
      </div>

      <div className="solver-card">
        <label>What are you confused about?</label>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: Explain how neural networks learn..."
          rows="6"
        />

        <button
          className="solve-button"
          onClick={solveDoubt}
          disabled={loading}
        >
          {loading ? "Thinking..." : "✨ Solve My Doubt"}
        </button>
      </div>

      {error && (
        <div className="error-card">
          {error}
        </div>
      )}

      {answer && (
        <div className="answer-card">
          <div className="answer-title">
            <span>🤖</span>
            <div>
              <h2>AI Explanation</h2>
              <p>Here's a simple way to understand it.</p>
            </div>
          </div>

          <div className="answer-content">
            {answer.split("\n").map((line, index) => (
              <p key={index}>{line || "\u00A0"}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoubtSolver;