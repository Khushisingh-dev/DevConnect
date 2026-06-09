import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Landing.css";
import {
  Lightbulb,
  Rocket,
  Globe,
  BookText,
  Flame,
  CodeXml
} from "lucide-react";

function Landing() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <div className="landing-container">

      <Navbar page="landing" />

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-badge">
            <Rocket size={20}/> The Developer Community Platform
          </p>

          <h1>
            The Place Where
            <span> Developers Share Ideas & Learn Together</span>
          </h1>

          <p className="hero-text">
            DevConnect is a community where developers share ideas, showcase projects, collaborate, learn new technologies, and grow together.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                navigate(token ? "/home" : "/register")
              }
            >
              Start Your Journey
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate(token ? "/home" : "/login")
              }
            >
              Explore Community
            </button>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div className="stat-card">
          <h2>10K+</h2>
          <p>Developers Connected</p>
        </div>

        <div className="stat-card">
          <h2>25K+</h2>
          <p>Ideas Shared</p>
        </div>

        <div className="stat-card">
          <h2>8K+</h2>
          <p>Projects Showcased</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Tech Communities</p>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>Everything You Need To Grow</h2>

        <p className="section-subtitle">
          Built specifically for developers.
        </p>

        <div className="features-grid">

          <div className="feature-card">
            <h3><Lightbulb size={20}/> Share Ideas</h3>
            <p>
              Post coding tips, achievements,
              experiences and knowledge.
            </p>
          </div>

          <div className="feature-card">
            <h3><Globe size={20}/> Build Network</h3>
            <p>
              Connect with developers from
              different technologies.
            </p>
          </div>

          <div className="feature-card">
            <h3><Rocket size={20}/> Showcase Projects</h3>
            <p>
              Display your work and gain
              valuable feedback.
            </p>
          </div>

          <div className="feature-card">
            <h3><BookText size={20}/> Learn Together</h3>
            <p>
              Discover trends and technologies.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">

        <h2>How DevConnect Works</h2>

        <div className="steps">

          <div className="step">
            <span>01</span>
            <h3>Create Account</h3>
            <p>Join the community.</p>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Build Profile</h3>
            <p>Show your skills.</p>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Start Sharing</h3>
            <p>Post and connect.</p>
          </div>

        </div>

      </section>

      {/* COMMUNITY */}
      <section className="community">

        <h2>Inside The Community</h2>

        <div className="community-grid">

          <div className="community-card">
            <h4>Frontend Developer</h4>
            <p>
              Just completed my React portfolio <Rocket size={20}/>
            </p>
          </div>

          <div className="community-card">
            <h4>Backend Developer</h4>
            <p>
              Learning JWT Authentication <Flame size20/>
            </p>
          </div>

          <div className="community-card">
            <h4>Full Stack Developer</h4>
            <p>
              Built a MERN social platform. <CodeXml size={20}/>
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <h2>
          Ready To Join The Community?
        </h2>

        <p>
          Connect with developers, learn,
          collaborate and grow together.
        </p>

        <button
          className="cta-btn"
          onClick={() =>
            navigate(token ? "/home" : "/register")
          }
        >
          Join DevConnect Today
        </button>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        <h2>DevConnect</h2>

        <p>
          Connect • Collaborate • Grow
        </p>

        <small>
          © 2026 DevConnect. All Rights Reserved.
        </small>

      </footer>

    </div>
  );
}

export default Landing;