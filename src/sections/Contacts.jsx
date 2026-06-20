import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

import { FaMobile, FaEnvelope } from "react-icons/fa6";

const Contact = () => {
  const classContacts = [
    {
      subject: "Maths Class",
      email: "educa@maths.com",
      phone: "+941234567",
      address: "No, 123, High Level Road, Colombo.",
    },
    {
      subject: "Science Class",
      email: "educa@science.com",
      phone: "+941234567",
      address: "No, 123/1, High Level Road, Colombo.",
    },
    {
      subject: "English Class",
      email: "educa@english.com",
      phone: "+941234567",
      address: "No, 123/2, High Level Road, Colombo.",
    },
  ];

  const [contactFormData, setContactFormData] = useState({
    fullName: "",
    phone: "",
    messageText: "",
    subject: "MATHS",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormSuccess("");

    if (
      !contactFormData.fullName.trim() ||
      !contactFormData.phone.trim() ||
      !contactFormData.messageText.trim()
    ) {
      alert("Please fill all fields!");
      setIsSubmitting(false);
      return;
    }

    const docId = "MSG-" + Date.now().toString().slice(-6);

    const contactData = {
      id: docId,
      fullName: contactFormData.fullName.trim(),
      phone: contactFormData.phone.trim(),
      messageText: contactFormData.messageText.trim(),
      status: "unread",
      subject: contactFormData.subject,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "contact_messages", docId), contactData);
      setFormSuccess("Your message was sent successfully! 🚀");
      setContactFormData({ fullName: "", phone: "", messageText: "" });
    } catch (err) {
      console.error("Cloud Contact Save Error:", err);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="parts" id="contacts">
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-info-card" data-aos="fade-right">
            <h2>
              Get in <span>Touch</span>
            </h2>
            <p>
              Have questions regarding localized schedules, materials, or
              student tracking? Submit your inquiry to route it directly to the
              designated faculty admin.
            </p>

            <div className="contact-cards">
              {classContacts.map((item, index) => (
                <div className="contact-card" key={index} data-aos="fade-up">
                  <h4>{item.subject}</h4>
                  <a href={`tel:${item.phone}`} className="btnx">
                    <FaMobile className="contact-icon" /> {item.phone}
                  </a>
                  <a className="contact-mail" href={`mailto:${item.email}`}>
                    <FaEnvelope className="contact-icon" /> {item.email}
                  </a>

                  <address>{item.address}</address>
                </div>
              ))}
            </div>
          </div>

          <div
            className="contact-form-card styled-form"
            data-aos="fade-left"
            id="contact-form">
            <h2>Contact Academic Support</h2>
            <p>
              Please complete this official form to establish a direct cloud
              link with our subject teachers for immediate verification and
              support.
            </p>

            {formSuccess && <div className="success-card">{formSuccess}</div>}

            <form onSubmit={handleContactSubmit}>
              <div className="styled-form" method="POST">
                <div className="input-row">
                  <div className="input-group">
                    <label>Full Name </label>
                    <input
                      type="text"
                      name="fullName"
                      value={contactFormData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your Name..."
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleInputChange}
                      placeholder="E.g., 077 *** ****"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Subject</label>
                    <select
                      name="subject"
                      required
                      onChange={handleInputChange}>
                      <option value="">Select Subject</option>
                      <option value="Maths">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Your Message</label>
                    <textarea
                      name="messageText"
                      value={contactFormData.messageText}
                      onChange={handleInputChange}
                      placeholder="Type here..."
                      rows="4"
                      required></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-submit-btn">
                    {isSubmitting ? "Sending Message..." : "Send My Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
