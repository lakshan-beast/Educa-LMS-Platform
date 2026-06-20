import { FaFacebook, FaWhatsapp, FaPhone } from "react-icons/fa6";

import tutor from "../assets/teacher.webp";

const Teachers = () => {
  const teacherData = [
    {
      name: "Mathematics Faculty Lead",
      subject: "Mathematics Specialist",
      img: tutor,
      background:
        "B.Sc. (Physical Science) / Trained Institutional Mathematics Educator.",
      expertise:
        "15+ Years of proven classroom experience in producing outstanding 'A' passes for Ordinary Level Mathematics.",
      approach:
        "Explains difficult geometry and algebra step-by-step using clear logic and fast exam-focused shortcuts.",
      philosophy:
        "We focus on building strong math basics daily, turning exam fear into absolute problem-solving confidence.",
      facebook: "https://facebook.com",
      whatsapp: "...",
      phone: "+9471XXXXXXX",
    },
    {
      name: "Science Faculty Lead",
      subject: "Science Specialist",
      img: tutor,
      background:
        "B.Sc. (Biological Science) / Experienced Science Communicator.",
      expertise:
        "10+ Years of dedicated teaching success in managing Ordinary Level local syllabus benchmarks.",
      approach:
        "Brings Physics, Chemistry, and Biology to life through friendly visual notes and practical examples.",
      philosophy:
        "Specializes in simplifying heavy science syllabus work using easy memory-tricks and interactive test drills.",
      facebook: "https://facebook.com",
      whatsapp: "...",
      phone: "+947XXXXXXXXX",
    },
    {
      name: "English Faculty Lead",
      subject: "English Language & Literature Specialist",
      img: tutor,
      background:
        "B.A. in English Language & Literature / Certified Institutional Educator.",
      expertise:
        "10+ Years of expert experience in managing local O/L English paper structures and student fluency.",
      approach:
        "Teaches interactive writing blueprints, essay frameworks, and core textbook grammar rules friendly.",
      philosophy:
        "Helps every student master creative writing layouts and formal answers to score a guaranteed 'A' grade.",
      facebook: "https://facebook.com",
      whatsapp: "...",
      phone: "+947XXXXXXXXX",
    },
  ];
  return (
    <section className="parts teachers-section" id="teachers">
      <h2>
        Meet Our Expert <span>Faculty Leads</span>
      </h2>

      <p>
        Learn from our highly experienced and friendly educators dedicated to
        your success. We combine proven exam methods with structured papers to
        guide you toward a guaranteed 'A' grade.
      </p>

      <div className="teachers-container teachers-grid">
        {teacherData.map((teacher, index) => (
          <div className="teacher-card" key={index}>
            <div className="teacher-image-column">
              <img src={teacher.img} alt={teacher.name} />

              <div className="teacher-socials">
                <a href={`tel:${teacher.facebook}`}>
                  <FaFacebook className="facebook-icon icon" />
                </a>
                <a href={`tel:${teacher.whatsapp}`}>
                  <FaWhatsapp className="whatsapp-icon icon" />
                </a>
                <a href={`tel:${teacher.phone}`}>
                  <FaPhone className="call-icon icon" />
                </a>
              </div>
            </div>

            <div className="teacher-info-column">
              <div className="info-content">
                <span className="subject-tag">{teacher.subject}</span>
                <h3>{teacher.name}</h3>

                <div className="detail-list">
                  <div className="detail-header">
                    <p>
                      <b>Academic:</b> {teacher.background}
                    </p>
                    <p>
                      <b>Experience:</b> {teacher.expertise}
                    </p>
                  </div>
                  <p className="philosophy-box">{teacher.philosophy}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teachers;
