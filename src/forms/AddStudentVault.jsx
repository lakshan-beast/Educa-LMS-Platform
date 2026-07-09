import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

import {
  FaUserPlus,
  FaCopy,
  FaUserCheck,
  FaWhatsapp,
  FaXmark,
} from "react-icons/fa6";

const AddStudentVault = ({ selectedGrade, onClose, isOpen, subject }) => {
  const [generatedID, setGeneratedID] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredData, setRegisterData] = useState(null);

  // const [selectedGrade, setSelectedGrade] = useState("11");

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    password: "",
    pin: "",
    parentMobile: "",
    studentMobile: "",
    maths: subject === "maths",
    science: subject === "science",
    english: subject === "english",
  });

  // 1. input fields data change logic
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 2. ID copy logic
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3. Student generate id and after Firebase Cloud to send main logic
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked Success! form submiting...");

    let subCode = "";
    if (formData.maths) subCode += "M";
    if (formData.english) subCode += "E";
    if (formData.science) subCode += "S";

    if (!subCode) {
      setError("Please select at least one subject!");
      setSuccess("");
      return;
    }

    if (
      !formData.fullName ||
      !formData.password ||
      !formData.pin ||
      !formData.parentMobile
    ) {
      setError("Please fill in all details correctly!");
      setSuccess("");
      return;
    }

    const cleanName = formData.fullName.replace(/\s+/g, "").toUpperCase();
    const cleanPin = formData.pin.trim();
    const finalID = `EDU-${subCode}-${selectedGrade}-${cleanName}-${cleanPin}`;

    // Cloud data clean structure
    const studentCloudData = {
      id: finalID,
      fullName: formData.fullName,
      gender: formData.gender,
      grade: String(selectedGrade),
      password: formData.password,
      pin: cleanPin,
      parentMobile: formData.parentMobile,
      studentMobile: formData.studentMobile,
      maths: formData.maths,
      science: formData.science,
      english: formData.english,

      status: "Approved",
      createdAt: new Date().toISOString(),
    };

    try {
      // 🚀 Firebase 'students' Collection
      await addDoc(collection(db, "students"), studentCloudData);

      setGeneratedID(finalID);
      setRegisterData(studentCloudData);
      setCopied(false);
      onClose();

      setSuccess(
        `The student was successfully added to the Google Cloud Database! ID: ${finalID}`,
      );
      setError("");

      setFormData({
        fullName: "",
        gender: "",
        password: "",
        pin: "",
        parentMobile: "",
        studentMobile: "",
        maths: subject === "maths",
        science: subject === "science",
        english: subject === "english",
      });
    } catch (err) {
      console.error("Firebase Error:", err);
      setError("An error occurred while saving data to the Cloud Database!");
      setSuccess("");
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  // 👑 🆕 [WHATSAPP STRUCTURAL MESSAGE BUILDER]
  const sendWelcomeWhatsApp = () => {
    if (!registeredData) return;

    let subjectsList = [];

    if (registeredData.maths) subjectsList.push("Mathematics");
    if (registeredData.science) subjectsList.push("Science");
    if (registeredData.english) subjectsList.push("English");

    const message =
      `*🎓 Educa. Official Student Registration* \n\n` +
      `Dear *${registeredData.fullName}*,\n` +
      `You have been successfully onboarded to the *educa. LMS Platform*.\n\n` +
      `📌 *Your Student ID:* ${registeredData.id}\n` +
      `🔑 *Your Password:* ${registeredData.password}\n` +
      `🔒 *Your PIN Number:* ${registeredData.pin}\n` +
      `🏫 *Grade:* Grade ${registeredData.grade}\n` +
      `📚 *Enrolled Classes:* ${subjectsList.join(", ")}\n\n` +
      `> 💻 *Login Portal:* https://educa-ol-learning-platform.vercel.app\n\n` +
      `\n Thank you!\n\n*NexusLabs Software Studios* 🦾`;

    const sendRegistrationDetails = registeredData.studentMobile
      .trim()
      .replace(/^0/, "94");

    const whatsappUrl =
      "https://wa.me/" +
      sendRegistrationDetails +
      "?text=" +
      encodeURIComponent(message);
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      className="admin-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10000,
      }}>
      <div
        className="admin-modal-card"
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          position: "relative",
        }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
            color: "#8b949e",
          }}>
          <FaXmark />
        </button>

        <h3>
          <FaUserPlus /> Add New Student (Grade {selectedGrade})
        </h3>
        <p>
          Check the details on the form, enter the student into the system and
          create an ID.
        </p>
        {/* </div> */}

        {error && <div className="error-content">⚠️ {error}</div>}
        {success && <div className="success-content">✓ {success}</div>}

        <form
          onSubmit={handleRegisterSubmit}
          // className="styled-form "
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Left Form Column */}
          <div
            // className="form-content"
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div className="input-group">
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                Student's Full Name (In capital letters)
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter Student Name..."
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                Create Password (For the student)
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create secret password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                Create 4-Digit Secret PIN (4-digit code)
              </label>
              <input
                type="number"
                name="pin"
                maxLength="4"
                placeholder="ex: 1234"
                required
                value={formData.pin}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                Student Gender
              </label>
              <select value={formData.gender} onChange={handleChange}>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>
          </div>
          {/* <div className="input-group">
          <label>Select Grade Class</label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}>
            <option value="10">Grade 10 </option>
            <option value="11">Grade 11 Theory/Revision</option>
            <option value="11-Paper">Grade 11 Premium Paper Class</option>
          </select>
        </div> */}

          {/* Right Form Column */}
          {/* <div className="form-content"> */}
          <div className="input-group">
            <label>Select Enrolled Subjects (Subjects)</label>
            <div className="subject-select">
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                <input
                  type="checkbox"
                  name="maths"
                  checked={formData.maths}
                  onChange={handleChange}
                />
                Maths
              </label>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                <input
                  type="checkbox"
                  name="science"
                  checked={formData.science}
                  onChange={handleChange}
                />
                Science
              </label>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#001b42",
                }}>
                <input
                  type="checkbox"
                  name="english"
                  checked={formData.english}
                  onChange={handleChange}
                />
                English
              </label>
            </div>
          </div>

          <div className="input-group">
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Student's Mobile Number
            </label>
            <input
              type="text"
              name="studentMobile"
              placeholder="ex: 07X-XXX XXXX"
              required
              value={formData.studentMobile}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#001b42",
              }}>
              Parent's Mobile Number{" "}
            </label>
            <input
              type="text"
              name="parentMobile"
              placeholder="ex: 07X-XXX XXXX"
              required
              value={formData.parentMobile}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="start-btn submit-button">
            Register & Generate Student ID
          </button>
          {/* </div> */}
        </form>

        {/* DISPLAY GENERATED ID & WHATSAPP BUTTON PANEL */}
        {/* <div className="custom-modal-blur-overlay"> */}
        <div className="share-panel">
          {generatedID ? (
            <div className="share-panel-header">
              <div className="panel-top">
                <FaUserCheck />
              </div>

              <h4>Generated Student ID</h4>

              <div className="id-content">{generatedID}</div>

              <div className="share-content">
                <button
                  className="share-buton"
                  type="button"
                  onClick={sendWelcomeWhatsApp}>
                  <FaWhatsapp /> Share Credentials via WhatsApp
                </button>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="copy-button">
                  <FaCopy /> {copied ? "Copied!" : "Copy to Clipboard"}
                </button>

                {/* // 🛠️ React Code එකේ Copy Button එක මේ විදිහට Modify කරන්න: */}
                {/* <button className={`copy-button ${copied ? '--copied' : ''}`} onClick={...} >
  {copied ? 'Copied!' : 'Copy ID'}
</button> */}
              </div>
            </div>
          ) : (
            <div className="empty-content">
              <p>
                Fill in the details and press the Register & Generate Student ID
                button.
              </p>
              <small>
                Once the ID is created, the WhatsApp Share button will appear
                here.
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudentVault;
