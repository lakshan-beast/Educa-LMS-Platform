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
          <span className="card-badge card-badge-verified" data-aos="fade-left">
            <FaCircleCheck className="icon" /> Parents Only
          </span>
          <img
            src={Parent}
            loading="lazy"
            decoding="async"
            alt="Parent Portal"
          />
          <h3>
            <FaUserShield className="icon" /> Perant Portal
          </h3>
          <p>
            Monitor your child's weekly class attendance, monthly payment
            histories, and direct urgent announcements safely in one unified
            space.
          </p>

          <button disabled="disabled" className="browse-btn" data-aos="fade-up">
            Coming Soon
          </button>
        </div>

        {/* 3. Official Results Card */}
        <div
          className="resources-card card-style result-check"
          id="result-check"
          data-aos="fade-up">
          <span className="card-badge card-badge-official" data-aos="fade-left">
            <FaMedal className="icon" /> Official
          </span>
          <img
            src={Results}
            loading="lazy"
            decoding="async"
            alt="O/L Results"
          />
          <h3>
            <FaChartColumn className="icon" />
            National O/L Results
          </h3>
          <p>
            Directly access the official Department of Examinations portal to
            check your national Ordinary Level results safely and quickly right
            here.
          </p>
          <a
            href="https://www.doenets.lk/examresults"
            className="browse-btn"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-up">
            Check Your Results
          </a>
        </div>

        {/* 2. Student Reviews Card */}
        <div
          className="resources-card card-style"
          id="reviews"
          data-aos="fade-up">
          <span className="card-badge card-badge-verified" data-aos="fade-left">
            <FaCircleCheck className="icon" /> Verified
          </span>
          <img
            src={Comments}
            loading="lazy"
            decoding="async"
            alt="Student Reviews"
          />
          <h3>
            <FaComments className="icon" /> Student Voices
          </h3>
          <p>
            Read genuine feedback and learning experiences shared by our
            top-performing Ordinary Level students who achieved their dream
            results with us .
          </p>
          <Link to="/student-voices" className="browse-btn" data-aos="fade-up">
            Read Reviews
          </Link>
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
          {/* <Link to="/tools" className="browse-btn">
            Open Tools
          </Link> 
          <button disabled="disabled" className="browse-btn">
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
          {/* <Link to="/daily-questions" className="browse-btn">          
            Start Today
          </Link> 
          <button disabled="disabled" className="browse-btn">
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
          {/* <Link to="/quizzes" className="browse-btn">
            Take a Quiz
          </Link> *
          <button disabled="disabled" className="browse-btn">
            Developing Mode
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Resources;
