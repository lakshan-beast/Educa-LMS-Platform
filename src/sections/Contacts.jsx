import { useState } from "react";

import { FaMobile, FaEnvelope } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    content: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! We received your message. We'll get back to you soon.");
  };

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

  return (
    <section className="parts" id="contacts">
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-info-card" data-aos="fade-right">
            <h2>
              Get in <span>Touch</span>
            </h2>
            <p>
              Have questions about classes or study materials? Message the
              relevant teacher directly.
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
            <h2>Contact Form</h2>
            <form
              onSubmit={handleSubmit}
              className="styled-form"
              action="https://formspree.io/f/mqenwpgk"
              method="POST">
              <div className="input-row">
                <div className="input-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Whatsapp Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="07X XXX XXXX"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Subject</label>
                  <select name="subject" required onChange={handleChange}>
                    <option value="">Select Subject</option>
                    <option value="Maths">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Describe your requirement..."
                  required
                  onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send My Message <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
