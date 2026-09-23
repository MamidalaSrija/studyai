import { useState } from "react";

function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuiz = () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    setQuiz([]);

    setTimeout(() => {
      setQuiz([
        {
          question: `What is the main concept of ${topic}?`,
          options: ["Basic principles", "Random data", "Unrelated ideas", "None of these"],
          answer: "Basic principles",
        },
        {
          question: `Why is ${topic} important?`,
          options: ["It has practical applications", "It is unnecessary", "It has no use", "None"],
          answer: "It has practical applications",
        },
        {
          question: `Which is commonly associated with ${topic}?`,
          options: ["Learning", "Cooking", "Weather", "Sports"],
          answer: "Learning",
        },
      ]);

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <span className="tool-label">AI LEARNING TOOL</span>

        <h1>🎯 Quiz Generator</h1>

        <p>
          Generate practice questions and test your understanding.
        </p>
      </div>

      <div className="solver-card">
        <label>Enter a topic</label>

        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Artificial Intelligence"
          rows="4"
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
            <span>🎯</span>
            <div>
              <h2>Practice Quiz</h2>
              <p>Test your knowledge</p>
            </div>
          </div>

          <div className="quiz-list">
            {quiz.map((item, index) => (
              <div className="quiz-question" key={index}>
                <h3>
                  {index + 1}. {item.question}
                </h3>

                {item.options.map((option) => (
                  <button
                    className="quiz-option"
                    key={option}
                    onClick={() =>
                      alert(
                        option === item.answer
                          ? "✅ Correct answer!"
                          : `❌ Incorrect. Correct answer: ${item.answer}`
                      )
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizGenerator;