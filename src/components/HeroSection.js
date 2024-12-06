import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  // Fonction pour démarrer le quiz
  const startQuiz = () => {
    navigate("/quiz"); // Navigation vers la page du quiz
  };

  const createBubble = () => {
    const bubbleContainer = document.getElementById("bubble-container");
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.random() * 40 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
    bubble.style.animationDelay = `${Math.random() * 2}s`;

    bubbleContainer.appendChild(bubble);

    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
  };

  useEffect(() => {
    const interval = setInterval(createBubble, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <h1>Comprends les Cyberattaques !</h1>
      <p>
        Salut, j'ai entendu dire que tu avais des difficultés. Je suis là pour t'aider à comprendre les cyberattaques et comment les éviter, pour ne plus te faire arnaquer.
      </p>
      <button className="cta-btn" onClick={startQuiz}>
        Démarrer le Quiz
      </button>
      <div className="icons">
        <span>🛡️</span>
        <span>🕵️‍♂️</span>
        <span>💻</span>
      </div>
      <div className="bubble-container" id="bubble-container"></div>
      <img
        src="https://png.pngtree.com/png-vector/20230814/ourmid/pngtree-blue-cartoon-fish-sticker-on-a-white-background-vector-png-image_6892122.png"
        className="fish-animation-right"
        alt="Fish Right"
      />
   
    </div>
  );
};

export default HeroSection;
