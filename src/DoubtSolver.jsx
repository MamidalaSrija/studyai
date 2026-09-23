import { useState } from "react";

function DoubtSolver() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const solveDoubt = () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    setTimeout(() => {
      setAnswer(
        `Here's a simple explanation of your doubt:\n\n` +
        `Your question is: "${question}"\n\n` +
        `Think of the concept step by step. First, identify the main idea. ` +
        `Then break the problem into smaller parts and understand how each ` +
        `part connects to the next. This approach makes difficult concepts ` +
        `easier to understand and remember.\n\n` +
        `💡 Study Tip: Try explaining the concept in your own words after ` +
        `reading the explanation.`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="tool-page">
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

        <button className="solve-button" onClick={solveDoubt}>
          {loading ? "Thinking..." : "✨ Solve My Doubt"}
        </button>
      </div>

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
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoubtSolver;