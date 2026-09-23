import { useState } from "react";

function StudyPlanner() {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const createPlan = () => {
    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }

    if (!hours || Number(hours) <= 0) {
      alert("Please enter the number of study hours.");
      return;
    }

    setLoading(true);
    setPlan("");

    setTimeout(() => {
      const studyHours = Number(hours);

      setPlan(
        `Study Plan for ${subject}\n\n` +
        `⏰ Total Study Time: ${studyHours} hour(s)\n\n` +
        `📖 Session 1 — Learn the basic concepts\n\n` +
        `📝 Session 2 — Study important definitions and examples\n\n` +
        `🧠 Session 3 — Practice questions and active recall\n\n` +
        `🔄 Final Session — Revise everything you learned\n\n` +
        `💡 Tip: Take short breaks and test yourself instead of only rereading your notes.`
      );

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <div>
          <span className="tool-label">AI LEARNING TOOL</span>

          <h1>📅 Study Planner</h1>

          <p>
            Create a simple and personalized study plan for your subjects.
          </p>
        </div>
      </div>

      <div className="solver-card">
        <label>What subject do you want to study?</label>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Example: Machine Learning"
        />

        <label>How many hours can you study?</label>

        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Example: 2"
          min="1"
        />

        <button
          className="solve-button"
          onClick={createPlan}
          disabled={loading}
        >
          {loading ? "Creating Plan..." : "✨ Create Study Plan"}
        </button>
      </div>

      {plan && (
        <div className="answer-card">
          <div className="answer-title">
            <span>📅</span>

            <div>
              <h2>Your Study Plan</h2>
              <p>Organized for effective learning</p>
            </div>
          </div>

          <div className="answer-content">
            {plan.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyPlanner;