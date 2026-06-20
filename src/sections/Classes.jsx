import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa6";

const Classes = () => {
  const classData = [
    {
      id: "maths",
      title: "O/L Mathematics",
      subtitle: "Step-by-Step Logic & Core Numeracy",
      description:
        "Master all core mathematical theories easily from fundamental logic to advanced geometry. We simplify complex algebraic equations into clear steps, providing weekly structured papers and direct support to boost school term marks and guarantee O/L success.",
      grade: "06 - 11",
      medium: "Sinhala",
    },
    {
      id: "science",
      title: "O/L Science",
      subtitle: "Visualizing Physics, Chemistry & Biology",
      description:
        "Explore the amazing world of Science with modern visual diagrams and fun experiments. We cover every single theory in Physics, Chemistry, and Biology comprehensively, turning difficult classroom syllabus work into highly engaging, easy-to-remember lessons.",
      grade: "06 - 11",
      medium: "Sinhala & English",
    },
    {
      id: "english",
      title: "O/L English",
      subtitle: "Advanced Writing, Language & Fluency",
      description:
        "Build ultimate confidence in English communication, school textbook lessons, and grammar structure. We focus heavily on formal essay writing techniques, comprehensions, local literature appreciation, and targeted exam paper drills to secure your absolute 'A' grade .",
      grade: "01 - 11",
      medium: "English & Sinhala",
    },
    // ],
  ];

  return (
    <section className="parts" id="classes">
      <h2>
        Our Acedamic <span>Classes</span>
      </h2>
      <p>
        Explore our official localized schedules for Grade 6 to 11 Mathematics,
        Science, and English. Designed to strengthen textbook theories, improve
        term test scores, and build exam confidence step-by-step.
      </p>

      <div className="class-container">
        <div className="classes-grid">
          {classData.map((item, index) => (
            <div className="class-card " key={index} data-aos="fade-up">
              <div className="class-info">
                <div className="class-header">
                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                </div>

                <p className="class-desc">{item.description}</p>

                <div className="class-meta">
                  <div className="meta-item">
                    <span className="label">Grade : </span>
                    <span className="value">{item.grade}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Medium : </span>
                    <span className="value">{item.medium}</span>
                  </div>
                </div>

                {/* <Link to="/classes-details" className="class-btns">
                  View Class Details <FaArrowRight />
                </Link> */}
              </div>
            </div>
          ))}
        </div>

        <div className="more-btn">
          <Link to="/tab-controller" className="fullclass-btn">
            View Full Timetable & Notices
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Classes;
