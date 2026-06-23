import {
  FaBrain,
  FaFilePen,
  FaHeadset,
  FaChartLine,
  FaGraduationCap,
  FaUserGraduate,
} from "react-icons/fa6";

import { FaChalkboardTeacher, FaSmileBeam } from "react-icons/fa";

const Information = () => {
  return (
    <section className="parts" id="information">
      <h2 data-aos="fade-up">
        Why Study With <span>Our Faculty?</span>
      </h2>

      <p data-aos="fade-up">
        Discover how we combine expert local teachers, friendly step-by-step
        lessons, and a modern online tracking portal to help every student boost
        their confidence and score top exam results.
      </p>

      <div className="about-container info-column" id="about">
        {/* Left Content */}
        <div className="info-left card">
          <p data-aos="fade-up">
            We firmly believe that every child absorbs information differently.
            Our core mission is to bridge the gap between heavy textbook
            theories and direct exam success by providing clear, highly
            engaging, and supportive learning frameworks structured carefully
            for local secondary school benchmarks.
          </p>

          <div className="about-info" data-aos="fade-up">
            <h4>
              <FaBrain className="icon" /> Simplified Concept Mapping
            </h4>
            <p>
              We break down deep academic syllabus work into friendly
              step-by-step visual blueprints, easy memory tricks, and clear
              summaries.
            </p>

            <h4>
              <FaFilePen className="icon" /> Exam-Focused Guidance
            </h4>
            <p>
              Dedicated interactive review drills covering past papers,
              predictive model papers, and practical exam time-management
              methods.
            </p>

            <h4>
              <FaHeadset className="icon" /> 24/7 Intelligent Assistance
            </h4>
            <p>
              Immediate access to our custom "Neti AI" Assistant alongside
              active messaging channels to resolve student doubts instantly at
              any hour.
            </p>

            <h4>
              <FaChartLine className="icon" /> Proven Academic Growth
            </h4>
            <p>
              Thousands of local students have successfully elevated their term
              marks, transformed their understanding, and secured top grades
              through our structural guidance.
            </p>
          </div>
        </div>

        {/* Right Content - Stats Boxes */}
        <div className="info-right" data-aos="fade-right">
          <div className="about-status">
            <div className="courses-box box" data-aos="fade-right">
              <FaGraduationCap />
              <h3 data-aos="zoom-in">3+</h3>
              <p>Core Academic Disciplines</p>
            </div>

            <div className="teachers-box box" data-aos="fade-up">
              <FaChalkboardTeacher />
              <h3 data-aos="zoom-in">3+</h3>
              <p>Dedicated Faculty Leads</p>
            </div>

            <div className="students-box box" data-aos="fade-left">
              <FaUserGraduate />
              <h3 data-aos="zoom-in">2500+</h3>
              <p>Verified Success Metrics</p>
            </div>

            <div className="satisfaction-box box" data-aos="fade-down">
              <FaSmileBeam />
              <h3 data-aos="zoom-in">100%</h3>
              <p>Institutional Integrity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
