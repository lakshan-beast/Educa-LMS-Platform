import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import { FaRocket, FaArrowRight } from "react-icons/fa6";

import heroImg from "../assets/hero-image.webp";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="home" className="home" data-aos="fade-up" data-aos-delay="100">
      <div className="columns">
        <div className="column description" data-aos="fade-right">
          <h1>
            Master Your Core Subjects,
            <br />
            <span>Ace Your Exams.</span>
          </h1>

          {/* <picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1fa8e/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1fa8e/512.gif" alt="🪎" width="32" 
  
  <picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f512/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f512/512.gif" alt="🔒" width="32" height="32">
</picture>height="32">

<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1fa8e/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1fa8e/512.gif" alt="🪎" width="32" height="32">
</picture>
</picture> */}

          <img
            // src="https://fonts.gstatic.com/s/e/notoemoji/latest/1fa82/512.gif"
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1facd/512.gif"
            // src="https://fonts.gstatic.com/s/e/notoemoji/latest/1fa8e/512.gif"
            alt="live-emoji"
            style={{
              width: "95px",
              height: "95px",
              objectFit: "contain",
              position: "absolute",
              zIndex: "9999",
              bottom: "0%",
              right: "1%",
            }}
            refferrerPolicy="no-referrer"
          />
          <p>
            Simplified lessons, exam-focused strategies, and a community of
            2500+ successful students. Join the most trusted learning platform
            in Sri Lanka to achieve your dream 'A' grade.
          </p>

          <div
            className="home-buttons"
            data-aos="fade-right"
            data-aos-delay="300">
            <a href="#resources" className="start-btn">
              Get Started Now <FaRocket className="icon" />
            </a>
            <a href="#classes" className="browse-btn">
              Browse classes <FaArrowRight className="icon" />
            </a>
          </div>
        </div>

        <div className="column hero-img" data-aos="zoom-in">
          <img src={heroImg} loading="lazy" alt="Master O/L with Educa" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
