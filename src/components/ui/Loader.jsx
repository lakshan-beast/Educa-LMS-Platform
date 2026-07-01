import {
  FaBookOpen,
  FaBrain,
  FaAward,
  FaFlask,
  FaCompass,
} from "react-icons/fa6";

const Loader = () => {
  return (
    <div className="first-loads-fullscreen-overlay">
      <div className="shape-burst-loader-hub">
        <div
          className="burst-particle-icon"
          style={{ "--x": "0px", "--y": "-38px" }}>
          <FaBookOpen />
        </div>
        <div
          className="burst-particle-icon"
          style={{ "--x": "35px", "--y": "-12px" }}>
          <FaFlask />
        </div>
        <div
          className="burst-particle-icon"
          style={{ "--x": "22px", "--y": "30px" }}>
          <FaBrain style={{ transform: "rotate(-90deg)" }} />
        </div>
        <div
          className="burst-particle-icon"
          style={{ "--x": "-22px", "--y": "30px" }}>
          <FaCompass />
        </div>
        <div
          className="burst-particle-icon"
          style={{ "--x": "-35px", "--y": "-12px" }}>
          <FaAward />
        </div>
      </div>
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
