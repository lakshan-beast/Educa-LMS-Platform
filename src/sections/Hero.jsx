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
            The Official Smart Student Portal For ,
            <br />
            <span>Your O/L Exam Success.</span>
          </h1>

          <p>
            Welcome to our official digital learning center for Mathematics,
            Science, and English. Built strictly for our registered students,
            this private portal gives you 24/7 access to our smart "Neti AI"
            Assistant to solve your doubts and check your exam progress
            instantly.
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
