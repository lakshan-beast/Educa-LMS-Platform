
import { Link } from "react-router-dom";
import { LuBinary, LuAtom, LuLanguages } from "react-icons/lu";

const Classes = () => {
  const classData = [
    {
      id: "maths",
      title: "O/L Mathematics",
      description:
        "Master all core mathematical theories easily from fundamental logic to advanced geometry. We simplify complex algebraic equations into clear steps, providing weekly structured papers and direct support to boost school term marks and guarantee O/L success.",
      grade: "06 - 11",
      medium: "Sinhala",
      icon: <LuBinary className="subject-icon" />, // Maths Icon
    },
    {
      id: "science",
      title: "O/L Science",
      description:
        "Explore the amazing world of Science with modern visual diagrams and fun experiments. We cover every single theory in Physics, Chemistry, and Biology comprehensively, turning difficult classroom syllabus work into highly engaging, easy-to-remember lessons.",
      grade: "06 - 11",
      medium: "Sinhala & English",
      icon: <LuAtom className="subject-icon" />, // Science Icon
    },
    {
      id: "english",
      title: "O/L English",
      description:
        "Build ultimate confidence in English communication, school textbook lessons, and grammar structure. We focus heavily on formal essay writing techniques, comprehensions, local literature appreciation, and targeted exam paper drills to secure your absolute 'A' grade .",
      grade: "06 - 11",
      medium: "English & Sinhala",
      icon: <LuLanguages className="subject-icon" />, // English Icon
    },
  ];

  return (
    <section className="parts" id="classes">
      <h2>
        Our Academic <span>Classes</span>
      </h2>
      <p>
        Explore our official localized schedules for Grade 6 to 11 Mathematics,
        Science, and English. Designed to strengthen textbook theories, improve
        term test scores, and build exam confidence step-by-step.
      </p>

      <div className="class-container">
        <div className="parent-card">
          {classData.map((item, index) => (
            <div className="class-cardz" key={index} data-aos="fade-up">
              <div className="logo">
                <span className="circle circle1"></span>
                <span className="circle circle2"></span>
                <span className="circle circle3"></span>
                <span className="circle circle4"></span>

                <span className="circle circle5">{item.icon}</span>
              </div>

              <div className="glass"></div>

              <div className="class-info content">
                <div className="class-header">
                  <h3 className="title" data-aos="fade-right">
                    {item.title}
                  </h3>
                </div>

                <p className="class-desc text" data-aos="fade-up">
                  {item.description}
                </p>
              </div>

              {/* Bottom Metadata & View More */}
              <div className="bottom">
                <div className="meta-container social-buttons-container">
                  <div className="meta-item" data-aos="fade-right">
                    <span className="value social-button social-button1">
                      {item.grade}
                    </span>
                  </div>
                  <div className="meta-item" data-aos="fade-left">
                    <span className="value social-button social-button2">
                      {item.medium}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="more-btn">
        <Link
          to="tab-controller"
          className="fullclass-btn"
          data-aos="fade-down">
          View Full Timetable & Notices
        </Link>
      </div>
    </section>
  );
};

export default Classes;
