import { useState } from "react";
function QuizGenerator({ onBack }) {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const generateQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    setQuiz([]);
    setSelectedAnswers({});

    try {
     const response = await fetch("https://studyai-backend-cwxs.onrender.com/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate quiz.");
      }

      setQuiz(data.questions);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to the AI server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  return (
    <div className="tool-page">
      <button className="back-button" onClick={onBack}>
  ← Back to Dashboard
</button>
      <div className="tool-header">
        <span className="tool-label">AI LEARNING TOOL</span>

        <h1>🧠 Quiz Generator</h1>

        <p>
          Generate AI-powered multiple-choice questions to test your knowledge.
        </p>
      </div>

      <div className="solver-card">
        <label>Enter a topic</label>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Machine Learning"
        />

        <button
          className="solve-button"
          onClick={generateQuiz}
          disabled={loading}
        >
          {loading ? "Generating..." : "✨ Generate Quiz"}
        </button>
      </div>

      {quiz.length > 0 && (
        <div className="answer-card">
          <div className="answer-title">
            <span>📝</span>

            <div>
              <h2>AI Generated Quiz</h2>
              <p>Test your understanding of {topic}</p>
            </div>
          </div>

          <div className="quiz-list">
            {quiz.map((item, index) => (
              <div className="quiz-question" key={index}>
                <h3>
                  {index + 1}. {item.question}
                </h3>

                <div className="quiz-options">
                  {item.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`quiz-option ${
                        selectedAnswers[index] === option ? "selected" : ""
                      }`}
                      onClick={() => selectAnswer(index, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {selectedAnswers[index] && (
                  <p className="quiz-answer">
                    Correct Answer: <strong>{item.answer}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizGenerator;