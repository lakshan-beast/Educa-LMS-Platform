import { useEffect } from "react";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { FaRocket } from "react-icons/fa6";

import heroImg from "../assets/hero-img.jpg";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="home" className="home" data-aos="fade-up">
      <div className="columns">
        <div className="column description" data-aos="fade-right">
          <h1>
            The Official Smart Student Portal For ,
            <br />
            <span data-aos="fade-up">Your O/L Exam Success.</span>
          </h1>

          <p data-aos="fade-up">
            Welcome to our official digital learning center for Mathematics,
            Science, and English. Built strictly for our registered students,
            this private portal gives you 24/7 access to our smart "Neti AI"
            Assistant to solve your doubts and check your exam progress
            instantly.
          </p>

          <div className="home-buttons" data-aos="fade-right">
            <a href="#resources" className="start-btn">
              Get Started Now <FaRocket className="icon" />
            </a>

            {/* <a href="#classes" className="browse-btn">
              Browse classes <FaArrowRight className="icon" />
            </a> */}

            <Link to="/result-hub" className="browse-btn">
              Results (2025)<span className="bell-alert-dot"></span>
            </Link>
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
