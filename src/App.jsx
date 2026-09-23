import { useState } from "react";
import "./App.css";
import DoubtSolver from "./DoubtSolver";
import NotesSummarizer from "./NotesSummarizer";
import QuizGenerator from "./QuizGenerator";
import StudyPlanner from "./StudyPlanner";

function App() {
  const [active, setActive] = useState("Dashboard");

  const features = [
    {
      title: "AI Doubt Solver",
      description: "Ask questions and get clear, step-by-step explanations.",
      icon: "💡",
      color: "purple",
    },
    {
      title: "Notes Summarizer",
      description: "Turn lengthy notes into short and easy-to-revise points.",
      icon: "📝",
      color: "blue",
    },
    {
      title: "Quiz Generator",
      description: "Generate practice questions from any topic.",
      icon: "🎯",
      color: "green",
    },
    {
      title: "Study Planner",
      description: "Create a personalized study plan for your subjects.",
      icon: "📅",
      color: "orange",
    },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          <div>
            <h2>StudyAI</h2>
            <span>Student Assistant</span>
          </div>
        </div>

        <nav>
          <button
            className={
              active === "Dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("Dashboard")}
          >
            🏠 <span>Dashboard</span>
          </button>

          <button
            className={
              active === "Doubt Solver"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("Doubt Solver")}
          >
            💡 <span>Doubt Solver</span>
          </button>

          <button
            className={
              active === "Summarizer"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("Summarizer")}
          >
            📝 <span>Notes Summarizer</span>
          </button>

          <button
            className={
              active === "Quiz"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("Quiz")}
          >
            🎯 <span>Quiz Generator</span>
          </button>

          <button
            className={
              active === "Planner"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActive("Planner")}
          >
            📅 <span>Study Planner</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="ai-status">
            <span className="status-dot"></span>
            AI Assistant Online
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* DOUBT SOLVER PAGE */}
        {active === "Doubt Solver" ? (
  <DoubtSolver />
) : active === "Summarizer" ? (
  <NotesSummarizer />
) : active === "Quiz" ? (
  <QuizGenerator />
) : active === "Planner" ? (
  <StudyPlanner />
) : (    /* DASHBOARD */
          <>
            <header className="topbar">
              <div>
                <p className="welcome">WELCOME BACK 👋</p>

                <h1>Good afternoon, Student!</h1>

                <p className="subtitle">
                  Learn smarter, stay organized, and achieve your goals.
                </p>
              </div>

              <div className="profile">
                <div className="profile-avatar">S</div>

                <div>
                  <strong>Student</strong>
                  <span>B.Tech • AI & ML</span>
                </div>
              </div>
            </header>

            <section className="hero">
              <div>
                <span className="hero-tag">
                  ✨ AI-POWERED LEARNING
                </span>

                <h2>Your Personal AI Study Companion</h2>

                <p>
                  Solve doubts, summarize notes, practice quizzes and
                  organize your study time — all in one place.
                </p>
              </div>

              <div className="hero-shape">✦</div>
            </section>

            <section className="section-heading">
              <div>
                <h2>What would you like to do?</h2>
                <p>Choose an AI tool to get started.</p>
              </div>
            </section>

            <section className="feature-grid">
              {features.map((feature) => (
                <div
                  className="feature-card"
                  key={feature.title}
                  onClick={() => {
  if (feature.title === "AI Doubt Solver") {
    setActive("Doubt Solver");
  } else if (feature.title === "Notes Summarizer") {
    setActive("Summarizer");
  } else if (feature.title === "Quiz Generator") {
    setActive("Quiz");
  } else if (feature.title === "Study Planner") {
    setActive("Planner");
  }
}}
                >
                  <div
                    className={`feature-icon ${feature.color}`}
                  >
                    {feature.icon}
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (feature.title === "AI Doubt Solver") {
                        setActive("Doubt Solver");
                      }
                    }}
                  >
                    Open Tool <span>→</span>
                  </button>
                </div>
              ))}
            </section>

            <section className="bottom-grid">

              <div className="progress-card">
                <div className="card-heading">
                  <div>
                    <h3>Today's Progress</h3>
                    <p>Keep up your learning streak!</p>
                  </div>

                  <span className="progress-percent">
                    72%
                  </span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>

                <div className="progress-stats">
                  <div>
                    <strong>4</strong>
                    <span>Tasks completed</span>
                  </div>

                  <div>
                    <strong>2.5h</strong>
                    <span>Study time</span>
                  </div>

                  <div>
                    <strong>12</strong>
                    <span>Quiz questions</span>
                  </div>
                </div>
              </div>

              <div className="tip-card">
                <span className="tip-icon">💬</span>

                <div>
                  <h3>AI Study Tip</h3>

                  <p>
                    Break difficult topics into smaller concepts
                    and revise them using active recall.
                  </p>
                </div>
              </div>

            </section>

            <footer>
              <span>StudyAI • AI Student Assistant</span>
              <span>Built for smarter learning</span>
            </footer>
          </>
        )}

      </main>
    </div>
  );
}

export default App;