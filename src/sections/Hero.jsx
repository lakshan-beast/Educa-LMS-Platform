import { useEffect } from "react";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { BsStars } from "react-icons/bs";

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
          <p className="trust-text">
            <BsStars className="icon" />
            Trusted by 5000+ Students
          </p>
          <h1>
            LEARN TODAY <span>LEAD TOMORROW</span>
          </h1>
          <p data-aos="fade-up">
            Welcome to our official digital learning center for Mathematics,
            Science, and English. Built strictly for our registered students,
            this private portal gives you 24/7 access to our smart "Neti AI"
            Assistant to solve your doubts and check your exam progress
            instantly.
          </p>

          <div className="home-buttons" data-aos="fade-right">
            <a href="#resources" className="started-btn">
              Get started Now
              <div class="icon">
                <svg
                  height="34"
                  width="34"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"></path>
                </svg>
              </div>
            </a>

            <Link to="/result-hub" className=" result-btn">
              <span class="btn-text-one">Year's Results</span>
              <span class="btn-text-two">(2025)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
