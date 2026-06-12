// src/components/Contact.js
import React from 'react';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <img
          src="/images/project.png"
          alt="Profile Icon"
          className="contact-profile-icon"
        />

        <h2 className="contact-title">Contact Us</h2>
        <p>
          Thank you for choosing <strong>Gokul Transport Admin</strong>. We’re here to support your logistics journey with reliable service and responsive communication.
        </p>

        <h3>📍 Office Address</h3>
        <p>
          Gokul Transport Admin<br />
          2nd Floor, Sai Krishna Towers<br />
          Benz Circle, Vijayawada, Andhra Pradesh – 520010
        </p>

        <h3>📞 Phone</h3>
        <p>+91 98765 43210</p>

        <h3>📧 Email</h3>
        <p>support@gokultransport.in</p>

        <h3>🕒 Working Hours</h3>
        <p>Monday to Saturday: 9:00 AM – 6:00 PM<br />Sunday: Closed</p>

        <p className="contact-footer">
          <em>We value your feedback and inquiries. Let’s keep your fleet moving forward!</em>
        </p>
      </div>
    </div>
  );
}
