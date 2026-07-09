// import { Link } from "react-router-dom";

// const Classes = () => {
//   const classData = [
//     {
//       id: "maths",
//       title: "O/L Mathematics",
//       // subtitle: "Step-by-Step Logic & Core Numeracy",
//       description:
//         "Master all core mathematical theories easily from fundamental logic to advanced geometry. We simplify complex algebraic equations into clear steps, providing weekly structured papers and direct support to boost school term marks and guarantee O/L success.",
//       grade: "06 - 11",
//       medium: "Sinhala",
//     },
//     {
//       id: "science",
//       title: "O/L Science",
//       // subtitle: "Visualizing Physics, Chemistry & Biology",
//       description:
//         "Explore the amazing world of Science with modern visual diagrams and fun experiments. We cover every single theory in Physics, Chemistry, and Biology comprehensively, turning difficult classroom syllabus work into highly engaging, easy-to-remember lessons.",
//       grade: "06 - 11",
//       medium: "Sinhala & English",
//     },
//     {
//       id: "english",
//       title: "O/L English",
//       // subtitle: "Advanced Writing, Language & Fluency",
//       description:
//         "Build ultimate confidence in English communication, school textbook lessons, and grammar structure. We focus heavily on formal essay writing techniques, comprehensions, local literature appreciation, and targeted exam paper drills to secure your absolute 'A' grade .",
//       grade: "01 - 11",
//       medium: "English & Sinhala",
//     },
//   ];

//   return (
//     <section className="parts" id="classes">
//       <h2>
//         Our Acedamic <span>Classes</span>
//       </h2>
//       <p>
//         Explore our official localized schedules for Grade 6 to 11 Mathematics,
//         Science, and English. Designed to strengthen textbook theories, improve
//         term test scores, and build exam confidence step-by-step.
//       </p>

//       <div className="class-container">
//         <div className="parent-card">
//           {classData.map((item, index) => (
//             <div className="class-cardz " key={index} data-aos="fade-up">

//               {/* Card Logo - Floating Circles */}
//               <div className="logo">
//                 <span className="circle circle1"></span>
//                 <span className="circle circle2"></span>
//                 <span className="circle circle3"></span>
//                 <span className="circle circle4"></span>
//                 <span className="circle circle5">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 29.667 31.69"
//                     className="svg">
//                     <path
//                       id="Path_6"
//                       data-name="Path 6"
//                       d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
//                       transform="translate(0 0)"></path>
//                     <path
//                       id="Path_7"
//                       data-name="Path 7"
//                       d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
//                       transform="translate(-45.91 0)"></path>
//                     <path
//                       id="Path_8"
//                       data-name="Path 8"
//                       d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
//                       transform="translate(0 -51.963)"></path>
//                   </svg>
//                 </span>
//               </div>

//               <div class="glass"></div>

//               <div className="class-info content">
//                 <div className="class-header">
//                   <h3 className="title" data-aos="fade-right">
//                     {item.title}
//                   </h3>
//                 </div>

//                 <p className="class-desc text" data-aos="fade-up">
//                   {item.description}
//                 </p>

//                 {/* Bottom Metadata & View More */}
//                 <div className="bottom">
//                   <div className="meta-container social-buttons-container ">
//                     <div className="meta-item " data-aos="fade-right">
//                       <span className="value social-button social-button1">
//                         {item.grade}
//                       </span>
//                     </div>
//                     <div className="meta-item" data-aos="fade-left">
//                       <span className="value social-button social-button2">
//                         {item.medium}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="view-more">
//                     <button className="view-more-button">View more</button>
//                     <svg
//                       className="svg"
//                       xmlns="http://w3.org"
//                       viewBox="0 0 24 24"
//                       strokeLinecap="round"
//                       strokeLinejoin="round">
//                       <path d="m6 9 6 6 6-6"></path>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="more-btn">
//         <Link
//           to="/tab-controller"
//           className="fullclass-btn"
//           data-aos="fade-down">
//           View Full Timetable & Notices
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Classes;

// import React from "react";
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
      grade: "01 - 11",
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
          to="/tab-controller"
          className="fullclass-btn"
          data-aos="fade-down">
          View Full Timetable & Notices
        </Link>
      </div>
    </section>
  );
};

export default Classes;
