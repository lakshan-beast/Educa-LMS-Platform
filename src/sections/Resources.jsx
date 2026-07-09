import { Link } from "react-router-dom";

import {
  FaCircleCheck,
  FaMedal,
  FaComments,
  FaChartColumn,
  FaUserShield,
} from "react-icons/fa6";

import Comments from "../assets/comment.webp";
import Results from "../assets/result.webp";
import Parent from "../assets/parents.webp";

// import { FaSquarePollVertical } from "react-icons/fa6";

import { FaArrowTrendUp } from "react-icons/fa6";
import { RiShieldFlashFill } from "react-icons/ri";
import { FaQuoteLeft } from "react-icons/fa";

const Resources = () => {
  return (
    <section className="parts" id="resources">
      <h2 data-aos="fade-up">
        Our Smart <span>Learning System</span>
      </h2>
      <p data-aos="fade-up">
        Explore the special features designed to connect parents with the
        classroom, check modern exam reports, and view verified student feedback
        instantly.
      </p>

      <div className="resources-grid">
        <div className="resources-card" id="parent-portal" data-aos="fade-up">
          <div class="resources-card__shine"></div>
          <div class="resources-card__glow"></div>

          <div className="resources-card__content">
            <span
              className=" card-badge-verified resources-card__badge"
              data-aos="fade-left">
              <FaCircleCheck className="icon" /> Parents Only
            </span>
            <div className="resources-card__image-container color-parent">
              {/* <img
                class="resources-card__image"
                src={Parent}
                loading="lazy"
                decoding="async"
                alt="Parent Portal"
              /> */}
              <RiShieldFlashFill className="hub-main-icon " />
            </div>
            <div className="resources-card__text">
              <h3 className="resources-card__title">
                <FaUserShield className="icon" /> Parent Portal
              </h3>
              <p className="resources-card__description">
                Monitor your child's weekly class attendance, monthly payment
                histories, and direct urgent announcements safely in one unified
                space.
              </p>
            </div>

            <button
              disabled="disabled"
              className="resources-btn type-coming-soon"
              data-aos="fade-up">
              Coming Soon
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Official Results Card */}
        <div
          className="resources-card card-style result-check"
          id="result-check"
          data-aos="fade-up">
          <div class="resources-card__shine"></div>
          <div class="resources-card__glow"></div>

          <div className="resources-card__content">
            <span
              className=" card-badge-official resources-card__badge"
              data-aos="fade-left">
              <FaMedal className="icon-title" /> Official
            </span>
            <div className="resources-card__image-container color-results">
              {/* <img
                class="resources-card__image"
                src={Results}
                loading="lazy"
                decoding="async"
                alt="O/L Results"
              /> */}
              <FaArrowTrendUp className="hub-main-icon " />
            </div>
            {/* <FaSquarePollVertical /> */}
            <div className="resources-card__text">
              <h3 className="resources-card__title">
                <FaChartColumn className="icon" />
                National O/L Results
              </h3>
              <p className="resources-card__description">
                Directly access the official Department of Examinations portal
                to check your national Ordinary Level results safely and quickly
                right here.
              </p>
            </div>
            <a
              href="https://www.doenets.lk/examresults"
              className="resources-btn"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up">
              Check Your Results
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </a>
          </div>
        </div>

        {/* 2. Student Reviews Card */}
        <div
          className="resources-card card-style"
          id="reviews"
          data-aos="fade-up">
          <div class="resources-card__shine"></div>
          <div class="resources-card__glow"></div>

          <div className="resources-card__content">
            <span
              className=" card-badge-verified resources-card__badge"
              data-aos="fade-left">
              <FaCircleCheck className="icon-title" /> Verified
            </span>
            <div className="resources-card__image-container color-comments">
              {/* <img
                class="resources-card__image"
                src={Comments}
                loading="lazy"
                decoding="async"
                alt="Student Reviews"
              /> */}
              <FaQuoteLeft className="hub-main-icon " />
            </div>
            <div className="resources-card__text">
              <h3 className="resources-card__title">
                <FaComments className="icon" /> Student Voices
              </h3>
              <p className="resources-card__description">
                Read genuine feedback and learning experiences shared by our
                top-performing Ordinary Level students who achieved their dream
                results with us .
              </p>
            </div>
            <Link
              to="/student-voices"
              className="resources-btn"
              data-aos="fade-up">
              Read Reviews
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* 1. Smart Tools Card */}
        {/* <div className="resources-card card-style" data-aos="fade-up">
          <span className="card-badge card-badge-new">
            <FaRocket className="icon" /> New Tools
          </span>
          <img src={Tools} loading="lazy" alt="Study Tools" />
          <h3>
            <FaToolbox className="icon" /> Smart Study Tools
          </h3>
          <p>
            Boost your productivity with our specialized O/L study calculators
            and timers.
          </p>
          {/* <Link to="/tools" className="resources-btn">
            Open Tools
          </Link> 
          <button disabled="disabled" className="resources-btn">
            Developing Mode
          </button>
        </div> */}

        {/* 4. Daily Questions Card */}
        {/* <div className="resources-card card-style" data-aos="fade-up">
          <span className="card-badge card-badge-daily">
            <FaCircleCheck className="icon" /> Everyday
          </span>
          <img src={Quetions} loading="lazy" alt="Daily Questions" />
          <h3>
            <FaCircleQuestion className="icon" /> Daily Mission
          </h3>
          <p>
            Challenge yourself with 5 new questions every day to keep your brain
            sharp.
          </p>
          {/* <Link to="/daily-questions" className="resources-btn">          
            Start Today
          </Link> 
          <button disabled="disabled" className="resources-btn">
            Developing Mode
          </button>
        </div> */}

        {/* 5. Interactive Quizzes Card */}
        {/* <div className="resources-card card-style" data-aos="fade-up">
          <span className="card-badge card-badge-hot">
            <FaMedal className="icon" /> Most Popular
          </span>
          <img src={Quizes} loading="lazy" alt="Interactive Quizzes" />
          <h3>
            <FaPenToSquare className="icon" /> Skill Test Quizzes
          </h3>
          <p>
            Test your knowledge with timed quizzes covering all O/L core units.
          </p>
          {/* <Link to="/quizzes" className="resources-btn">
            Take a Quiz
          </Link> *
          <button disabled="disabled" className="resources-btn">
            Developing Mode
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Resources;
