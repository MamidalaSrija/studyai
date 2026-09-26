import { useState } from "react";

function StudyPlanner({ onBack }) {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }

    if (!hours || Number(hours) <= 0) {
      alert("Please enter valid study hours.");
      return;
    }

    setLoading(true);
    setPlan("");

    try {
      const response = await fetch("https://studyai-backend-cwxs.onrender.com/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subject,
          hours: hours,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create study plan.");
      }

      setPlan(data.plan);
    } catch (error) {
      console.error(error);

      setPlan(
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

        <h1>📅 Study Planner</h1>

        <p>
          Create a practical AI-powered study plan based on your available
          time.
        </p>
      </div>

      <div className="solver-card">
        <label>Subject</label>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Example: Data Structures"
        />

        <label>Available study hours</label>

        <input
          type="number"
          min="1"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Example: 3"
        />

        <button
          className="solve-button"
          onClick={generatePlan}
          disabled={loading}
        >
          {loading ? "Creating Plan..." : "✨ Create Study Plan"}
        </button>
      </div>

      {plan && (
        <div className="answer-card">
          <div className="answer-title">
            <span>📚</span>

            <div>
              <h2>AI Study Plan</h2>
              <p>Personalized plan for {subject}</p>
            </div>
          </div>

          <div className="answer-content">
            {plan.split("\n").map((line, index) => (
              <p key={index}>{line || "\u00A0"}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyPlanner;