import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
,

  const [errors, setErrors] = useState({});

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
     else if (!/^[\p{L}\s]+$/u.test(formData.name)) {
      newErrors.name = "Name must be a character not a Number";
    }



    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    // Stop if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Form is valid
    console.log("Form Data:", formData);

    alert("Message sent successfully!");

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page wow animate__animated animate__fadeInDown">

      <section className="contact-section">

        {/* Contact Info */}
        <div className="contact-info">

          <span className="small-title">
            CONTACT US
          </span>

          <h1>
            Get In <span>Touch</span>
            <br />
            With Us
          </h1>

          <p>
            Have a question or want to know more about our food?
            Send us a message and our team will get back to you.
          </p>

          <div className="info-item">
            <div className="info-icon">✉</div>

            <div>
              <h3>Email</h3>
              <p>hello@food.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">☎</div>

            <div>
              <h3>Phone</h3>
              <p>+20 100 123 4567</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">⌖</div>

            <div>
              <h3>Location</h3>
              <p>Egypt</p>
            </div>
          </div>

        </div>


        {/* Contact Form */}
        <div className="contact-form-container ">

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <h2>
              Send Us a Message
            </h2>

            <p className="form-description">
              Fill in the form below and we will contact you shortly.
            </p>


            <div className="form-row">

              {/* Name */}
              <div className="input-group">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />

                {errors.name && (
                  <span className="error">
                    {errors.name}
                  </span>
                )}

              </div>


              {/* Email */}
              <div className="input-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

                {errors.email && (
                  <span className="error">
                    {errors.email}
                  </span>
                )}

              </div>

            </div>


            {/* Subject */}
            <div className="input-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />

              {errors.subject && (
                <span className="error">
                  {errors.subject}
                </span>
              )}

            </div>


            {/* Message */}
            <div className="input-group">

              <label>
                Message
              </label>

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
              ></textarea>

              {errors.message && (
                <span className="error">
                  {errors.message}
                </span>
              )}

            </div>


            <button
              type="submit"
              className="send-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Contact;